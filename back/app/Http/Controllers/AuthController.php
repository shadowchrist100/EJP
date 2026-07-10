<?php

namespace App\Http\Controllers;

use App\Mail\VerificationMail;
use App\Mail\PasswordResetMail;
use App\Models\RefreshedToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\Cookie;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => ['required', 'email', 'max:50'],
            'password' => ['required', Password::min(8)]
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        // Supprime les anciens tokens pour éviter l'accumulation (optionnel)
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respond_with_token($token, $user);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'lastName'   => ['required', 'max:50'],
            'firstName'  => ['required', 'max:50'],
            'email'      => ['required', 'email', 'unique:users', 'max:50'],
            'image_path' => ['nullable', 'image', 'mimes:jpeg', 'max:2048'],
            'password'   => ['required', 'confirmed', Password::min(8)]
        ]);

        $user  = User::create($validated);
        
        $this->sendVerificationEmail($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respond_with_token($token, $user, 201);
    }

    public function logout(Request $request)
    {
        $rawToken = $request->cookie('refresh_token');

        if ($rawToken) {
            $hash = hash('sha256', $rawToken);
            $storedToken = RefreshedToken::where('refresh_token_hash', $hash)->first();

            if ($storedToken) {
                $user = User::find($storedToken->user_id);
                if ($user) {
                    $user->tokens()->delete();
                }
                $storedToken->delete();
            }
        }

        $cookie = new Cookie('refresh_token', '', now()->subYear(), '/', null, false, true);

        return response()->json(['message' => 'Déconnecté avec succès'], 200)->withCookie($cookie);
    }

    public function respond_with_token($token, $user, $status = 200)
    {
        $refresh_token      = bin2hex(random_bytes(64));
        $refresh_token_hash = hash('sha256', $refresh_token);

        RefreshedToken::create([
            'user_id'             => $user->id,
            'refresh_token_hash'  => $refresh_token_hash,
            'expire_at'           => now()->addDays(30)
        ]);

        $isProduction = config('app.env') === 'production';

        $cookie = new Cookie(
            'refresh_token',
            $refresh_token,
            now()->addDays(30),
            '/',
            null,
            $isProduction,
            true,
            false,
            $isProduction ? 'none' : 'lax'
        );

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user_data'    => $user
        ], $status)->withCookie($cookie);
    }

    public function refresh(Request $request)
    {
        $rawToken = $request->cookie('refresh_token');

        if (!$rawToken) {
            return response()->json(['error' => 'No refresh token'], 401);
        }

        $hash        = hash('sha256', $rawToken);
        $storedToken = RefreshedToken::where('refresh_token_hash', $hash)
            ->where('expire_at', '>', now())
            ->first();

        if (!$storedToken) {
            return response()->json(['error' => 'Invalid or expired refresh token'], 401);
        }

        $user = User::find($storedToken->user_id);

        // Rotation : supprime l'ancien refresh token
        $storedToken->delete();

        // Révoque aussi les anciens access tokens Sanctum (optionnel)
        $user->tokens()->delete();

        $newAccessToken = $user->createToken('auth_token')->plainTextToken;

        return $this->respond_with_token($newAccessToken, $user);
    }

    public function initRefreshToken(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Non authentifié'], 401);
        }

        RefreshedToken::where('user_id', $user->id)->delete();

        $refreshToken = bin2hex(random_bytes(64));
        RefreshedToken::create([
            'user_id' => $user->id,
            'refresh_token_hash' => hash('sha256', $refreshToken),
            'expire_at' => now()->addDays(30),
        ]);

        $isProduction = config('app.env') === 'production';
        $cookie = new Cookie(
            'refresh_token',
            $refreshToken,
            now()->addDays(30),
            '/',
            null,
            $isProduction,
            true,
            false,
            $isProduction ? 'none' : 'lax'
        );

        return response()->json(['message' => 'Refresh token créé'])->withCookie($cookie);
    }

    // --- Google OAuth ---
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur d\'authentification avec Google.'], 401);
        }

        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            if (!$user->google_id) {
                $user->update(['google_id' => $googleUser->getId()]);
            }
        } else {
            $fullName = $googleUser->getName();
            $parts = explode(' ', $fullName, 2);
            $firstName = $parts[0] ?? '';
            $lastName = $parts[1] ?? '';

            $user = User::create([
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'password' => null,
                'email_verified_at' => now(), // Google valide déjà l'adresse email
            ]);
        }

        $accessToken = $user->createToken('auth_token')->plainTextToken;

        return redirect()->away(env('FRONTEND_URL', 'http://localhost:5173') . '/oauth/callback?token=' . $accessToken);
    }

    // --- Email Verification ---
    protected function sendVerificationEmail($user)
    {
        $verificationLink = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $data = [
            'lastName' => $user->lastName,
            'firstName' => $user->firstName,
            'verificationLink' => $verificationLink
        ];

        Mail::to($user->email)->send(new VerificationMail($data));
    }

    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->email))) {
            return response()->json(['error' => 'Lien de vérification invalide.'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->away(env('FRONTEND_URL', 'http://localhost:5173') . '/login?verified=already');
        }

        if ($user->markEmailAsVerified()) {
            event(new \Illuminate\Auth\Events\Verified($user));
        }

        return redirect()->away(env('FRONTEND_URL', 'http://localhost:5173') . '/login?verified=true');
    }

    public function resend(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email déjà vérifié.'], 400);
        }

        $this->sendVerificationEmail($user);

        return response()->json(['message' => 'Lien de vérification envoyé.']);
    }

    // --- Password Reset ---
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Si cet email existe, un lien de réinitialisation a été envoyé.'], 200);
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => hash('sha256', $token),
                'created_at' => now()
            ]
        );

        $resetLink = env('FRONTEND_URL', 'http://localhost:5173') . '/reset-password?token=' . $token . '&email=' . urlencode($user->email);

        Mail::to($user->email)->send(new PasswordResetMail($resetLink));

        return response()->json(['message' => 'Lien de réinitialisation envoyé avec succès.'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$record || !hash_equals($record->token, hash('sha256', $request->token))) {
            return response()->json(['error' => 'Token invalide ou expiré.'], 400);
        }

        if (now()->subMinutes(60)->gt($record->created_at)) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json(['error' => 'Token expiré.'], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['error' => 'Utilisateur introuvable.'], 404);
        }

        $user->update([
            'password' => $request->password
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès.'], 200);
    }
}
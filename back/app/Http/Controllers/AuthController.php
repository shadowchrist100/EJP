<?php

namespace App\Http\Controllers;

use App\Mail\VerificationMail;
use App\Models\RefreshedToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;

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
        $token = $user->createToken('auth_token')->plainTextToken;

        Mail::to($validated['email'])->send(new VerificationMail());

        return $this->respond_with_token($token, $user, 201);
    }

    public function logout(Request $request)
    {
        // Révoque uniquement le token courant
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès'], 200);
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

        $cookie = cookie(
            'refresh_token',
            $refresh_token,
            43200,
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
}
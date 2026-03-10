<?php

namespace App\Http\Controllers;

use App\Models\RefreshedToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:50'],
            'password' => ['required', Password::min(8)]
        ]);
        try {
            if (! $token = JWTAuth::attempt($validated)) {
                return response()->json(['error' => 'invalid credential'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could not create token']);
        }
        response()->json(['access_token' => $token], 200);
        $user = User::where('email', $validated['email'])->first();

        // 3. Sécurité supplémentaire au cas où le user n'existerait vraiment pas
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }
        return $this->respond_with_token($token, $user);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'lastname' => ['required', 'max:50'],
            'firstname' => ['required', 'max:50'],
            'email' => ['required', 'email', 'unique:users', 'max:50'],
            'image_path' => ['nullable', 'image', 'mimes:jpeg', 'max:2048'],
            'password' => ['required', 'confirmed', Password::min(8)]
        ]);
        $user = User::create($validated);
        $token = Auth::guard('api')->login($user);


        response()->json(['token' => $token], 201);
        return $this->respond_with_token($token, $user);
    }

    public function logout()
    {
        auth('api')->logout();
    }

    public function respond_with_token($token, $user)
    {
        
        $refresh_token = bin2hex(random_bytes(64));
        $refresh_token_hash = hash('sha256', $refresh_token);
        RefreshedToken::create([
            'user_id' => $user->id,
            'refresh_token_hash' => $refresh_token_hash,
            'expire_at' => now()->addDay(30)
        ]);
        $cookie = cookie('refresh_token', $refresh_token, 60 * 24 * 30, '/', null, false, true, false, null);
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTl() * 60,
            'user_data' => $user
        ])->withCookie($cookie);
    }

    public function refresh(Request $request)
    {
        $rawToken = $request->cookie('refresh_token');

        if (!$rawToken) {
            return response()->json(['error' => 'No refresh token'], 401);
        }

        // Chercher le hash correspondant
        $hash = hash('sha256', $rawToken);
        $storedToken = RefreshedToken::where('refresh_token_hash', $hash)
            ->where('expire_at', '>', now())
            ->first();

        if (!$storedToken) {
            return response()->json(['error' => 'Invalid or expired refresh token'], 401);
        }

        // Générer un nouvel Access Token pour cet utilisateur
        $user = User::find($storedToken->user_id);
        $newAccessToken = auth('api')->login($user);

        // OPTIONNEL: Rotation du Refresh Token (Supprimer l'ancien et en créer un nouveau)
        $storedToken->delete();

        return $this->respond_with_token($newAccessToken, $user);
    }
}
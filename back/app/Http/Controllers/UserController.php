<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;



class UserController extends Controller
{
    /**
     * Mettre à jour le profil utilisateur
     */
    public function update(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Non autorisé'], 401);
        }

        // Validation des données
        $validated = $request->validate([
            'firstName' => ['nullable', 'string', 'max:50'],
            'lastName' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:100', 'unique:users,email,' . $user->id],
            'telephone' => ['nullable', 'string', 'max:20'],
            'localisation' => ['nullable', 'string', 'max:100'],
            'bio' => ['nullable', 'string', 'max:500']
        ]);

        // Filtrer les champs null pour ne mettre à jour que ce qui est fourni
        $dataToUpdate = array_filter($validated, function ($value) {
            return $value !== null;
        });

        // Mettre à jour l'utilisateur
        $user->update($dataToUpdate);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ], 200);
    }

    public function salvation(Request $request){
        $validated = $request->validate([
            'lastName' => ['required', 'max:50'],
            'firstName' => ['required', 'max:50'],
            'email' => ['required', 'email', 'unique:users', 'max:50'],
            'password' => ['required', ''],
            'telephone' => ['nullable', 'max:20'],
            'message' => ['nullable', 'string', 'max:50'],    
        ]);

        $validated['prayed_salvation_prayer'] = true;

        User::create($validated);

        return response()->json(['succes' => 'Utilisateur crée'], 200);
    }

    /**
     * Récupérer le profil utilisateur
     */
    public function show()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Non autorisé'], 401);
        }

        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Supprimer le compte utilisateur
     */
    public function destroy()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Non autorisé'], 401);
        }

        // Enregistrer l'ID avant suppression pour la réponse
        $userId = $user->id;

        // Supprimer l'utilisateur
        $user->delete();

        return response()->json([
            'message' => 'Compte supprimé avec succès',
            'user_id' => $userId
        ], 200);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MinistryRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::select('id', 'firstName', 'lastName', 'email', 'is_admin', 'is_superadmin', 'prayed_salvation_prayer', 'telephone', 'localisation', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users], 200);
    }

    public function userDetail($id)
    {
        $user = User::select('id', 'firstName', 'lastName', 'email', 'is_admin', 'is_superadmin', 'prayed_salvation_prayer', 'telephone', 'localisation', 'bio', 'created_at', 'updated_at')
            ->findOrFail($id);

        return response()->json(['user' => $user], 200);
    }

    public function salvation()
    {
        $users = User::select('id', 'firstName', 'lastName', 'email', 'telephone', 'created_at')
            ->where('prayed_salvation_prayer', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users], 200);
    }

    public function ministryRequests()
    {
        $requests = MinistryRequest::with('user:id,firstName,lastName,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['requests' => $requests], 200);
    }

    public function makeAdmin($id)
    {
        $user = User::findOrFail($id);
        if ($user->is_superadmin) {
            return response()->json(['error' => 'Impossible de modifier un super admin.'], 403);
        }
        $user->update(['is_admin' => true]);
        return response()->json(['success' => "{$user->firstName} {$user->lastName} est maintenant admin."], 200);
    }

    public function removeAdmin($id)
    {
        $user = User::findOrFail($id);
        if ($user->is_superadmin) {
            return response()->json(['error' => 'Impossible de modifier un super admin.'], 403);
        }
        $user->update(['is_admin' => false]);
        return response()->json(['success' => "{$user->firstName} {$user->lastName} n'est plus admin."], 200);
    }
}

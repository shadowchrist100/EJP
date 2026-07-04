<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\MinistryRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::select('id', 'firstName', 'lastName', 'email', 'is_admin', 'prayed_salvation_prayer', 'telephone', 'localisation', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['users' => $users], 200);
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
}

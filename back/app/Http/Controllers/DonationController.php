<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:1', 'max:9999999.99'],
        ]);

        $user = $request->user();

        Donation::create([
            'amount' => $validated['amount'],
            'user_id' => $user?->id,
            'status' => 'pending',
        ]);

        return response()->json(['success' => 'Don enregistré avec succès'], 201);
    }
}

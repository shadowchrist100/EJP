<?php

namespace App\Http\Controllers;

use App\Mail\MinistryRequestMail;
use App\Models\MinistryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MinistryRequestController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nom' =>['required', 'string', 'max:50'] ,
            'email' => ['required', 'email', 'max:50']   ,
            'ministry_name' => ['required', 'string'] ,
            'message' => ['nullable', 'string']
        ]);

        $validated['user_id'] = $user->id;

        MinistryRequest::create($validated);

        Mail::to(config('mail.from.address'))->send(new MinistryRequestMail(
            $validated['nom'],
            $validated['email'],
            $validated['ministry_name'],
            $validated['message'] ?? ''
        ));

        return response()->json(['success' => 'Demande enregistrée'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(MinistryRequest $ministryRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MinistryRequest $ministryRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MinistryRequest $ministryRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MinistryRequest $ministryRequest)
    {
        //
    }
}

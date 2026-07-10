<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Contact::create($validated);

        Mail::to(config('mail.from.address'))->send(new ContactMail(
            $validated['nom'],
            $validated['email'],
            $validated['message'],
        ));

        return response()->json(['success' => 'Message envoyé avec succès'], 201);
    }
}

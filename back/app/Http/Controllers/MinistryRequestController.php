<?php

namespace App\Http\Controllers;

use App\Models\MinistryRequest;
use Illuminate\Http\Request;

class MinistryRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = auth('api')->user();

        if ($user) {
            if ($user->email !== $request->email ) {
                return response()->json(['error' => 'Non authroisé'], 401);
            }
        }
        
        //
        $validated = $request->validate([
            'nom' =>['required', 'string', 'max:50'] ,
            'email' => ['required', 'email', 'max:50']   ,
            'ministry_name' => ['required', 'string'] ,
            'message' => ['nullable', 'string']
        ]);

        $validated['user_id'] = $user->id;

        MinistryRequest::create(array_intersect_key($validated,array_flip(['ministry_name', 'message', 'user_id'])));
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

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\UploadsImages;
use App\Models\Fij;
use Illuminate\Http\Request;

class FijController extends Controller
{
    use UploadsImages;

    public function index()
    {
        $fijs = Fij::orderBy('sort', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['fijs' => $fijs], 200);
    }

    public function store(Request $request)
    {
        $data = $this->validatedDecoded($request);

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $fij = Fij::create($data);

        return response()->json(['fij' => $fij], 201);
    }

    public function update(Request $request, $id)
    {
        $fij = Fij::findOrFail($id);
        $data = $this->validatedDecoded($request);

        if ($request->hasFile('image')) {
            $this->deleteImage($fij->image);
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $fij->update($data);

        return response()->json(['fij' => $fij], 200);
    }

    public function destroy($id)
    {
        $fij = Fij::findOrFail($id);
        $this->deleteImage($fij->image);
        $fij->delete();

        return response()->json(['message' => 'FIJ supprimée.'], 200);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:8192'],
            'description' => ['nullable', 'string'],
            'mapURL' => ['nullable', 'string', 'max:1000'],
            'phone' => ['nullable', 'string', 'max:255'],
            'lieu' => ['nullable', 'string', 'max:255'],
            'quartier_proches' => ['nullable', 'string', 'max:2000'],
            'Bergers' => ['nullable', 'string', 'max:1000'],
            'lat' => ['nullable', 'numeric'],
            'lng' => ['nullable', 'numeric'],
            'sort' => ['nullable', 'integer'],
        ]);
    }

    private function validatedDecoded(Request $request): array
    {
        $data = $this->validated($request);

        foreach (['quartier_proches', 'Bergers'] as $key) {
            if (isset($data[$key]) && is_string($data[$key])) {
                $decoded = json_decode($data[$key], true);
                $data[$key] = is_array($decoded) ? $decoded : [];
            }
        }

        return $data;
    }
}

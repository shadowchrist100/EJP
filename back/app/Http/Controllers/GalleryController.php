<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\UploadsImages;
use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    use UploadsImages;

    public function index()
    {
        $images = GalleryImage::orderBy('sort', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['images' => $images], 200);
    }

    public function store(Request $request)
    {
        $request->validate(['image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:8192']]);
        $data = $this->validated($request);
        $data['image'] = $this->storeImage($request->file('image'));

        $image = GalleryImage::create($data);

        return response()->json(['image' => $image], 201);
    }

    public function update(Request $request, $id)
    {
        $image = GalleryImage::findOrFail($id);
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $this->deleteImage($image->image);
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $image->update($data);

        return response()->json(['image' => $image], 200);
    }

    public function destroy($id)
    {
        $image = GalleryImage::findOrFail($id);
        $this->deleteImage($image->image);
        $image->delete();

        return response()->json(['message' => 'Image retirée de la galerie.'], 200);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:8192'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}

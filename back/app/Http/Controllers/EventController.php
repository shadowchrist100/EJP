<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\UploadsImages;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    use UploadsImages;

    public function index()
    {
        $events = Event::orderBy('date', 'asc')
            ->orderBy('sort', 'asc')
            ->get();

        return response()->json(['events' => $events], 200);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $event = Event::create($data);

        return response()->json(['event' => $event], 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $this->deleteImage($event->image);
            $data['image'] = $this->storeImage($request->file('image'));
        }

        $event->update($data);

        return response()->json(['event' => $event], 200);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $this->deleteImage($event->image);
        $event->delete();

        return response()->json(['message' => 'Événement supprimé.'], 200);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'time' => ['nullable', 'string', 'max:20'],
            'location' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:8192'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}

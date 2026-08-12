<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Support\Facades\Storage;

trait UploadsImages
{
    protected function storeImage($file, string $dir = 'images'): string
    {
        $path = $file->store($dir, 'public');
        return asset(Storage::url($path));
    }

    protected function deleteImage(?string $url): void
    {
        if (!$url) {
            return;
        }

        $prefix = Storage::url('');
        if (str_contains($url, $prefix)) {
            $path = substr($url, strpos($url, $prefix) + strlen($prefix));
        } else {
            $path = str_replace(asset($prefix), '', $url);
        }

        $path = ltrim($path, '/');

        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Fij;
use App\Models\GalleryImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedFijs();
        $this->seedEvents();
        $this->seedGallery();
    }

    private function seedFijs(): void
    {
        if (Fij::count() > 0) {
            $this->command->info('FIJs déjà présents — rien à faire.');
            return;
        }

        $path = base_path('/../front/public/data/fij.json');
        if (!File::exists($path)) {
            $this->command->warn("fij.json introuvable ({$path}) — FIJs ignorés.");
            return;
        }

        $fijs = json_decode(File::get($path), true);
        if (!is_array($fijs)) return;

        foreach ($fijs as $i => $f) {
            $image = $f['image'] ?? null;
            if ($image && str_starts_with($image, '..')) {
                $image = '/images/' . basename($image);
            }

            Fij::create([
                'nom' => $f['nom'],
                'image' => $image,
                'description' => $f['description'] ?? null,
                'mapURL' => $f['mapURL'] ?? null,
                'phone' => $f['phone'] ?? null,
                'lieu' => $f['lieu'] ?? null,
                'quartier_proches' => $f['quartier_proches'] ?? [],
                'Bergers' => $f['Bergers'] ?? [],
                'lat' => $f['lat'] ?? null,
                'lng' => $f['lng'] ?? null,
                'sort' => $i,
            ]);
        }

        $this->command->info(count($fijs) . ' FIJs importées.');
    }

    private function seedEvents(): void
    {
        if (Event::count() > 0) {
            $this->command->info('Événements déjà présents — rien à faire.');
            return;
        }

        $year = date('Y');
        $month = date('m');

        $events = [
            [
                'title' => 'Embrasé.e.s',
                'description' => 'Un moment spirituelle intense pour recharger ton homme intérieur',
                'date' => $this->firstMonday($year, $month),
                'time' => '19:00',
                'location' => 'EJP Porto',
                'image' => '/images/embrasees.jpeg',
            ],
            [
                'title' => 'Prodiges Expérience',
                'description' => 'Un culte, une expérience! Rejoins-nous pour vivre un culte une expérience.',
                'date' => $this->nextSunday(),
                'time' => '15:30',
                'location' => 'EJP Porto',
                'image' => '/images/culte2.jpeg',
            ],
            [
                'title' => 'FIJ - Famille D\'Impact Jeunes',
                'description' => 'Des soirées d\'échanges et de communion avec ta famille d\'impact. Moments de partage et de bénédictions.',
                'date' => $this->nextTuesday(),
                'time' => '19:15',
                'location' => 'EJP Porto',
                'image' => '/fij/image.jpg',
            ],
        ];

        foreach ($events as $i => $e) {
            Event::create($e + ['sort' => $i]);
        }

        $this->command->info(count($events) . ' événements importés.');
    }

    private function seedGallery(): void
    {
        if (GalleryImage::count() > 0) {
            $this->command->info('Images de galerie déjà présentes — rien à faire.');
            return;
        }

        $path = base_path('/../front/public/data/image.json');
        if (!File::exists($path)) {
            $this->command->warn("image.json introuvable ({$path}) — galerie ignorée.");
            return;
        }

        $images = json_decode(File::get($path), true);
        if (!is_array($images)) return;

        foreach ($images as $i => $img) {
            $url = $img['url'] ?? null;
            if ($url && str_starts_with($url, '..')) {
                $url = '/images/' . basename($url);
            }

            GalleryImage::create([
                'title' => $img['title'] ?? 'Image',
                'category' => $img['category'] ?? 'events',
                'description' => $img['description'] ?? null,
                'image' => $url ?? '',
                'sort' => $i,
            ]);
        }

        $this->command->info(count($images) . ' images de galerie importées.');
    }

    private function firstMonday(string $year, string $month): string
    {
        $ts = strtotime("first monday of {$year}-{$month}-01");
        return date('Y-m-d', $ts);
    }

    private function nextSunday(): string
    {
        return date('Y-m-d', strtotime('next sunday'));
    }

    private function nextTuesday(): string
    {
        return date('Y-m-d', strtotime('next tuesday'));
    }
}
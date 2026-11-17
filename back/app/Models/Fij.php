<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fij extends Model
{
    protected $fillable = [
        'nom',
        'image',
        'description',
        'mapURL',
        'phone',
        'lieu',
        'quartier_proches',
        'Bergers',
        'lat',
        'lng',
        'sort',
    ];

    protected $casts = [
        'quartier_proches' => 'array',
        'Bergers' => 'array',
        'lat' => 'float',
        'lng' => 'float',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'location',
        'image',
        'sort',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];
}

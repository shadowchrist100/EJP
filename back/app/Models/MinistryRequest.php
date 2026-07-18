<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MinistryRequest extends Model
{
    /** @use HasFactory<\Database\Factories\MinistryRequestFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'email',
        'ministry_name',
        'message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

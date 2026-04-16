<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MinistryRequest extends Model
{
    //
    protected $fillable = [
        'user_id',
        'ministry_name',
        'message',
    ];
}

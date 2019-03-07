<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{
    protected $fillable = [
        "channel_id",
        "tab_id",
        "title",
        "index",
        "type",
        "network"
    ];
}

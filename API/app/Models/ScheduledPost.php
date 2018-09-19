<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledPost extends Model
{   
    protected $fillable = [
        "channel_id",
        "content",
        "scheduled_at",
        "scheduled_at_original",
        "payload",
        "status",
        "posted"
    ];
    
    public function channel(){

        return $this->belongsTo(Channel::class);
    }
}

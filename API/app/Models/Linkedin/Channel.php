<?php

namespace App\Models\Linkedin;

use App\Traits\Selectable;
use App\Traits\Linkedin\LinkedinTrait;
use App\Models\Channel as GlobalChannel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use Selectable, LinkedinTrait;

    public $table = "linkedin_channels";

    protected $fillable = [
        "user_id",
        "channel_id",
        "original_id",
        "parent_id",
        "username",
        "name",
        "email",
        "payload",
        "access_token",
        "account_type",
        "selected"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function global()
    {
        return $this->belongsTo(GlobalChannel::class, "channel_id");
    }
}

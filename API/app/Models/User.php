<?php

namespace App\Models;

use App\Traits\Permissible;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, Permissible;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'role_id', 'username', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function channels()
    {
        return $this->hasMany(Channel::class);
    }

    public function selectedChannel()
    {
        return $this->channels()->where("selected", 1)->first();
    }

    public function twitterChannels()
    {
        return $this->hasMany(Twitter\Channel::class);
    }

    public function selectedTwitterChannel()
    {
        return $this->twitterChannels()->where("selected", 1)->first();
    }


}

<?php

namespace App\Models;

use App\Traits\Permissible;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, Permissible;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'role_id', 'username', 'password', 'website', 'timezone', 'usage_reason',
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

    public function formattedChannels(){

        if($channels = $this->channels()->get()){
            
            return collect($channels)->map(function($channel){
                    
                    $channel->details = @$channel->details;

                    if($channel->details){
                        if($channel->details->account_type != "page" && $channel->type != "linkedin"){
                            $avatar = @$channel->details->getAvatar();
                        }
                        $channel->details->payload = @unserialize($channel->details->payload);
                        $channel->avatar = @$avatar ? @$avatar : @$channel->details->payload->avatar;
                        $channel->name = @$channel->details->payload->name;
                        $channel->username = @$channel->details->payload->nickname;
                    }

                    return $channel;
                });
        }

        return [];
    }

    public function selectedChannel()
    {
        return $this->channels()->where("selected", 1)->first();
    }

    public function twitterChannels()
    {
        return $this->hasMany(Twitter\Channel::class);
    }

    public function facebookChannels()
    {
        return $this->hasMany(Facebook\Channel::class);
    }

    public function linkedinChannels()
    {
        return $this->hasMany(Linkedin\Channel::class);
    }

    public function pinterestChannels()
    {
        return $this->hasMany(Pinterest\Channel::class);
    }

    public function selectedTwitterChannel()
    {
        return $this->twitterChannels()->where("selected", 1)->first();
    }

    public function selectedFacebookChannel()
    {
        return $this->facebookChannels()->where("selected", 1)->first();
    }

    public function selectedLinkedinChannel()
    {
        return $this->linkedinChannels()->where("selected", 1)->first();
    }

    public function selectedPinterestChannel()
    {
        return $this->pinterestChannels()->where("selected", 1)->first();
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function tabs()
    {
        return $this->hasMany(Tab::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function roleAddons()
    {
        return $this->belongsToMany(RoleAddon::class, "user_role_addons", "user_id", "addon_id");
    }
}

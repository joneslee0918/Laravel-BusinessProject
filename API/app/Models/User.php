<?php

namespace App\Models;

use App\Traits\Permissible;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, Permissible, Billable;

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

    public function memberChannels()
    {
        return $this->hasMany(TeamUserChannel::class, "member_id");
    }

    public function approverChannels()
    {
        return $this->hasMany(TeamUserChannel::class, "approver_id");
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamUser::class, "owner_id");
    }

    public function hasPublishPermission($channel)
    {
        if(!$channel) return false;

        if($this->id === $channel->user_id) return true;

        return $this->memberChannels()->where("channel_id", $channel->id)->where("role", "publisher")->exists();
    }

    public function getChannel($id)
    {
        $channel = $this->channels()->find($id);

        if(!$channel) {
            $channel = $this->memberChannels()->where("channel_id", $id)->first();
            if($channel) $channel = $channel->channel;
        }

        if(!$channel) {
            $channel = $this->approverChannels()->where("channel_id", $id)->first();
            if($channel) $channel = $channel->channel;
        }

        return $channel;
    }

    public function formattedChannels(){

        $selectedChannel = $this->selectedChannel();
        $selectedTwitterChannel = $this->selectedTwitterChannel();

        if($channels = $this->channels()->get()){

            return collect($channels)->map(function($channel) use ($selectedChannel, $selectedTwitterChannel) {

                    $channel->details = @$channel->details;
                    $channel->selected = $selectedChannel && $selectedChannel->id == $channel->id ? 1 : 0;
                    if($channel->details){
                        if($channel->details->account_type != "page" && $channel->type != "linkedin"){
                            $avatar = @$channel->details->getAvatar();
                        }
                        $channel->details->payload = @unserialize($channel->details->payload);
                        $channel->details->selected = $channel->type == "twitter" && $selectedTwitterChannel->channel_id == $channel->id ? 1 : $channel->details->selected;
                        $channel->avatar = @$avatar ? @$avatar : @$channel->details->payload->avatar;
                        $channel->name = @$channel->details->payload->name;
                        $channel->username = @$channel->details->payload->nickname;
                    }

                    return $channel;
                });
        }

        return [];
    }

    public function formattedMemberChannels($markSelected = false){
        $selectedChannel = $this->selectedChannel();
        $selectedTwitterChannel = $this->selectedTwitterChannel();
        if($channels = $this->memberChannels()->get()){

            return collect($channels)->map(function($channel) use ($markSelected, $selectedChannel, $selectedTwitterChannel){
                    $permissionLevel = $channel->role;
                    $teamId = $channel->team_id;
                    $approverId = $channel->approver_id;

                    $channel = $channel->channel;
                    $channel->details = @$channel->details;
                    $channel->permissionLevel = $permissionLevel;
                    $channel->teamId = $teamId;
                    $channel->approverId = $approverId;
                    $channel->selected = $selectedChannel && $selectedChannel->id == $channel->id ? 1 : 0;

                    if($markSelected) $channel->selected = 1;

                    if($channel->details){
                        if($channel->details->account_type != "page" && $channel->type != "linkedin"){
                            $avatar = @$channel->details->getAvatar();
                        }
                        $channel->details->payload = @unserialize($channel->details->payload);
                        $channel->avatar = @$avatar ? @$avatar : @$channel->details->payload->avatar;
                        $channel->name = @$channel->details->payload->name;
                        $channel->username = @$channel->details->payload->nickname;
                        $channel->details->selected = $channel->type == "twitter" && $selectedTwitterChannel->channel_id == $channel->id ? 1 : $channel->details->selected;
                    }

                    return $channel;
                });
        }

        return [];
    }

    public function allFormattedChannels(){
        return $this->formattedChannels()->merge($this->formattedMemberChannels());
    }

    public function selectedChannelModel()
    {
        return $this->hasMany(SelectedChannel::class);
    }

    public function selectedChannel()
    {
        if($selectedChannelModel = $this->selectedChannelModel()->where("network", "global")->first()){
            $channel = $this->getChannel($selectedChannelModel->channel_id);
            if($channel) return $channel;
        }

        $channelIds = $this->memberChannels()->pluck("channel_id")->merge($this->channels()->pluck("id"));
        return Channel::whereIn("id", $channelIds)->first();
    }

    public function twitterChannels()
    {
        $channelIds = $this->memberChannels()->pluck("channel_id")->merge($this->channels()->pluck("id"));
        return Twitter\Channel::whereIn("channel_id", $channelIds);
    }

    public function facebookChannels()
    {
        $channelIds = $this->memberChannels()->pluck("channel_id")->merge($this->channels()->pluck("id"));
        return Facebook\Channel::whereIn("channel_id", $channelIds);
    }

    public function linkedinChannels()
    {
        $channelIds = $this->memberChannels()->pluck("channel_id")->merge($this->channels()->pluck("id"));
        return Linkedin\Channel::whereIn("channel_id", $channelIds);
    }

    public function pinterestChannels()
    {
        $channelIds = $this->memberChannels()->pluck("channel_id")->merge($this->channels()->pluck("id"));
        return Pinterest\Channel::whereIn("channel_id", $channelIds);
    }

    public function selectedTwitterChannel()
    {
        if($selectedChannelModel = $this->selectedChannelModel()->where("network", "twitter")->first()){
            $channel = $this->getChannel($selectedChannelModel->channel_id);

            if($channel) return $channel->details;
        }

        return $this->twitterChannels()->first();
    }

    public function selectedFacebookChannel()
    {
        if($selectedChannelModel = $this->selectedChannelModel()->where("network", "facebook")->first()){
            $channel = $this->getChannel($selectedChannelModel->channel_id);

            if($channel) return $channel->details;
        }

        return $this->facebookChannels()->first();
    }

    public function selectedLinkedinChannel()
    {
        if($selectedChannelModel = $this->selectedChannelModel()->where("network", "linkedin")->first()){
            $channel = $this->getChannel($selectedChannelModel->channel_id);

            if($channel) return $channel->details;
        }

        return $this->linkedinChannels()->first();
    }

    public function selectedPinterestChannel()
    {
        if($selectedChannelModel = $this->selectedChannelModel()->where("network", "pinterest")->first()){
            $channel = $this->getChannel($selectedChannelModel->channel_id);

            if($channel) return $channel->details;
        }

        return $this->pinterestChannels()->first();
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

    public function isOld($hours)
    {
        return strtotime($this->created_at) <= strtotime(Carbon::now()->subHours($hours));
    }
}

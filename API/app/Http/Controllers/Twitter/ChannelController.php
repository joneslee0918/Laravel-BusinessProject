<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Twitter\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Thujohn\Twitter\Facades\Twitter;

class ChannelController extends Controller
{

    public function channels() {
        return collect(auth()->user()->channels)->map(function($channel){
            $channel->attributes = @$channel->attributes;
            $channel->attributes->payload = @unserialize($channel->attributes->payload);
            $channel->avatar = @$channel->attributes->payload->avatar;
            return $channel;
        });
    }

    public function select($id)
    {
        if($channel = auth()->user()->twitterChannels()->where('id', $id)->first()){
            $channel->select();
            $channel->setAsCurrentUser();
        }

        return redirect()->back();
    }

}

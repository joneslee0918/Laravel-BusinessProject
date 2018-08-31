<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ChannelController extends Controller
{

    public function channels() {
        $user = auth()->user();
        return $user->formattedChannels();
    }

    public function select($id)
    {   
        $user = auth()->user();
        $channel = $user->channels()->find($id);

        if($channel){
            $channel->select();
        }

        return $user->formattedChannels();
    }

}

<?php

namespace App\Http\Controllers\Facebook;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChannelController extends Controller
{

    public function add(Request $request){
        
        $accessToken = $request->input("access_token");

        $credentials = Socialite::driver("twitter")->userFromToken($accessToken);

        if(is_object($credentials) && !isset($credentials->error)){

            $user = auth()->user();
            $existingChannel = $user->facebookChannels()->where("email", $credentials->email)->first();
    
            if(!$existingChannel){
                $channel = $user->channels()->create(["type" => "facebook"]);
                $facebookChannel = $channel->details()->create([
                    "user_id" => $user->id, 
                    "email" => $credentials->email,
                    "name" => $credentials->name, 
                    "payload" => serialize($credentials), 
                    "access_token" => $credentials->token,
                    "account_type" => "profile"
                ]);
    
                $channel->select();
                $facebookChannel->select();
    
            }else{
                $global = $existingChannel->global;
                $global->active = 1;
                $global->save();
                $facebookChannel = $existingChannel;
                $facebookChannel->access_token = $credentials->token;
                $facebookChannel->save();
            }

            return $user->formattedChannels();
        }

        return response()->json(['error' => 'Channel could not be authenticated with facebook'], 403);
    }

    public function select($id)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($id);

        if($channel){
            $channel->select();
            $channel->details->select();
        }

        return $user->formattedChannels();
    }
}

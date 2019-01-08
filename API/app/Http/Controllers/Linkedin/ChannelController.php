<?php

namespace App\Http\Controllers\Linkedin;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;

class ChannelController extends Controller
{

    public function add(Request $request){
        
        $accessToken = $request->input("access_token");

        $credentials = Socialite::driver("linkedin")->userFromToken($accessToken);

        if(is_object($credentials) && !isset($credentials->error)){

            $token = $credentials->token;

            $user = auth()->user();
            $existingChannel = $user->linkedinChannels()->where("email", $credentials->email)->first();
    
            if(!$existingChannel){
                $channel = $user->channels()->create(["type" => "linkedin"]);
                $linkedinChannel = $channel->details()->create([
                "user_id" => $user->id, 
                "name" => $credentials->name,
                "email" => $credentials->email, 
                "payload" => serialize($credentials), 
                "access_token" => json_encode($token)]);
    
                $channel->select();
                $linkedinChannel->select();
    
            }else{
                $global = $existingChannel->global;
                $global->active = 1;
                $global->save();
                $linkedinChannel = $existingChannel;
                $linkedinChannel->access_token = $token;
                $linkedinChannel->save();
            }

            return $user->formattedChannels();
        }

        return response()->json(['error' => 'Channel could not be authenticated with linkedin'], 403);
    }
}

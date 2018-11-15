<?php

namespace App\Http\Controllers\Facebook;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Carbon\Carbon;
use App\Models\Facebook\Channel;

class ChannelController extends Controller
{

    public function add(Request $request){
        
        $accessToken = $request->input("access_token");
        $accessToken = exchangeFBToken($accessToken)->getValue();
        $credentials = Socialite::driver("facebook")->userFromToken($accessToken);

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


    public function getAccounts(){
        $user = auth()->user();
        $channel = $user->selectedFacebookChannel();
        $response = collect($channel->getPages());
        $accounts = [];
        if(isset($response["data"])){
            $accounts = collect($response["data"])->map(function($page){
                $page["token"] = @$page["access_token"];
                $page["avatar"] = @$page["picture"]["data"]["url"];

                return $page;
            });
        }

        return $accounts;
    }

    public function saveAccounts(Request $request){

        try{
            $accounts = $request->get("accounts");
            $user = auth()->user();
            $channel = $user->selectedFacebookChannel();
    
            if(!$accounts) return;
    
            $accountData = [];
            foreach($accounts as $account){

                $existingChannel = $user->facebookChannels()->where("original_id", $account["id"])->where("parent_id", "channel_id")->first();

                if(!$existingChannel){

                    $newChannel = $user->channels()->create(["type" => "facebook"]);

                    $newChannel->details()->create([
                        "user_id" => $user->id,
                        "name" => $account["name"],
                        "original_id" => $account["id"],
                        "access_token" => $account["token"],
                        "parent_id" => $channel->id,
                        "payload" => serialize((object) $account),
                        "account_type" => "page"
                    ]);

                    $newChannel->select();

                }else{
                    $existingChannel->access_token = $account["token"];
                    $existingChannel->global()->select();
                    $existingChannel->save();
                }
            }
    
        }catch(\Exception $e){
            return response()->json(["error" => $e->getMessage()], 400);
        }

        return response()->json(["message" => "Account added successfully."]);
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

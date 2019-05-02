<?php

namespace App\Http\Controllers\Linkedin;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use App\Models\Linkedin\Channel;

class ChannelController extends Controller
{

    public function add(Request $request){
        
        $accessToken = $request->input("access_token");

        $credentials = Socialite::driver("linkedin")->userFromToken($accessToken);

        if(is_object($credentials) && !isset($credentials->error)){

            $token = $credentials->token;

            $user = auth()->user();
            $existingChannel = Channel::where("email", $credentials->email)->first();
    
            if(!$existingChannel){
                $channel = $user->channels()->create(["type" => "linkedin"]);
                $linkedinChannel = $channel->details()->create([
                "user_id" => $user->id, 
                "name" => $credentials->name,
                "email" => $credentials->email, 
                "payload" => serialize($credentials), 
                "account_type" => "profile",
                "access_token" => $token]);
    
                $channel->select();
                $linkedinChannel->select();
    
            }else{
                if($existingChannel->user_id == $user->id){
                    $global = $existingChannel->global;
                    $global->active = 1;
                    $global->save();
                    $linkedinChannel = $existingChannel;
                    $linkedinChannel->access_token = $token;
                    $linkedinChannel->save();
                }else{
                    return response()->json(['error' => 'Channel already exists with some other account'], 400);
                }
            }

            return $user->formattedChannels();
        }

        return response()->json(['error' => 'Channel could not be authenticated with linkedin'], 403);
    }

    public function getPages(){
        $user = auth()->user();
        $channel = $user->selectedLinkedinChannel();
        $response = collect($channel->getPages());

        $pages = [];
        if(isset($response["data"])){
            $pages = collect($response["data"])->map(function($page){
                $page["token"] = @$page["access_token"];
                $page["avatar"] = @$page["picture"]["data"]["url"];

                return $page;
            });
        }

        $response = collect($channel->getGroups());
        $groups = [];
        if(isset($response["data"])){
            $groups = collect($response["data"])->map(function($group) use ($channel){
                $group["token"] = @$channel->access_token;
                $group["avatar"] = @$group["picture"]["data"]["url"];

                return $group;
            });
        }

        $results = collect($pages)->merge(collect($groups));

        return $results;
    }

    public function savePages(Request $request){

        try{
            $accounts = $request->get("accounts");
            $user = auth()->user();
            $channel = $user->selectedFacebookChannel();
    
            if(!$accounts) return;
    
            $accountData = [];
            foreach($accounts as $account){

                $existingChannel = $user->facebookChannels()->where("original_id", $account["id"])->where("parent_id", $channel->id)->first();

                if(!$existingChannel){

                    $newChannel = $user->channels()->create(["type" => "facebook"]);

                    $newChannel->details()->create([
                        "user_id" => $user->id,
                        "name" => $account["name"],
                        "original_id" => $account["id"],
                        "access_token" => $account["token"],
                        "parent_id" => $channel->id,
                        "payload" => serialize((object) $account),
                        "account_type" => $account["token"] == "group" ? "group" : "page"
                    ]);

                    $newChannel->select();

                }else{
                    $existingChannel->access_token = $account["token"];
                    $existingChannel->save();
                    $global = $existingChannel->global;
                    $global->active = 1;
                    $global->selected = 1;
                    $global->save();
                }
            }
    
        }catch(\Exception $e){
            return response()->json(["error" => $e->getMessage()], 400);
        }

        return response()->json(["message" => "Account added successfully."]);
    }
    public function test()
    {
        $channel = Channel::first();

        return $channel->getPages();
    }
}

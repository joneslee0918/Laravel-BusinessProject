<?php

namespace App\Resolvers;

use Adaojunior\Passport\SocialGrantException;
use Adaojunior\Passport\SocialUserResolverInterface;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\Twitter\Channel as TwitterChannel;
use App\Models\Facebook\Channel as FacebookChannel;
use App\Models\Role;

class SocialUserResolver implements SocialUserResolverInterface
{

    /**
     * Resolves user by given network and access token.
     *
     * @param string $network
     * @param string $accessToken
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function resolve($network, $accessToken, $accessTokenSecret = null)
    {   
        switch ($network) {
            case 'facebook':
                return $this->authWithFacebook($accessToken);
                break;
            case 'twitter':
                return $this->authWithTwitter($accessToken, $accessTokenSecret);
                break;
            default:
                throw SocialGrantException::invalidNetwork();
                break;
        }
    }
    
    
    /**
     * Resolves user by facebook access token.
     *
     * @param string $accessToken
     * @return \App\Models\User
     */
    protected function authWithFacebook($accessToken)
    {
        try{
            $credentials = Socialite::driver("facebook")->userFromToken($accessToken);
            return $this->resolveFacebookUser($credentials);

        }catch(\Exception $e){
            
            return response()->json($e->getMessage());
        }
    }

    /**
     * Resolves user by twitter access token and secret.
     *
     * @param string $accessToken
     * @param string $accessTokenSecret
     * @return \App\Models\User
     */
    protected function authWithTwitter($accessToken, $accessTokenSecret)
    {   
        try{
            
            $credentials = Socialite::driver("twitter")->userFromTokenAndSecret($accessToken, $accessTokenSecret);
            return $this->resolveTwitterUser($credentials);

        }catch(\Exception $e){
            
            return response()->json($e->getMessage());
        }
    }


       /** 
    * Creates a new user or channel, or uses existing data if tokens are correct
    * @param object $credentials
    * @return \App\Models\User
    */
    protected function resolveFacebookUser($credentials)
    {                   
        if(is_object($credentials) && !isset($credentials->error)){

            $facebookChannel = FacebookChannel::where("email", $credentials->email)->first();
            if(!$facebookChannel){

                $user = User::updateOrCreate(
                    ["email" => $credentials->email], 
                    [
                        "name" => $credentials->name, 
                        "email" => $credentials->email, 
                        "role_id" => Role::first()->id
                    ]
                );

                $channel = $user->channels()->create(["type" => "facebook"]);
                $facebookChannel = $channel->details()->create(
                    [
                    "user_id" => $user->id, 
                    "email" => $credentials->email,
                    "name" => $credentials->name, 
                    "payload" => serialize($credentials), 
                    "access_token" => $credentials->token,
                    "account_type" => "profile"
                    ]
                );

            }else{
                $user = $facebookChannel->user;
                $channel = $user->channels()->where("id", $facebookChannel->channel_id)->first();
            }

            $channel->select();
            $channel->active=1;
            $channel->save();
            $facebookChannel->access_token = $credentials->token;
            $facebookChannel->save();
            $facebookChannel->select();

            return $user;
        }

        return null;
    }

   /** 
    * Creates a new user or channel, or uses existing data if tokens are correct
    * @param object $credentials
    * @return \App\Models\User
    */
    protected function resolveTwitterUser($credentials)
    {   
        if(is_object($credentials) && !isset($credentials->error)){
            $token = [
                "oauth_token" => $credentials->token,
                "oauth_token_secret" => $credentials->tokenSecret
            ];

            $twitterChannel = TwitterChannel::where("username", $credentials->nickname)->first();

            if(!$twitterChannel){

                $user = User::updateOrCreate(
                    ["username" => $credentials->nickname], 
                    [
                        "name" => $credentials->name, 
                        "username" => $credentials->nickname, 
                        "role_id" => Role::first()->id
                    ]
                );

                $channel = $user->channels()->create(["type" => "twitter"]);
                $twitterChannel = $channel->details()->create(
                    [
                    "user_id" => $user->id, 
                    "username" => $credentials->nickname, 
                    "payload" => serialize($credentials), 
                    "access_token" => json_encode($token)
                    ]
                );

            }else{
                $user = $twitterChannel->user;
                $channel = $user->channels()->where("id", $twitterChannel->channel_id)->first();
            }

            $channel->select();
            $channel->active=1;
            $channel->save();
            $twitterChannel->access_token = json_encode($token);
            $twitterChannel->save();
            $twitterChannel->select();

            /*
            * Sync following and followers in the background
            */

            multiRequest(route("sync.follower.ids"), [$twitterChannel], ["sleep" => 0]);
            multiRequest(route("sync.following.ids"), [$twitterChannel], ["sleep" => 0]);

            return $user;
        }

        return null;
    }
}
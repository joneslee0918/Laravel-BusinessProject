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

    public function login(Request $request)
    {
        $sign_in_twitter = true;
        $force_login = $request->input('force_login') ? $request->input('force_login') : false;


        // Make sure we make this request w/o tokens, overwrite the default values in case of login.
        Twitter::reconfig(['token' => '', 'secret' => '']);
        $token = Twitter::getRequestToken(route('twitter.callback'));

        if (isset($token['oauth_token_secret'])) {
            $url = Twitter::getAuthorizeURL($token, $sign_in_twitter, $force_login);

            session()->put('oauth_state', 'start');
            session()->put('oauth_request_token', $token['oauth_token']);
            session()->put('oauth_request_token_secret', $token['oauth_token_secret']);

            return redirect($url);
        }

        return redirect()->route('twitter.error');
    }


    public function callback(Request $request)
    {
        // You should set this route on your Twitter Application settings as the callback
        // https://apps.twitter.com/app/YOUR-APP-ID/settings
        if (session()->has('oauth_request_token')) {
            $request_token = [
                'token' => session('oauth_request_token'),
                'secret' => session('oauth_request_token_secret'),
            ];

            Twitter::reconfig($request_token);

            $oauth_verifier = false;

            if ($request->has('oauth_verifier')) {
                $oauth_verifier = $request->get('oauth_verifier');
                // getAccessToken() will reset the token for you
                $token = Twitter::getAccessToken($oauth_verifier);
            }

            if (!isset($token['oauth_token_secret'])) {
                return Redirect::route('twitter.error')->with('flash_error', 'We could not log you in on Twitter.');
            }

            $credentials = Twitter::getCredentials();

            if (is_object($credentials) && !isset($credentials->error)) {

                $existingChannel = Channel::where("username", $credentials->screen_name)->first();

                if (!auth()->check()) {

                    if($existingChannel){
                        $user = User::find($existingChannel->user_id);
                    }else{
                        $user = User::updateOrCreate(["username" => $credentials->screen_name], ["name" => $credentials->name, "username" => $credentials->screen_name, "role_id" => Role::first()->id]);
                    }

                    // $credentials contains the Twitter user object with all the info about the user.
                    // Add here your own user logic, store profiles, create new users on your tables...you name it!
                    // Typically you'll want to store at least, user id, name and access tokens
                    // if you want to be able to call the API on behalf of your users.

                    // This is also the moment to log in your users if you're using Laravel's Auth class
                    // Auth::login($user) should do the trick.

                    auth()->login($user);
                }

                if(!$existingChannel){
                    $channel = auth()->user()->channels()->create(["type" => "twitter"]);
                    $twitterChannel = $channel->attributes()->create(["user_id" => auth()->user()->id, "username" => $credentials->screen_name, "payload" => serialize($credentials), "access_token" => json_encode($token)]);
                    $channel->select();
                    $twitterChannel->select();

                    /*
                     * Sync following and followers in the background
                     */
                    multiRequest(route("sync.follower.ids"), [$twitterChannel], ["sleep" => 0]);
                    multiRequest(route("sync.following.ids"), [$twitterChannel], ["sleep" => 0]);
                }

                return redirect()->route('manage.dashboard');
            }

            return redirect()->route('twitter.error')->with('flash_error', 'Crab! Something went wrong while signing you up!');
        }
    }

    public function error()
    {
        die("Something went wrong.");
    }

    public function logout()
    {
        session()->forget('access_token');
        return redirect('/')->with('flash_notice', 'You\'ve successfully logged out!');
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

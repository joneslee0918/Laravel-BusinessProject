<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Twitter\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Thujohn\Twitter\Facades\Twitter;

class AuthController extends Controller
{

    public function login(Request $request)
    {   

        if (cache()->has('oauth_request_token')) {
            $request_token = [
                'token' => cache('oauth_request_token'),
                'secret' => cache('oauth_request_token_secret'),
            ];

            Twitter::reconfig($request_token);

            $oauth_verifier = false;

            if ($request->has('oauth_verifier')) {
                $oauth_verifier = $request->get('oauth_verifier');
                // getAccessToken() will reset the token for you
                $token = Twitter::getAccessToken($oauth_verifier);
            }

            if (!isset($token['oauth_token_secret'])) {
                //fail
            }

            $credentials = Twitter::getCredentials();
            
            return redirect("/");
        }
    }


    public function reverse(Request $request)
    {   
        // Make sure we make this request w/o tokens, overwrite the default values in case of login.
        Twitter::reconfig(['token' => '', 'secret' => '']);
        $token = Twitter::getRequestToken(route('api.twitter.login'));

        if (isset($token['oauth_token_secret'])) {
            
            cache()->put('oauth_state', 'start', 5);
            cache()->put('oauth_request_token', $token['oauth_token'], 5);
            cache()->put('oauth_request_token_secret', $token['oauth_token_secret'], 5);
        }

        return response()->json($token);
    }

}

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
        $token = $request->all();

        return response()->json($token);
    }


    public function reverse(Request $request)
    {   

        // Make sure we make this request w/o tokens, overwrite the default values in case of login.
        Twitter::reconfig(['token' => '', 'secret' => '']);
        $token = Twitter::getRequestToken(route('api.twitter.login'));
        return response()->json($token);
    }

}

<?php

namespace App\Http\Controllers\Linkedin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Artesaos\LinkedIn\Facades\LinkedIn;

class AuthController extends Controller
{

    public function accessToken(Request $request)
    {   
        $code = $request->input("oauthToken");
        $clientUrl = config('frontendclient.client_url');
        $clientId = config('services.linkedin.client_id');
        $clientSecret = config('services.linkedin.client_secret');
        $params = "grant_type=authorization_code&code={$code}&redirect_uri={$clientUrl}&client_id={$clientId}&client_secret={$clientSecret}";
        $url = "https://www.linkedin.com/oauth/v2/accessToken?{$params}";

        $curl = curl_init($url);

        $credentials = curl_exec($curl);

        print_r(curl_getinfo($curl));
        die();
        return response()->json($credentials);
    }

}
<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('twitter/user', function(Request $request){
    $request_token = [
        'token' => "19484596-vIphwXHo2CYrtMv1vq2aIj5y5NdAP0zxLpsITaVhE",
        'secret' => "JIRXtXmkH2InKbnIT3bnljFJjJ7w98I4QI8rJxtpkthHm",
    ];

    //Twitter::reconfig($request_token);
    return response()->json(Socialite::driver("twitter")->userFromTokenAndSecret("19484596-vIphwXHo2CYrtMv1vq2aIj5y5NdAP0zxLpsITaVhE", "JIRXtXmkH2InKbnIT3bnljFJjJ7w98I4QI8rJxtpkthHm"));
});

Route::get("/twitter/login", "Twitter\AuthController@login")->name("api.twitter.login");
Route::post("/twitter/access", "Twitter\AuthController@access")->name("api.twitter.access");
Route::post("/twitter/reverse", "Twitter\AuthController@reverse")->name("api.twitter.reverse");
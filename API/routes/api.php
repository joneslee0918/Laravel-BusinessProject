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
        'token' => "974286749739421696-EWmg5Fmpy2gkELc7sgfW5bHSYnGdr4j",
        'secret' => "d158EDs1xjPgiyMJR9XDJu3pIEwWFREsAfvv6mgxSdvr6",
    ];

    Twitter::reconfig($request_token);
    return response()->json(Twitter::getCredentials());
});

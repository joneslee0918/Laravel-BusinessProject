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

Route::middleware('auth:api')->group(function(){
    Route::get('/channels', 'Twitter\ChannelController@channels');
});

//Twitter login
Route::get("/twitter/login", "Twitter\AuthController@login")->name("api.twitter.login");
Route::post("/twitter/access", "Twitter\AuthController@access")->name("api.twitter.access");
Route::post("/twitter/reverse", "Twitter\AuthController@reverse")->name("api.twitter.reverse");
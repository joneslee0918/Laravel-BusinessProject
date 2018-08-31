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
    Route::get('/channels', 'ChannelController@channels');
    Route::patch('/channels/select/{id}', 'ChannelController@select');
});

//Twitter login
Route::prefix("twitter")->group(function(){
    Route::get("login", "Twitter\AuthController@login")->name("api.twitter.login");
    Route::post("access", "Twitter\AuthController@access")->name("api.twitter.access");
    Route::post("reverse", "Twitter\AuthController@reverse")->name("api.twitter.reverse"); 

    Route::middleware('auth:api')->group(function(){
        Route::get('dashboard/{id}', 'Twitter\DashboardController@index');
        Route::patch('channels/select/{id}', 'Twitter\ChannelController@select');
    });
});

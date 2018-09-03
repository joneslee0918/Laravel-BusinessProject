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


Route::prefix("twitter")->group(function(){
    
    //Twitter login
    Route::get("login", "Twitter\AuthController@login")->name("api.twitter.login");
    Route::post("access", "Twitter\AuthController@access")->name("api.twitter.access");
    Route::post("reverse", "Twitter\AuthController@reverse")->name("api.twitter.reverse"); 

    Route::middleware('auth:api')->group(function(){
        Route::get('dashboard', 'Twitter\DashboardController@index');
        Route::patch('channels/select/{id}', 'Twitter\ChannelController@select');
        Route::post('channels/add', 'Twitter\ChannelController@add');

        Route::get('account-targets/feed', 'Twitter\AccountTargetsController@feed');
        Route::post('account-targets/store', 'Twitter\AccountTargetsController@store');
        Route::delete('account-targets/destroy/{username}', 'Twitter\AccountTargetsController@destroy');
    });
});

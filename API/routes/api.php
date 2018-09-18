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
    Route::post('/publish', 'PublishController@publishHandler');
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

        Route::get('account-targets', 'Twitter\AccountTargetsController@feed');
        Route::post('account-targets/store', 'Twitter\AccountTargetsController@store');
        Route::delete('account-targets/destroy/{username}', 'Twitter\AccountTargetsController@destroy');

        Route::get('keyword-targets', 'Twitter\KeywordTargetsController@feed');
        Route::post('keyword-targets/store', 'Twitter\KeywordTargetsController@store');
        Route::delete('keyword-targets/destroy/{username}', 'Twitter\KeywordTargetsController@destroy');

        Route::get('fans', 'Twitter\FansController@feed');
        Route::get('non-followers', 'Twitter\NonFollowersController@feed');
        Route::get('recent-unfollowers', 'Twitter\RecentUnfollowersController@feed');
        Route::get('recent-followers', 'Twitter\RecentFollowersController@feed');
        Route::get('inactive-following', 'Twitter\InactiveFollowingController@feed');
        Route::get('following', 'Twitter\FollowingController@feed');

        Route::patch('follow/{userId}', 'Twitter\Actions\FollowController@follow');
        Route::patch('unfollow/{userId}', 'Twitter\Actions\UnfollowController@unfollow');

        Route::post('tweet', 'Twitter\Actions\StatusController@tweet');
    });
});

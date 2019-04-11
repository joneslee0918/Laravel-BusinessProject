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
    Route::post('/profile', 'ProfileController@update');
    Route::get('/profile', 'ProfileController@profile');
    Route::get('/channels', 'ChannelController@channels');
    Route::patch('/channels/select/{id}', 'ChannelController@select');
    Route::delete('channels/delete/{id}', 'ChannelController@destroy');

    Route::get('/scheduled/posts', 'ScheduledController@scheduledPosts');
    Route::get('/scheduled/past', 'ScheduledController@pastScheduled');

    Route::post('/post/store', 'PublishController@store');
    Route::delete('/post/{postId}', 'PublishController@destroy');
    Route::post('/post/{postId}', 'PublishController@postNow');

    Route::get('/articles', 'ArticlesController@articles');

    Route::get('/streams', 'StreamsController@index');
    Route::post('/streams/add', 'StreamsController@addStream');
    Route::post('/streams/update', 'StreamsController@updateStream');
    Route::post('/streams/position', 'StreamsController@positionStream');
    Route::post('/streams/tabs/select', 'StreamsController@selectTab');
    Route::post('/streams/tabs/position', 'StreamsController@positionTab');
    Route::post('/streams/tabs/add', 'StreamsController@addTab');
    Route::post('/streams/tabs/delete', 'StreamsController@deleteTab');
    Route::post('/streams/tabs/rename', 'StreamsController@renameTab');
});

Route::post('/publish', 'PublishController@publish')->name('publish');
Route::post('/articles/sync', 'ArticlesController@sync')->name('articles.sync');

Route::prefix("twitter")->group(function(){
    
    //Twitter login
    Route::get("login", "Twitter\AuthController@login")->name("api.twitter.login");
    Route::post("access", "Twitter\AuthController@access")->name("api.twitter.access");
    Route::post("reverse", "Twitter\AuthController@reverse")->name("api.twitter.reverse"); 

    Route::middleware('auth:api')->group(function(){
        Route::get('dashboard', 'Twitter\DashboardController@index');
        Route::get('analytics', 'Twitter\AnalyticsController@index');
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

        Route::post('streams/scheduled', 'Twitter\StreamsFeedController@scheduled');
        Route::post('streams/{type}', 'Twitter\StreamsFeedController@index');
    });
});

Route::prefix("facebook")->group(function(){

    Route::middleware('auth:api')->group(function(){
        Route::post('channels/add', 'Facebook\ChannelController@add');
        Route::get('channels/accounts', 'Facebook\ChannelController@getAccounts');
        Route::post('channels/accounts/save', 'Facebook\ChannelController@saveAccounts');
        Route::get('analytics', 'Facebook\AnalyticsController@index');
        Route::get('insights/page', 'Facebook\AnalyticsController@pageInsights');
        Route::get('insights/page/{type}', 'Facebook\AnalyticsController@pageInsightsByType');

        Route::post('streams/scheduled', 'Twitter\StreamsFeedController@scheduled');
        Route::post('streams/{type}', 'Twitter\StreamsFeedController@index');
    });
});

Route::prefix("linkedin")->group(function(){
    Route::get('callback', 'Linkedin\AuthController@accessToken');

    Route::middleware('auth:api')->group(function(){
        Route::post('channels/add', 'Linkedin\ChannelController@add');
    });
});

Route::prefix("pinterest")->group(function(){
    Route::get('callback', 'Pinterest\AuthController@accessToken');

    Route::middleware('auth:api')->group(function(){
        Route::post('channels/add', 'Pinterest\ChannelController@add');
        Route::get('channels/boards', 'Pinterest\ChannelController@getBoards');
    });
});

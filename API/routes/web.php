<?php
set_time_limit (200);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login/admin', 'Auth\LoginController@showAdminLoginForm');
Route::post('/login/admin', 'Auth\LoginController@adminLogin');
Route::get('/logout', 'Auth\LoginController@logout');

Route::prefix("admin")->middleware(["auth:admin"])->group(function(){
    Route::get('dashboard', ['as'=>'admin.dashboard', 'uses'=>'Admin\AdminController@dashboard']);
    Route::get('post/create', ['as'=>'admin.post.create', 'uses'=>'Admin\AdminController@createPost']);
    Route::post('post/store', ['as'=>'post.store', 'uses'=>'Admin\AdminController@storePost']);
    Route::get('post/edit/{id}', ['as'=>'post.edit', 'uses'=>'Admin\AdminController@editPost']);
    Route::post('post/edit/{id}',['as'=>'post.edit.store', 'uses'=>'Admin\AdminController@editPostStore']);
    Route::post('post/image/upload', ['as'=>'post.image.store', 'uses'=>'Admin\AdminController@uploadPostImage']);
    Route::post('post/delete/{id}',['as'=>'post.delete', 'uses'=>'Admin\AdminController@deletePost']);
});

Route::get('/', ['as' => 'homepage.index', 'uses' => 'PagesController@index']);
Route::get('/upgrade', ['as' => 'upgrade', 'uses' => 'PagesController@upgrade']);
Route::get('/education', ['as' => 'education', 'uses' => 'PagesController@education']);
Route::get('/pricing', ['as' => 'pricing', 'uses' => 'PagesController@pricing']);
Route::get('/blog', ['as' => 'blog', 'uses' => 'PagesController@blog']);
Route::get('/article/{id}', ['as' => 'article', 'uses' => 'PagesController@article']);
Route::get('/privacy-policy', function(){
    return view("privacy-policy");
});

Route::get('/test', function(){
    $channel = \App\Models\Facebook\Channel::where("parent_id", 8)->update(["access_token" => 8]);
    //$post = $channel->getNonProfileAvatar();
    //return $post;
    // $pinterest = new \DirkGroenen\Pinterest\Pinterest(config("services.pinterest.client_id"), config("services.pinterest.client_secret"));
    // $pinterest->auth->setOAuthToken("Aj2PnZvkTp-WdatfiA5hRFh85nJyFW_p8SVgt8NFdeEVOmBVTwZ8ADAAAY5jRXZvBckAfusAAAAA");
    //return $channel->getBoards();
   // return $channel->getAvatar("Aj2PnZvkTp-WdatfiA5hRFh85nJyFW_p8SVgt8NFdeEVOmBVTwZ8ADAAAY5jRXZvBckAfusAAAAA");
    //  dd($channel);
    // $scheduledPost = $channel->global->scheduledPosts()->first();
    die("Done");
    dd($post);
    return $channel->publishScheduledPost($scheduledPost);

//     $token = "EAAFNlFdu1UgBAMZA753G1bcUZBVRmKfAvoY7NPNIIAquXhvpPUtmJ5pAovwZAGApN3VZBlUnTZB1jOIoR4f8FDGMSpwj5FTmWbfDs4z73EgrD83KPZAaIEgLic6WFYZCp1zPhbZAgDvBTghYaEtnbyIMsgiZATVVbDIsfEC3SCZCpe5FHKM38i4zGe57SrPQx4kEHl4ZBkl6ZBLyzxGECAFajfuwEyCTlWZAH8yVbk20ZCfn46BwZDZD";
//     $fb = app(SammyK\LaravelFacebookSdk\LaravelFacebookSdk::class);
//     $fb->setDefaultAccessToken($token);
//    // $result = $fb->post('/104120780629082/accounts?name=TestPage&category_enum=LITERARY_ARTS&about=For Fun&picture=https://dev.uniclixapp.com/images/logo.png&cover_photo={"url": "https://socialmediadesigns.org/wp-content/uploads/2018/01/facebook-cover-size-2018.jpg"}');
//     $result = $fb->get("/104120780629082/accounts?fields=id");
//     return response()->json($result->getDecodedBody());
    //$fb->setDefaultAccessToken($token);

    // $accessToken = "AQQE-MJuFJTCM6YwpNmjd1pRH_UTXUZzGoQOGdszVxPVp6YVFFAWuPV_3w6tOu3ljuY60hoiVs-_CWo3OA__D9l5hRrBPq4655AV-utnL6c7BcbPrMSkbgKGbh9cQoWxTd8OYsC0rtU0mYVhGUFsABTINj2iKSBq7DvHurMqJoqU9plr2spoRAIqlVlQtw";
    // $credentials = \Laravel\Socialite\Facades\Socialite::driver("linkedin")->userFromToken($accessToken);

    // return response()->json($credentials);
})->name("test");

Route::post('twitter/login', ['as' => 'twitter.login', 'uses' => 'Twitter\ChannelController@login']);
Route::post('twitter/callback', ['as' => 'twitter.callback', 'uses' => 'Twitter\ChannelController@callback']);
Route::get('twitter/error', ['as' => 'twitter.error', 'Twitter\ChannelController@error']);
Route::get('twitter/logout', ['as' => 'twitter.logout', 'uses' => 'Twitter\ChannelController@error']);

Route::get('facebook/callback', function(Request $request){
    return $request->all();
});

Route::get('linkedin/callback', function(Request $request){
    return $request->all();
});

Route::prefix("manage")->middleware(["auth"])->group(function(){
    Route::get('dashboard', ['as' => 'manage.dashboard', 'uses' => 'Twitter\DashboardController@index']);
    Route::get('fans', ['as' => 'manage.fans', 'uses' => 'Twitter\FansController@index']);
    Route::get('non-followers', ['as' => 'manage.nonfollowers', 'uses' => 'Twitter\NonFollowersController@index']);
    Route::get('recent-unfollowers', ['as' => 'manage.recent.unfollowers', 'uses' => 'Twitter\RecentUnfollowersController@index']);
    Route::get('recent-followers', ['as' => 'manage.recent.followers', 'uses' => 'Twitter\RecentFollowersController@index']);
    Route::get('inactive-following', ['as' => 'manage.inactive.following', 'uses' => 'Twitter\InactiveFollowingController@index']);
    Route::get('following', ['as' => 'manage.following', 'uses' => 'Twitter\FollowingController@index']);
    Route::get('whitelist', ['as' => 'manage.whitelist', 'uses' => 'Twitter\WhitelistController@index']);
    Route::get('blacklist', ['as' => 'manage.blacklist', 'uses' => 'Twitter\BlacklistController@index']);
    Route::get('select/{id}', ['as' => 'manage.select', 'uses' => 'Twitter\ChannelController@select']);
    Route::get('account-targets', ['as' => 'manage.account.targets', 'uses' => 'Twitter\AccountTargetsController@index']);
    Route::get('keyword-targets', ['as' => 'manage.keyword.targets', 'uses' => 'Twitter\KeywordTargetsController@index']);
    Route::get('add/account-targets', ['as' => 'add.account.targets', 'uses' => 'Twitter\AccountTargetsController@add']);
    Route::get('show/account-targets', ['as' => 'show.account.targets', 'uses' => 'Twitter\AccountTargetsController@show']);
    Route::get('add/keyword-targets', ['as' => 'add.keyword.targets', 'uses' => 'Twitter\KeywordTargetsController@add']);
    Route::get('show/keyword-targets', ['as' => 'show.keyword.targets', 'uses' => 'Twitter\KeywordTargetsController@show']);

    //POST
    Route::post('store/account-targets', ['as' => 'store.account.targets', 'uses' => 'Twitter\AccountTargetsController@store']);
    Route::delete('destroy/account-targets', ['as' => 'destroy.account.targets', 'uses' => 'Twitter\AccountTargetsController@destroy']);
    Route::post('store/keyword-targets', ['as' => 'store.keyword.targets', 'uses' => 'Twitter\KeywordTargetsController@store']);
    Route::delete('destroy/keyword-targets', ['as' => 'destroy.keyword.targets', 'uses' => 'Twitter\KeywordTargetsController@destroy']);
});

Route::middleware(["auth"])->group(function(){
    Route::post('twitter/follow', ['as' => 'twitter.follow', 'uses' => 'Twitter\Actions\FollowController@follow']);
    Route::post('twitter/unfollow', ['as' => 'twitter.unfollow', 'uses' => 'Twitter\Actions\UnfollowController@unfollow']);
});

Route::prefix("sync")->group(function(){
    Route::post('twitter/follower/ids', ['as' => 'sync.follower.ids', 'uses' => 'Twitter\BackgroundController@syncFollowerIds']);
    Route::post('twitter/following/ids', ['as' => 'sync.following.ids', 'uses' => 'Twitter\BackgroundController@syncFollowingIds']);
});

Route::prefix("scheduled")->middleware("auth")->group(function(){
    Route::get('/schedule', ['as' => 'scheduled.schedule', 'uses' => 'ScheduledController@index']);
    Route::get('/past', ['as' => 'scheduled.past', 'uses' => 'ScheduledController@index']);
});

Route::prefix("accounts")->middleware("auth")->group(function(){
    Route::get('/', ['as' => 'accounts', 'uses' => 'AccountsController@index']);
});




Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

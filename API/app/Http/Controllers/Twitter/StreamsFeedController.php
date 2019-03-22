<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StreamsFeedController extends Controller{

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            return $next($request);
        });
    }

    public function home(Request $request){
        $channelId = $request->get("channelId");

        if(!$channelId) return;

        $channel = $this->user->channels()->find($channelId);

        if(!$channel) return;

        $channel = $channel->details;

        $feed = $channel->getHome();

        if(!$feed) return;

        return response()->json($feed, 200);
    }

}
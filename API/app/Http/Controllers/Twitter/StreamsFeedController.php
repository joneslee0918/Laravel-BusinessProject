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

    public function index($type, Request $request){

        $channelId = $request->get("channelId");
        $params = $request->get("query") ? ["q" => $request->get("query")] : [];

        if(!$channelId) return;

        $channel = $this->user->channels()->find($channelId);

        if(!$channel) return;

        $channel = $channel->details;

        $func = "get".ucfirst($type);

        $feed = $channel->{$func}($params);

        if(!$feed) return;

        return response()->json($feed, 200);
    }
}
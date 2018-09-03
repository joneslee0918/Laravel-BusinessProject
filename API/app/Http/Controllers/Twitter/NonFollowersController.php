<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NonFollowersController extends Controller
{
    private $user;
    private $selectedChannel;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            $this->selectedChannel = $this->user->selectedTwitterChannel();
            return $next($request);
        });
    }

    public function feed(Request $request)
    {
        $perPage = 100;
        $order = $request->input('order') ? $request->input('order') : 'desc';
        $followerIds = $this->selectedChannel->followerIds()->whereNull("unfollowed_you_at")->pluck("user_id");
        $followingIds = $this->selectedChannel->followingIds()->whereNull("unfollowed_at")->whereNotIn("user_id", $followerIds)
            ->orderBy("id", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $items = [];

        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("unfollows");

        if(count($followingIds)){
            $items = $this->selectedChannel->getUsersLookup($followingIds);
        }

        return response()->json([
            "items" => $items,
            "actions" => $actionsToday
        ]);
    }
}
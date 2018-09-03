<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class FansController extends Controller
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
        $followingIds = $this->selectedChannel->followingIds()->whereNull("unfollowed_at")->pluck("user_id");
        $followerIds = $this->selectedChannel->followerIds()->whereNull("unfollowed_you_at")->whereNotIn("user_id", $followingIds)
            ->orderBy("id", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $items = [];

        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("follows");

        if(count($followerIds)){
            $items = $this->selectedChannel->getUsersLookup($followerIds);
        }

        return response()->json([
            "items" => $items,
            "actions" => $actionsToday
        ]);
    }
}

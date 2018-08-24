<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RecentUnfollowersController extends Controller
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

    public function index(Request $request)
    {
        $perPage = 100;
        $order = $request->input('order') ? $request->input('order') : 'desc';
        $title = "RECENT UNFOLLOWERS";
        $orderAction = route('manage.recent.unfollowers');
        $actionBtn = "sub-btn";
        $action = route('twitter.unfollow');
        $items = [];
        $followingIds = $this->selectedChannel->followingIds()->whereNotNull("unfollowed_at")->pluck("user_id");
        $followerIds = $this->selectedChannel->followerIds()
            ->whereNotIn("user_id", $followingIds)
            ->whereNotNull("unfollowed_you_at")
            ->whereNull("unfollowed_at")
            ->orderBy("unfollowed_at", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("unfollows");
        if(count($followerIds)){
            $items = $this->selectedChannel->getUsersLookup($followerIds);
        }

        $view = view('backend.manage.list', compact('title', 'items', 'orderAction', 'order', 'actionBtn', 'actionsToday', 'action'));

        if ($request->ajax()) {
            return response()->json(['html'=>$view->render()]);
        }

        return $view;
    }
}
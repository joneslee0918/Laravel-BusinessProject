<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FollowingController extends Controller
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

        $followingIds = $this->selectedChannel->followingIds()
            ->whereNull("unfollowed_at")
            ->orderBy("id", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $items = [];
        $orderAction = route('manage.following');
        $action = route('twitter.unfollow');
        $actionBtn = "sub-btn";
        $title = "FOLLOWING";
        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("unfollows");

        if(count($followingIds)){
            $items = $this->selectedChannel->getUsersLookup($followingIds);
        }

        $view = view('backend.manage.list', compact('title', 'items', 'orderAction', 'order', 'actionBtn', 'actionsToday', 'action'));
        if ($request->ajax()) {
            return response()->json(['html'=>$view->render()]);
        }

        return $view;
    }
}
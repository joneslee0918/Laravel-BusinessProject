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

    public function index(Request $request)
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
        $orderAction = route('manage.fans');
        $action = route('twitter.follow');
        $actionBtn = "add-btn";
        $title = "FANS";
        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("follows");

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

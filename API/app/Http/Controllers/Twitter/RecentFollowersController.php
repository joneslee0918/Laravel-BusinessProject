<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Controllers\Controller;

class RecentFollowersController extends Controller
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

        if($firstFollowerId = $this->selectedChannel->followerIds()->first()){
            $registrationDate = Carbon::parse($firstFollowerId->created_at)->addSeconds(1);
        }else{
            $registrationDate = Carbon::parse($this->selectedChannel->created_at)->addMinutes(2);
        }

        $followingIds = $this->selectedChannel->followingIds()->whereNull("unfollowed_at")->pluck("user_id");
        $followerIds = $this->selectedChannel->followerIds()
            ->whereNull("unfollowed_you_at")
            ->whereNotIn("user_id", $followingIds)
            ->where("created_at", ">=", $registrationDate)
            ->orderBy("id", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $items = [];
        $orderAction = route('manage.recent.followers');
        $actionBtn = "add-btn";
        $action = route('twitter.follow');
        $title = "RECENT FOLLOWERS";
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
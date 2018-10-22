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

    public function feed(Request $request)
    {
        $perPage = 100;
        $order = $request->input('order') ? $request->input('order') : 'desc';
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

            try{
                $items = $this->selectedChannel->getUsersLookup($followerIds);
            }catch(\Exception $e){
                return getErrorResponse($e, $this->selectedChannel->global);
            }
            
        }

        return response()->json([
            "items" => $items,
            "actions" => $actionsToday
        ]);
    }
}
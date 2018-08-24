<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class InactiveFollowingController extends Controller
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
        $months = $request->input('months') ? $request->input('months') : 1;
        $order = $request->input('order') ? $request->input('order') : 'desc';

        $followingIds = $this->selectedChannel->followingIds()
            ->whereNull("unfollowed_at")
            ->orderBy("id", $order)
            ->paginate($perPage)
            ->pluck("user_id")
            ->toArray();

        $items = [];
        $orderAction = route('manage.inactive.following');
        $actionBtn = "sub-btn";
        $action = route('twitter.unfollow');
        $title = "INACTIVE FOLLOWING";
        $actionsToday = $this->selectedChannel->getDailyStatisticsFor("unfollows");

        if(count($followingIds)){
            $items = $this->selectedChannel->getUsersLookup($followingIds);
            $items = $this->filterInactive($items, $months);
        }

        $view = view('backend.manage.list', compact('title', 'items', 'orderAction', 'order', 'actionBtn', 'actionsToday', 'action'));

        if ($request->ajax()) {
            return response()->json(['html'=>$view->render()]);
        }

        return $view;
    }

    private function filterInactive($items, $months = 1)
    {
        $inactive = [];
        foreach($items as $item){
            if(isset($item->status)){
                $d = Carbon::parse($item->status->created_at);
                if($d < Carbon::now()->subMonths($months)){
                    $inactive[] = $item;
                }
            }
        }

        return $inactive;
    }
}
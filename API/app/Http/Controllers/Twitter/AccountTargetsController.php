<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AccountTargetsController extends Controller
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


    public function show(Request $request)
    {
        try {
            $title = $this->title;
            $items = [];
            $feed = $this->selectedChannel->accountTargetsFeed();
            $currentTargetIds = $feed->groupBy("target_id")->pluck("target_id")->toArray();
            $targets = $this->selectedChannel->accountTargets();

            $orderAction = false;
            $actionBtn = "add-btn";
            $action = route('twitter.follow');
            $actionsToday = $this->selectedChannel->getDailyStatisticsFor("follows");
            $targetAction = route('add.account.targets');
            $targetType = "account";

            if ($target = $targets->whereNotIn("id", $currentTargetIds)->latest()->first()) {


                $feedIds = $this->selectedChannel->getFollowerIds(5000, -1, $target->account);

                $data = [];

                if (isset($feedIds->ids)) {
                    foreach ($feedIds->ids as $feedId) {

                        $data[] = [
                            "channel_id" => $this->selectedChannel->id,
                            "target_id" => $target->id,
                            "user_id" => $feedId,
                            "created_at" => Carbon::now(),
                            "updated_at" => Carbon::now()
                        ];
                    }
                }

                if (!empty($data)) {
                    $target->feed()->insert($data);
                }
            }

            $feedIds = $this->selectedChannel
                ->accountTargetsFeed()
                ->inRandomOrder('123')
                ->paginate(100)
                ->pluck("user_id")
                ->toArray();

            if (count($feedIds)) {
                $items = $this->selectedChannel->getUsersLookup($feedIds);
            }

            $items = $this->filterFollowing($items);

            if(count($items) < 1) return redirect()->route("add.account.targets");

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }

        $view = view('backend.manage.targets.accounts.list', compact('title', 'items', 'targetType', 'orderAction', 'action', 'actionsToday', 'actionBtn', 'targetAction'));

        if ($request->ajax()) {
            return response()->json(['html' => $view->render()]);
        }

        return $view;
    }

    public function add()
    {
        $title = $this->title;
        $accounts = $this->getAccounts();
        return view('backend.manage.targets.accounts.search', compact('title', 'accounts'));
    }

    public function store(Request $request)
    {
        $title = $this->title;
        $username = str_replace("@", "", $request->input("username"));
        $target = $this->selectedChannel->accountTargets()->where("account", $username);

        if (!$target->exists()) {
            $info = $this->selectedChannel->getUsersInfo(["screen_name" => $username]);

            if (!empty($info)) {

                $target->create(["account" => $username]);
                $accounts = $this->getAccounts();
                if ($request->ajax()) {

                    $view = view('backend.manage.targets.accounts.search', compact('title', 'accounts'))->render();
                    return response()->json(['html' => $view]);
                }
            }
        }

        if ($request->ajax()) {
            return response()->json([], 404);
        }

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        $username = $request->input("username");

        $this->selectedChannel->accountTargets()->where("account", $username)->delete();

        return response()->json([], 200);
    }

    private function getAccounts()
    {
        $accounts = $this->selectedChannel
            ->accountTargets()
            ->orderBy("id", "desc")
            ->take(100)
            ->pluck("account")
            ->toArray();

        if (!empty($accounts)) {
            return $accounts = $this->selectedChannel->getUsersLookupByName($accounts);
        }

        return [];
    }

    private function filterFollowing($items)
    {
        $filtered = [];
        $followingIds = [];
        foreach ($items as $item) {
            if (isset($item->status)) {

                if ($item->following || $item->follow_request_sent) {
                    $followingIds[] = $item->id;
                } else {
                    $filtered[] = $item;
                }
            }
        }

        if (!empty($followingIds)) {
            $this->selectedChannel->accountTargetsFeed()->whereIn("user_id", $followingIds)->delete();
        }

        return $filtered;
    }
}
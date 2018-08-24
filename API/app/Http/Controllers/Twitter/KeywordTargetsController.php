<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class KeywordTargetsController extends Controller
{
    private $user;
    private $selectedChannel;
    private $title;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            $this->title = "KEYWORD TARGETS";
            $this->selectedChannel = $this->user->selectedTwitterChannel();
            return $next($request);
        });
    }

    public function index()
    {
        $route = 'add.keyword.targets';
        if ($this->selectedChannel->keywordTargets()->count() > 0) {
            $route = 'show.keyword.targets';
        }

        return redirect()->route($route);
    }

    public function show(Request $request)
    {
        try {
            $title = $this->title;
            $items = [];
            $feed = $this->selectedChannel->keywordTargetsFeed();
            $currentTargetIds = $feed->groupBy("target_id")->pluck("target_id")->toArray();
            $targets = $this->selectedChannel->keywordTargets();

            $orderAction = false;
            $actionBtn = "add-btn";
            $action = route('twitter.follow');
            $actionsToday = $this->selectedChannel->getDailyStatisticsFor("follows");
            $targetAction = route('add.keyword.targets');
            $targetType = "keyword";

            if ($target = $targets->whereNotIn("id", $currentTargetIds)->latest()->first()) {

                $tweets = $this->selectedChannel->getSearch(["q" => $target->keyword, "count" => 100]);
                $feedIds = $this->getUsersFromTweetList($tweets);
                $data = [];

                if (isset($feedIds)) {
                    foreach ($feedIds as $feedId) {

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
                ->keywordTargetsFeed()
                ->inRandomOrder('123')
                ->paginate(100)
                ->pluck("user_id")
                ->toArray();

            if (count($feedIds)) {
                $items = $this->selectedChannel->getUsersLookup($feedIds);
            }

            $items = $this->filterFollowing($items);

            if(count($items) < 1) return redirect()->route("add.keyword.targets");

        } catch (\Exception $e) {
            throw $e;
            return response()->json(["error" => $e->getMessage()], 500);
        }

        $view = view('backend.manage.targets.keywords.list', compact('title', 'items', 'targetType','orderAction', 'action', 'actionsToday', 'actionBtn', 'targetAction'));

        if ($request->ajax()) {
            return response()->json(['html' => $view->render()]);
        }

        return $view;
    }

    public function add()
    {
        $title = $this->title;
        $keywords = $this->getKeywords();
        return view('backend.manage.targets.keywords.search', compact('title', 'keywords'));
    }

    public function store(Request $request)
    {
        $title = $this->title;
        $keyword = $request->input("keyword");
        $location = $request->input("location");

        $target = $this->selectedChannel->keywordTargets()->where("keyword", $keyword)->where("location", $location);

        if (!$target->exists()) {

            $target->create(["keyword" => $keyword, "location" => $location]);
            $keywords = $this->getKeywords();
            if ($request->ajax()) {

                $view = view('backend.manage.targets.keywords.search', compact('title', 'keywords'))->render();
                return response()->json(['html' => $view]);
            }
        }

        if ($request->ajax()) {
            return response()->json([], 404);
        }

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        $id = $request->input("id");
        $this->selectedChannel->keywordTargets()->where("id", $id)->delete();
        return response()->json([], 200);
    }

    private function getKeywords()
    {
        return $this->selectedChannel
            ->keywordTargets()
            ->orderBy("id", "desc")
            ->take(100)->get();
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
            $this->selectedChannel->keywordTargetsFeed()->whereIn("user_id", $followingIds)->delete();
        }

        return $filtered;
    }

    private function getUsersFromTweetList($tweets)
    {
        $users = [];
        foreach($tweets->statuses as $tweet){
           // dd($tweet->user);
            $users[] = $tweet->user->id ;
        }

        return $users;
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class ScheduledController extends Controller
{
    private $user;
    private $selectedChannel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            $this->selectedChannel = $this->user->selectedChannel();
            return $next($request);
        });
    }

    public function scheduledPosts()
    {
        $posts = $this->selectedChannel->scheduledPosts()
        ->where("posted", 0)
        ->orderBy('scheduled_at', 'asc')
        ->get();

        foreach($posts as $post){
            $post->payload = unserialize($post->payload);
        }
        
        $posts = $posts->groupBy(function($date) {
            return Carbon::parse($date->scheduled_at_original)->format('Y-m-d');
        });

        return response()->json(["items" => $posts->values()]);
    }

    public function pastScheduled()
    {
        $posts = $this->selectedChannel->scheduledPosts()
        ->where("posted", 1)->get();
        
        return response()->json($posts);
    }
}

<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Channel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublishController extends Controller
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
            $this->selectedChannel = $this->user->selectedTwitterChannel();
            return $next($request);
        });
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function publishHandler(Request $request)
    {   
        $post = $request->input('post');
        $scheduled = $post['scheduled'];
        $channels = $post['publishChannels'];
        $scheduledTime = Carbon::parse($scheduled['publishUTCDateTime'])->format("Y-m-d h:i:s");
        $payload = [
            'images' => $post['images'],
            'scheduled' => $scheduled
        ];

        //TODO: Image processing and calculating scheduled time based on publish type

        foreach($channels as $channel){
            $channel = Channel::find($channel['id']);
            $channel->scheduledPosts()->create([
                'content' => $post['content'],
                'scheduled_at' => $scheduledTime,
                'payload' => serialize($payload)
            ]);
        }

        return response()->json([
            'obj' => $request->all(),
            'experiment' => $scheduledTime,
            'user' => $this->user,
            'channel' => Channel::find($channels[0]['id'])->scheduledPosts
        ]);
    }
}
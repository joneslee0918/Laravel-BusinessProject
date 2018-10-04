<?php

namespace App\Http\Controllers\Twitter\Actions;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatusController extends Controller
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
    public function tweet(Request $request)
    {   
        $tweet = $request->input('tweet');

        try{
            if($tweet){
                $this->selectedChannel->tweet($tweet);
                return response()->json(["success" => true, "message" => "Tweet posted successfully"]);
            }
        }catch(\Exception $e){
            return response()->json(["success" => false, "message" => $e->getMessage()], 500);
        }

        return response()->json(["success" => false, "message" => "Tweet cannot be empty"], 304);
    }
}
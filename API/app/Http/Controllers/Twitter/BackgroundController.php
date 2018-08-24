<?php

namespace App\Http\Controllers\Twitter;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
set_time_limit(0);

class BackgroundController extends Controller
{

    public function syncFollowerIds(Request $request)
    {
        if(!($item = $request->input('item'))) return;

        $params = unserialize($request->input('params'));

        $sleep = isset($params['sleep']) ? $params['sleep'] : 60;

        $channel = unserialize($item);

        $channel->startProcess("syncTwitterFollowerIds");

        try{
            $channel->syncFollowerIds($sleep);
        }catch(\Exception $e){
            Log::critical($e->getMessage());
            //TODO, skip for now to stop the running process
        }

        $channel->stopProcess("syncTwitterFollowerIds");
    }


    public function syncFollowingIds(Request $request)
    {
        if(!($item = $request->input('item'))) return;

        $params = unserialize($request->input('params'));

        $sleep = isset($params['sleep']) ? $params['sleep'] : 60;

        $channel = unserialize($item);

        $channel->startProcess("syncTwitterFollowingIds");

        try{
            $channel->syncFollowingIds($sleep);
        }catch(\Exception $e){
            Log::critical($e->getMessage());
            //TODO, skip for now to stop the running process
        }

        $channel->stopProcess("syncTwitterFollowingIds");
    }
}
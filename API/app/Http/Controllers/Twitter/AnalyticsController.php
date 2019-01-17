<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;

class AnalyticsController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $channel = $user->selectedTwitterChannel();

        try{
            if($channel){
                return response()->json($channel->getAnalytics());
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }
}
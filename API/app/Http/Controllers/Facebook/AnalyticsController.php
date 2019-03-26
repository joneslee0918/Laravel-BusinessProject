<?php

namespace App\Http\Controllers\Facebook;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($request->id);

        try{
            if($channel){
                $channel = $channel->details;
                return response()->json($channel->getAnalytics($request->days));
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }
    /**
     * 
     * Prepare data for Facebook Page Insights
     */
    public function pageInsights(Request $request)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($request->id);

        try{
            if($channel){
                $channel = $channel->details;
                return response()->json($channel->pageInsights($request->startDate, $request->endDate));
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }

    /**
     * 
     * Prepare data for Facebook Page Insights
     */
    public function pagePostsInsights(Request $request)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($request->id);

        try{
            if($channel){
                $channel = $channel->details;
                return response()->json($channel->pagePostsInsights($request->startDate, $request->endDate));
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }

    /**
     * 
     * Get count of facebook page posts
     */
    public function pageInsightsByType($type, Request $request)
    {
        $user = auth()->user();
        $channel = $user->channels()->find($request->id);

        try{
            if($channel){
                $channel = $channel->details;
                return response()->json($channel->pageInsightsByType($type, $request->startDate, $request->endDate));
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }
}
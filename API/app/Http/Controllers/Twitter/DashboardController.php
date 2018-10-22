<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $channel = $user->selectedTwitterChannel();

        try{
            if($channel){
                return response()->json($channel->getData());
            }
        }catch(\Exception $e){
            return getErrorResponse($e, $channel->global);
        }

        return response()->json(['error' => 'No channel found'], 404);
    }
}

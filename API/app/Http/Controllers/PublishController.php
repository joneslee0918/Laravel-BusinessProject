<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublishController extends Controller
{
    private $user;
    private $selectedChannel;


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function publishHandler(Request $request)
    {   
        return response()->json($request->all());
    }
}
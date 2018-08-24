<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ScheduledController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "SCHEDULE";
        return view('backend.scheduled.schedule', compact('title'));
    }
}

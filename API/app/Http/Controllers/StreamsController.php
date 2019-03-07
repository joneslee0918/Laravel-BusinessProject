<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StreamsController extends Controller
{
    private $user;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            return $next($request);
        });
    }


    public function index()
    {
        $tabs = $this->user->tabs()->with(["streams" => function($q){
            $q->orderBy("index");
        }])->orderBy("index")->get();

        return $tabs;
    }

    public function updateTabs(Request $request)
    {
        return $request->all();
    }
}
<?php

namespace App\Http\Controllers\Twitter;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    private $user;
    private $selectedChannel;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            $this->selectedChannel = $this->user->selectedTwitterChannel();
            return $next($request);
        });
    }

    public function index()
    {
        $twitterData = $this->selectedChannel->getData();

        return view('backend.manage.dashboard', compact('twitterData'));
    }
}

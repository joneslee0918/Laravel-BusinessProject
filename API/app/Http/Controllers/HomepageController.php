<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomepageController extends Controller
{

    /**
     * Show homepage
     */
    public function index() {
        return view('homepage.index');
    }
}

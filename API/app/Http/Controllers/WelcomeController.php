<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{

    /**
     * Show homepage
     */
    public function index() {
        return view('welcome');
    }
}

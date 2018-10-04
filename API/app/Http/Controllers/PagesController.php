<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{

    /**
     * Show homepage
     */
    public function index() {
        return view('frontend.homepage.index');
    }

    /**
     *
     * Show upgrade page
     */
    public function upgrade()
    {
    	return view('frontend.upgrade');
    }

    /**
     *
     * Show learning page
     */
    public function learning()
    {
    	return view('frontend.learning');
    }

    /**
     *
     * Show learning page
     */
    public function pricing()
    {
    	return view('frontend.pricing');
    }

     /**
     *
     * Show learning page
     */
    public function blog()
    {
    	return view('frontend.blog');
    }
}

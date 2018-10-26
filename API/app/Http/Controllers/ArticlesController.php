<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    private $user;
    private $selectedChannel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();

            if($this->user){
               $this->selectedChannel = $this->user->selectedChannel(); 
            }
            
            return $next($request);
        });
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function sync()
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request("GET", "https://newsapi.org/v2/everything?q=bitcoin&from=2018-09-26&sortBy=publishedAt&apiKey=83f2b261732e43f787e6ff78e5a6d75a", ['headers' => ['Accept' => 'application/json']]); 
    
        $response_data = json_decode((string) $response->getBody(), true);
    
        return collect($response_data);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

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
    public function sync(Request $request)
    {   

        try{
            $topic = $request->input("item");   
            
            if(!$topic) return;

            $topic = unserialize($topic);
            Article::storeByTopic($topic);

        }catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function articles(Request $request){

        $perPage = $request->input("count") ? $request->input("count") : 20;
        $topics = $this->user->topics()->pluck("topic");

        $articles = Article::whereIn("topic", $topics)->whereNotNull("image_url")->inRandomOrder("123");

        if(!$articles->exists() && $topics){
            multiRequest(route('articles.sync'), $topics);
        }

        return $articles->paginate($perPage);
    }
}

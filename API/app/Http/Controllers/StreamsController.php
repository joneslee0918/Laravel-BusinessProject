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

    public function selectTab(Request $request)
    {
        $data = $request->get("data");
        
        if(!$data) return;

        $tabs = $this->user->tabs();

        $tabs->update(["selected" => 0]);

        $tabs->where("key", $data)->update(["selected" => 1]);

        return response()->json(["message" => "Successful update"], 200);

    }

    public function positionTab(Request $request)
    {
        $data = $request->get("data");
        $currentKey = $request->get("key");

        if(!$data || !$currentKey) return;

        $keys = collect($data)->pluck("key");
        $data = [];
        foreach($keys as $index => $key){
            $data[] = [
                "index" => $index,
                "key" => $key
            ];
        }

        $newPos = collect($data)->where("key", $currentKey)->first();
        $oldPos = $this->user->tabs()->where("key", $currentKey)->first();

        if(!isset($newPos["index"]) || !isset($oldPos->index)) return;

        $newPos = $newPos["index"];
        $oldPos = $oldPos->index;
            
        $query = $this->user->tabs()->whereIn("key", $keys);
        
        if($oldPos < $newPos){
            $query->where("index", ">=", $oldPos)->where("index", "<=", $newPos)->decrement("index"); 
        }else{
            $query->where("index", ">=", $newPos)->where("index", "<=", $oldPos)->increment("index");
        }

        $this->user->tabs()->where("key", $currentKey)->update(["index" => $newPos]);
                
        return response()->json(["message" => "Successful update"], 200);
    }

    public function addTab(Request $request)
    {
        $data = $request->get("data");

        if(!$data) return;

        $tabs = $this->user->tabs();

        $latestTab = $tabs->latest()->first();

        $tabs->create([
            "key" => $data["key"],
            "title" => $data["title"],
            "index" => $latestTab ? $latestTab->index + 1 : 0,
            "selected" => 1
        ]);

        $this->user->tabs()->where("key", "!=", $data["key"])->update(["selected" => 0]);

        return response()->json(["message" => "Successful update"], 200);
    }

    public function deleteTab(Request $request)
    {
        $data = $request->get("data");

        if(!$data) return;

        $tab = $this->user->tabs()->where("key", $data["key"])->first();

        if(!$tab) return;

        if($tab->selected == 1){
            $firstTab = $this->user->tabs()->where("key", $data["selectedKey"])->first();

            if(!$firstTab) return;
            $firstTab->selected = 1;
            $firstTab->save();
        }

        $tabIndex = $tab->index;
        $tab->delete();
        $this->user->tabs()->where("index", ">=", $tabIndex)->decrement("index");

        return response()->json(["message" => "Successful update"], 200);
    }

    public function renameTab(Request $request)
    {
        $data = $request->get("data");

        if(!$data) return;
        
        $this->user->tabs()->where("key", $data["key"])->update(["title" => $data["title"]]);
    }

    
}
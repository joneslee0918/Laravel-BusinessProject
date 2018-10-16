<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
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
            $this->selectedChannel = $this->user->selectedChannel();
            return $next($request);
        });
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {   
        try{
            $user = $this->user;
            $name = $request->input('name');
            $email = $request->input('email');
            $website = $request->input('website');
            $topics = $request->input('topics');
            $locations = $request->input('locations');
            $timezone = $request->input('timezone');
            $reason = $request->input('reason');

            $user->name = $name;
            $user->email = $email;
            $user->website = $website;
            $user->timezone = $timezone;
            $user->usage_reason = $reason;
            $user->save();

            if($topics){
                $topicsArray = [];
                collect($topics)->map(function($topic){
                    $topicsArray[] = [
                        "topic" => json_encode($topic)
                    ];
                });
                
                $user->topics()->delete();
                $user->topics()->insert($topicsArray);
            }

            if($locations){
                $locationsArray = [];
                collect($locations)->map(function($topic){
                    $locationsArray[] = [
                        "location" => json_encode($location)
                    ];
                });
                
                $user->locations()->delete();
                $user->locations()->insert($locationsArray);
            }
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 401);
        }


        return response()->json(['message' => 'Profile updated successfuly']);
    }
}

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


    public function profile()
    {
        $topics = $this->user->topics;
        $locations = $this->user->locations;

        return response()->json([
            "user" => $this->user,
            "topics" => $topics,
            "locations" => $locations
        ]);
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
            $data = $request->input('data');
            $name = $data['name'];
            $email = $data['email'];
            $website = $data['website'];
            $topics = $data['topics'];
            $locations = $data['locations'];
            $timezone = $data['timezone'];
            $reason = $data['reason'];

            $user->name = $name ? $name : $user->name;
            $user->email = $email ? $email : $user->email;
            $user->website = $website ? $website : $user->website;
            $user->timezone = $timezone ? $timezone : $user->timezone;
            $user->usage_reason = $reason ? $reason : $user->usage_reason;
            $user->save();

            $user->topics()->delete();
            collect($topics)->map(function($topic) use ($user){
                $user->topics()->create([
                    'topic' => $topic
                ]);
            });

            $user->locations()->delete();
            collect($locations)->map(function($location) use ($user){
                
                $location = [
                    'label' => $location['label'],
                    'location' => $location['location']
                ];

                $user->locations()->create([
                    'location' => json_encode($location)
                ]);
            });
            
        }catch(\Exception $e){
            
            return response()->json(['message' => $e->getMessage()], 402);
        }


        return response()->json([
            "user" => $user,
            "topics" => $user->topics,
            "locations" => $user->locations
        ]);
    }
}

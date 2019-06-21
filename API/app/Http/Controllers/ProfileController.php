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
        $role = $this->user->role()->with("permissions")->first();
        $roleAddons = $this->user->roleAddons()->with("permissions")->get();

        return response()->json([
            "user" => $this->user,
            "topics" => $topics,
            "locations" => $locations,
            "role" => $role,
            "roleAddons" => $roleAddons
        ]);
    }

    public function update(Request $request)
    {   
        try{
            $user = $this->user;
            $data = $request->input('data');
            
            foreach($data as $key => $value){

                if($key == "topics" || $key == "locations"){
                    continue;
                }

                if($key == "reason"){
                    $key = "usage_reason";
                }

                $user->{$key} = $value ? $value : $user->{$key};
            }

            $user->save();

            if(array_key_exists("topics", $data)){
                $user->topics()->delete();
                collect($data["topics"])->map(function($topic) use ($user){
                    $user->topics()->create([
                        'topic' => $topic
                    ]);
                });

                $topics = $user->topics()->pluck("topic");
                multiRequest(route('articles.sync'), $topics);
            }


            if(array_key_exists("locations", $data)){
                $user->locations()->delete();
                collect($data["locations"])->map(function($location) use ($user){
                    
                    $location = [
                        'label' => $location['label'],
                        'location' => $location['location']
                    ];

                    $user->locations()->create([
                        'location' => json_encode($location)
                    ]);
                });
            }

            
        }catch(\Exception $e){
            
            return getErrorResponse($e, $this->selectedChannel);
        }

        return response()->json(['message' => 'Profile updated successfully.']);
    }
}

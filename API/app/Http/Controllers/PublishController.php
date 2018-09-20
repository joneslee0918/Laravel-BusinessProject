<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Channel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublishController extends Controller
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
            $this->selectedChannel = $this->user->selectedTwitterChannel();
            return $next($request);
        });
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        try{
            $post = $request->input('post');
            $scheduled = $post['scheduled'];
            $channels = $post['publishChannels'];
            $images = $post['images'];
            $publishType = $post['publishType'];
            $scheduledTime = Carbon::parse($scheduled['publishUTCDateTime'])->format("Y-m-d H:i:s");

            $uploadedImages = $this->uploadImages($images);

            $payload = [
                'images' => $uploadedImages,
                'scheduled' => $scheduled
            ];

            foreach($channels as $channel){

                $channel = Channel::find($channel['id']);
                
                $publishTime = Carbon::now();

                if($publishType == "date"){
                    
                    $publishTime = $scheduledTime;

                }else if($publishType == "best"){

                    //TODO: improve best time accuracy
                    $latestScheduledPost = $channel->scheduledPosts()->latest()->first();

                    if($latestScheduledPost){

                        $publishTime = Carbon::parse($latestScheduledPost->scheduled_at)->addHours(2);

                    }else{

                        $publishTime = Carbon::now()->addHours(3);
                    }
                }

                $publishOriginalTime = Carbon::parse($publishTime)->setTimezone($scheduled['publishTimezone']);

                $channel->scheduledPosts()->create([
                    'content' => $post['content'],
                    'scheduled_at' => $publishTime,
                    'scheduled_at_original' => $publishOriginalTime,
                    'payload' => serialize($payload)
                ]);
            }  
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()]);
        }


        return response()->json(['message' => 'Yor post was successfuly stored!']);
    }


    private function uploadImages($images)
    {
        $uploadedImages = [];

        foreach($images as $image){
            $imageData = explode(',', $image);
            $imageBase64 = $imageData[1];
            $imageInfo = explode(';', $imageData[0]);
            $imageOriginalName = explode('.',$imageInfo[1]);
            $imageExtension = $imageOriginalName[1];

            $imageName = str_random(35).'.'.$imageExtension;
            $today = Carbon::today();
            $uploadPath = "public/$today->year/$today->month/$today->day/$imageName";

            \Storage::put($uploadPath, base64_decode($imageBase64));

            $relativePublicPath = str_replace("public", "storage", $uploadPath);

            $uploadedImages[] = [
                'relativePath' => $relativePublicPath,
                'absolutePath' => \URL::to('/').'/'.$relativePublicPath
            ];
        }

        return $uploadedImages;
    }

    public function publishPost(Request $request){
        //TODO: publish post logic
    }
}
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

                $post = [
                    'content' => $post['content'],
                    'scheduled_at' => $publishTime,
                    'scheduled_at_original' => $publishOriginalTime,
                    'payload' => serialize($payload),
                    'posted' => $publishType == 'now' ? 1 : 0
                ];

                $scheduledPost = $channel->scheduledPosts()->create($post);

                if($publishType == 'now'){
                    $channel->details->publishScheduledPost($scheduledPost);
                }
            }  
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 400);
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

    public function publish(Request $request)
    {

        $scheduledPost = unserialize($request->input('item'));
        //$scheduledPost = \App\Models\ScheduledPost::first();

        if(!$scheduledPost) return;
        
        $channel = Channel::find($scheduledPost->channel_id);

        if($channel){
            try{
               $channel->details->publishScheduledPost($scheduledPost); 
            }catch(\Exception $e){
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }
    }

    public function postNow($postId)
    {
        if($this->selectedChannel){

            try{
                $scheduledPost = $this->selectedChannel->scheduledPosts()->find($postId);
                $this->selectedChannel->details->publishScheduledPost($scheduledPost);
            }catch(\Exception $e){
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }
    }

    public function destroy($postId)
    {
        if($this->selectedChannel){

            try{
                $scheduledPost = $this->selectedChannel->scheduledPosts()->find($postId);

                $payload = unserialize($scheduledPost->payload);
                $images = $payload['images'];

                foreach($images as $image){
                    $filePath = str_replace("storage", "public", $image['relativePath']);
                    \Storage::delete($filePath);
                }

                $scheduledPost->delete();  
            }catch(\Exception $e){
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }
    }
}
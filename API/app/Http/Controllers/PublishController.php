<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Channel;
use App\Models\ScheduledPost;
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
            $currentChannel = $this->selectedChannel;

            $uploadedImages = $this->uploadImages($images);

            $bestTime = false;

            foreach($channels as $channel){
                $boards = false;

                if($channel["type"] == "pinterest" && !isset($channel["selectedBoards"])){
                    continue;
                }

                if(isset($channel["selectedBoards"])){
                    $boards = $channel["selectedBoards"];
                }

                $channel = Channel::find($channel['id']);
                $currentChannel = $channel;
                $networkContent = strtolower($channel->type)."Content";
                $networkPictures = strtolower($channel->type)."Pictures";
                $publishTime = Carbon::now();

                if(isset($post[$networkPictures])){
                    
                    $images = $post[$networkPictures];
                    
                    if(count($images)){
                        $uploadedImages = $this->uploadImages($images);
                    }
                }

                $payload = [
                    'images' => $uploadedImages,
                    'scheduled' => $scheduled
                ];

                if($boards){
                    $payload["boards"] = $boards;
                }
                
                if($publishType == "date"){
                    
                    $publishTime = $scheduledTime;

                }else if($publishType == "best"){

                    if(!$bestTime){

                        $latestScheduledPost = $channel->scheduledPosts()
                        ->where("scheduled_at", ">", Carbon::now())
                        ->orderBy("scheduled_at", "desc")->first();

                        if($latestScheduledPost){

                            $publishTime = Carbon::parse($latestScheduledPost->scheduled_at)->addHours(mt_rand(1,12))->addMinutes(mt_rand(0, 59));

                        }else{

                            $publishTime = Carbon::now()->addHours(mt_rand(1,12))->addMinutes(mt_rand(0, 59));
                        }

                        $bestTime = $publishTime;

                    }else{
                        $publishTime = $bestTime;
                    }

                }

                $publishOriginalTime = Carbon::parse($publishTime)->setTimezone($scheduled['publishTimezone']);

                $postData = [
                    'content' => isset($post[$networkContent]) ? $post[$networkContent] : $post['content'],
                    'scheduled_at' => $publishTime,
                    'scheduled_at_original' => $publishOriginalTime,
                    'payload' => serialize($payload),
                    'posted' => $publishType == 'now' ? 1 : 0,
                    'article_id' => $post['articleId'] ? $post['articleId'] : null
                ];

                if($post['type'] == 'edit'){                   
                    $channel->scheduledPosts()->where("id", $post['id'])->update($postData);
                }else{
                    $scheduledPost = $channel->scheduledPosts()->create($postData);
                }

                if($publishType == 'now'){
                    $channel->details->publishScheduledPost($scheduledPost);
                }
            }  
        }catch(\Exception $e){
            return getErrorResponse($e, $currentChannel);
        }

        return response()->json(['message' => 'Your post was successfuly stored!']);
    }


    private function uploadImages($images)
    {
        $uploadedImages = [];

        foreach($images as $image){

            if(str_contains($image, "http") && str_contains($image, "storage")){

                $relativePath = 'storage'.explode('storage', $image)[1];

                $uploadedImages[] = [
                    'relativePath' => $relativePath,
                    'absolutePath' => $image
                ];
            }else{

                if(str_contains($image, "http")){
                    $contents = file_get_contents($image);
                    $name = substr($image, strrpos($image, '/') + 1);
                    $imageName = str_contains($name, "?") ? explode("?", $name)[0] : $name;
                    $imageName = str_random(35)."-".$imageName;
                }else{
                    $imageData = explode(',', $image);
                    $imageBase64 = $imageData[1];
                    $imageInfo = explode(';', $imageData[0]);
                    $imageOriginalName = explode('.',$imageInfo[1]);
                    $imageExtension = $imageOriginalName[1];
                    $contents = base64_decode($imageBase64);
                    $imageName = str_random(35).'.'.$imageExtension;
                }

                $today = Carbon::today();
                $uploadPath = "public/$today->year/$today->month/$today->day/$imageName";
    
                \Storage::put($uploadPath, $contents);
    
                $relativePublicPath = str_replace("public", "storage", $uploadPath);

                $uploadedImages[] = [
                    'relativePath' => $relativePublicPath,
                    'absolutePath' => \URL::to('/').'/'.$relativePublicPath
                ];
            }
        }

        return $uploadedImages;
    }

    public function publish(Request $request)
    {

        $scheduledPost = unserialize($request->input('item'));
        if(!$scheduledPost) return;
        
        $channel = Channel::find($scheduledPost->channel_id);

        if($channel){
            try{
               $channel->details->publishScheduledPost($scheduledPost); 
            }catch(\Exception $e){
                getErrorResponse($e, $channel);
                throw $e;
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
                return getErrorResponse($e, $this->selectedChannel);
            }
        }
    }

    public function destroy($postId)
    {
        if($this->selectedChannel){

            try{
                $scheduledPost = $this->selectedChannel->scheduledPosts()->find($postId);
                $scheduledPost->destroyCompletely();
            }catch(\Exception $e){
                return getErrorResponse($e, $this->selectedChannel);
            }
        }
    }
}
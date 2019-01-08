<?php

namespace App\Traits\Linkedin;

use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;
use \Artesaos\LinkedIn\Facades\LinkedIn;

trait LinkedinTrait
{
    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function publish($post)
    {
        LinkedIn::setAccessToken($this->access_token);
        
        $result = LinkedIn::post('v1/people/~/shares', ['json'=>$post]);

        return $result;
    }

    
    /**
     * @param object ScheduledPost
     * @return mixed
     */
    public function publishScheduledPost($scheduledPost)
    {
        try{
            $payload = unserialize($scheduledPost->payload);
            $images = $payload['images'];
            $timezone = $payload['scheduled']['publishTimezone'];
            $appUrl = config("app.url");

            $imageUrl = "";
            foreach($images as $image){
                $relativePath = $image['relativePath'];
                $fullPath = $appUrl."/".$relativePath;
                $imageUrl = $fullPath;
                break;
            }
            
            $text = $scheduledPost->content;
            $link = findUrlInText($text);

            $post["visibility"]["code"] = "anyone";

            if($link){
                $text = str_replace($link, "", $text);
                $post["content"]["submitted-url"] = $link;
            }

            if($imageUrl){
                $post["content"]["title"] = "test";
                if(!$link){
                    $post["content"]["submitted-url"] = $imageUrl;
                }else{
                    $post["content"]["submitted-image-url"] = $imageUrl;  
                }
            }

            if($text){
                $post["comment"] = $text;
            }

            //return $post;
            
            $result = $this->publish($post);

            $now = Carbon::now();

            $scheduledPost->posted = 1;
            $scheduledPost->status = null;
            
            if(isset($result["status"])){
                if($result["status"] != 200){
                    $scheduledPost->posted = 0;
                    $scheduledPost->status = -1;
                }
            }

            $scheduledPost->scheduled_at = $now;
            $scheduledPost->scheduled_at_original = Carbon::parse($now)->setTimezone($timezone);
            $scheduledPost->save();

            return $result;

        }catch(\Exception $e){
            
            if($scheduledPost){
                $scheduledPost->posted = 0;
                $scheduledPost->status = -1;
                $scheduledPost->save();
            }


            throw $e;
        }
    }
}
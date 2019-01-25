<?php

namespace App\Traits\Facebook;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk as Facebook;
use Laravel\Socialite\Facades\Socialite;

trait FacebookTrait
{
    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function setAsCurrentUser($token = false)
    {
        try {
            $token = $token ? $token : $this->access_token;

            $fb = app(Facebook::class);
            $fb->setDefaultAccessToken($token);

            return $fb;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getProfile(){
        $user = Socialite::driver("facebook")->userFromToken($this->access_token);
        return $user;
    }

    public function getPages(){
        $fb = $this->setAsCurrentUser();
        $response = $fb->get('/me/accounts?fields=access_token,picture,name');

        return $response->getDecodedBody();
    }

    public function getGroups(){
        $fb = $this->setAsCurrentUser();
        $response = $fb->get('/me/groups?fields=owner,picture,name');

        return $response->getDecodedBody();
    }

    public function getPosts(){
        $fb = $this->setAsCurrentUser();
        $response = $fb->get("/{$this->original_id}/feed");

        return $response->getDecodedBody();
    }

    public function pageLikes($period){
        $fb = $this->setAsCurrentUser();
        $response = $fb->get("/{$this->original_id}/insights/page_fan_adds_unique/{$period}");

        return $response->getDecodedBody();
    }

    public function pageUnlikes($period){
        $fb = $this->setAsCurrentUser();
        $response = $fb->get("/{$this->original_id}/insights/page_fan_removes_unique/{$period}");

        return $response->getDecodedBody();
    }

    public function getNonProfileAvatar()
    {
       try{
            $fb = $this->setAsCurrentUser();
            $response = $fb->get("$this->original_id/?fields=picture");
            $data = $response->getDecodedBody();

           if($data){
                return $data["picture"]["data"]["url"];
           }
       }catch(\Exception $e){
            //throw $e;
       }
        
        return "";
    }

    public function getProfileAvatar()
    {
        try{
            $profile = Socialite::driver("facebook")->userFromToken($this->access_token);

            if($profile){
                return $profile->avatar;
            }

        }catch(\Exception $e){
           
        } 
        
        return "";
    }

    public function getAvatar(){
        try{
            $key = $this->id . "-facebookAvatar";
            $minutes = 1;
            return Cache::remember($key, $minutes, function () {
                $avatar = "";
                if($this->account_type == "profile"){
                    $avatar = $this->getProfileAvatar();
                }else{
                    $avatar = $this->getNonProfileAvatar();
                }

                if($avatar){
                    return $avatar;
                }

                return public_path()."/images/dummy_profile.png";
            });
        }catch(\Exception $e){
            getErrorResponse($e, $this->global);
            return false;
        }
    }

    /**
     * @param array $media
     * @return mixed
     */
    public function uploadMedia($media)
    {
        $fb = $this->setAsCurrentUser($this->access_token);
        $response = $fb->post("/{$this->original_id}/photos", $media);
        return $response->getDecodedBody();
    }

        /**
     * @param array $tweet
     * @return mixed
     */
    public function publish($post)
    {
        $fb = $this->setAsCurrentUser($this->access_token);
        $response = $fb->post("/{$this->original_id}/feed", $post);
        return $response->getDecodedBody();
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
            $mediaIds = [];
            $mediaCount = 0;
            foreach($images as $image){
                $relativePath = $image['relativePath'];
                $fullPath = $appUrl."/".$relativePath;
                $media = ["url" => $fullPath, "published" => false];
                $uploadResponse = $this->uploadMedia($media);
                $mediaId = $uploadResponse['id'];
                $mediaIds["attached_media[$mediaCount]"] = "{'media_fbid': '$mediaId'}";
                $mediaCount++;
            }
            
            $text = $scheduledPost->content;
            $link = findUrlInText($text);

            if($link){
                $text = str_replace($link, "", $text);
                $post["link"] = $link;
            }

            if($text){
                $post["message"] = $text;
            }

            if($mediaCount > 0){
                $post = array_merge($mediaIds, $post);
            }
            
            $result = $this->publish($post);

            $now = Carbon::now();
            $scheduledPost->posted = 1;
            $scheduledPost->status = null;
            $scheduledPost->scheduled_at = $now;
            $scheduledPost->scheduled_at_original = Carbon::parse($now)->setTimezone($timezone);
            $scheduledPost->save();

            return $result;

        }catch(\Exception $e){
            
            $scheduledPost->posted = 0;
            $scheduledPost->status = -1;
            $scheduledPost->save();

            throw $e;
        }
    }

        /**
     * Synchronize tweets from API
     * 
     * @param int $sleep
     * @param bool $logCursor
     */
    public function syncFacebookPosts()
    {
        $data[] = [
            'channel_id' => $this->id,
            'post_id' => 12,
            'message' => 'test',
            'original_created_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];

        \DB::table('facebook_posts')->insert($data);
    }

}
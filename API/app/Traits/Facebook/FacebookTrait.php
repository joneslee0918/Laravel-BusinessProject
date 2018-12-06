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
                $relativePath = str_replace('storage', 'public', $image['relativePath']);
                $fullPath = $appUrl."/".$relativePath;
                $media = ["url" => $fullPath, "published" => false];
                $uploadResponse = $this->uploadMedia($media);
                $mediaIds[] = ["attached_media[$mediaCount]" => "{'media_fbid': '$uploadResponse->id'}"];
                $mediaCount++;
            }
            
            $post = [
                'message' => $scheduledPost->content
            ]; 

            if($mediaCount > 0){
                $post = array_merge($mediaIds, $post);
            }
            
            $this->publish($post);

            $now = Carbon::now();
            $scheduledPost->posted = 1;
            $scheduledPost->status = null;
            $scheduledPost->scheduled_at = $now;
            $scheduledPost->scheduled_at_original = Carbon::parse($now)->setTimezone($timezone);
            $scheduledPost->save();

        }catch(\Exception $e){
            
            $scheduledPost->posted = 0;
            $scheduledPost->status = -1;
            $scheduledPost->save();

            throw $e;
        }
    }

}
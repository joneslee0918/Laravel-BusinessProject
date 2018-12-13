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
     * @param array $tweet
     * @return mixed
     */
    public function publish($post)
    {
        $admin = self::find($this->parent_id);

        if($admin){
            $fb = $this->setAsCurrentUser($admin->access_token);
            $response = $fb->post("/{$this->original_id}/feed?message=$post");
            return $response->getDecodedBody();
        }
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

            $mediaIds = [];

            foreach($images as $image){
                $relativePath = str_replace('storage', 'public', $image['relativePath']);

                $media = ["media" => \Storage::get($relativePath)];
                $uploadResponse = $this->uploadMedia($media);
                $mediaIds[] = $uploadResponse->media_id;
            }
            
            $post = [
                'status' => $scheduledPost->content,
                'media_ids' => $mediaIds
            ]; 
            
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
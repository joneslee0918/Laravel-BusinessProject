<?php

namespace App\Traits\Linkedin;

use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;
use \Artesaos\LinkedIn\Facades\LinkedIn;
use Illuminate\Support\Facades\Cache;

trait LinkedinTrait
{
    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function publish($post)
    {
        $client =new \GuzzleHttp\Client();

        $result = $client->request('POST', "https://api.linkedin.com/v2/shares", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'json' => $post
        ]);
        
        return json_decode($result->getBody()->getContents());
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

            $mediaIds = [];

            foreach($images as $image){
                $relativePath = str_replace('storage', 'public', $image['relativePath']);
                $uploadResponse = $this->uploadMedia($relativePath);
                if(!$uploadResponse) continue;
                $mediaIds[] = ["entity" => $uploadResponse->location];
            }
            
            $text = $scheduledPost->content;
            $link = findUrlInText($text);

            $post["content"]["contentEntities"] = $mediaIds;
            $payload = unserialize($this->payload);
            $post["owner"] = "urn:li:person:$payload->id";
            if($text){
                $post["text"] = ["text" => $text];
            }
            
            $result = $this->publish($post);

            $now = Carbon::now();

            $scheduledPost->posted = 1;
            $scheduledPost->status = null;
            
            if(!isset($result->activity)){
                $scheduledPost->posted = 0;
                $scheduledPost->status = -1;
                $scheduledPost->save();
                throw new \Exception('Something is wrong with the token');
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


    public function uploadMedia($relativePath)
    {   
        try {
            if(!$relativePath) return;

            $content = \Storage::get($relativePath);
            $url="https://api.linkedin.com/media/upload";
            $client =new \GuzzleHttp\Client();
            $fileName = basename($relativePath);

            $result = $client->request('POST', $url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->access_token,
                    'Accept' => 'application/json',
                    'X-Restli-Protocol-Version' => '2.0.0'
                ],
                'multipart' => [
                    [
                        'name' => 'fileupload',
                        'contents' => $content,
                        'filename' => $fileName,
                    ],
                ]
            ]);
            
            return json_decode($result->getBody()->getContents());
        }catch(\Exception $e){}

        return false;
    }   


    public function getAvatar()
    {

        try{
            $key = $this->id . "-linkedinAvatar";
            $minutes = 1;
            return Cache::remember($key, $minutes, function () {
                $profile = Socialite::driver("linkedin")->userFromToken($this->access_token);

                if($profile){
                    return $profile->avatar;
                }

                return public_path()."/images/dummy_profile.png";
            });
        }catch(\Exception $e){
            getErrorResponse($e, $this->global);
            return false;
        }
    }

    public function getTimeline()
    {
       // LinkedIn::setAccessToken($this->access_token);

       // $result = LinkedIn::get('v2/shares?q=owners&owners={URN}&sharesPerOwner=100');

        $client =new \GuzzleHttp\Client();

        $payload = unserialize($this->payload);

        $result = $client->request('GET', "https://api.linkedin.com/v2/shares", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => ""
        ]);
        
        return json_decode($result->getBody()->getContents());

        return $result;
    }

    public function getPages()
    {
        $string = rawurlencode(utf8_encode("urn:li:organization:19135829"));

        $encoded_string = str_replace("-","%3A", $string);
       // LinkedIn::setAccessToken($this->access_token);

       // $result = LinkedIn::get('v2/shares?q=owners&owners={URN}&sharesPerOwner=100');

        $client =new \GuzzleHttp\Client();

        $payload = unserialize($this->payload);

        $result = $client->request('GET', "https://api.linkedin.com/v2/organizationalEntityAcls", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => "q=roleAssignee&role=ADMINISTRATOR&state=APPROVED"
        ]);
        
        return $result;
    }

    public function getPageStatistics()
    {
        $string = rawurlencode(utf8_encode("urn:li:organization:19135829"));

        $encoded_string = str_replace("-","%3A", $string);
       // LinkedIn::setAccessToken($this->access_token);

       // $result = LinkedIn::get('v2/shares?q=owners&owners={URN}&sharesPerOwner=100');

        $client =new \GuzzleHttp\Client();

        $payload = unserialize($this->payload);

        $result = $client->request('GET', "https://api.linkedin.com/v2/organizationPageStatistics", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'Accept-Encoding' => 'gzip',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => "q=organization&organization=urn:li:organization:19135829"
        ]);
        
        return $result;

        return $result;
    }
}
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
            $urnType = $this->account_type == "page" ? "organization" : "person";
            
            $post["owner"] = "urn:li:$urnType:$payload->id";

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
    }

    public function getPages()
    {
        $client =new \GuzzleHttp\Client();

        $result = $client->request('GET', "https://api.linkedin.com/v2/organizationalEntityAcls", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => "q=roleAssignee&role=ADMINISTRATOR&state=APPROVED&projection=(elements*(organizationalTarget~(id, name, vanityName, logoV2(original~:playableStreams))))"
        ]);
        
        $result = $result->getBody()->getContents();
        
        $result = json_decode($result);

        if(is_object($result) && property_exists($result, "elements")){
            foreach($result->elements as $item){
                $organizationalTarget = "organizationalTarget~";
                $original = "original~";
                $item->avatar = $item->$organizationalTarget->logoV2->$original->elements[0]->identifiers[0]->identifier;
                $item->id = $item->$organizationalTarget->id;
                $item->vanityName = $item->$organizationalTarget->vanityName;
                $item->name = $item->$organizationalTarget->name->localized->en_US;
            }

            $result = $result->elements;
        }
        
        return $result;
    }

    public function getPageDetails($pageId)
    {   
        $client =new \GuzzleHttp\Client();

        $result = $client->request('GET', "https://api.linkedin.com/v2/organizations/$pageId", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => ""
        ]);
        
        return json_decode($result->getBody()->getContents());
    }

    public function getPosts($id, $sDate=null, $eDate=null)
    {
        // return response()->json(unserialize('O:26:"Laravel\Socialite\Two\User":12:{s:5:"token";s:350:"AQUuJqIM_4GE0PWHFzDuLev9RE-jxOnYBPPlV6mpMv66WiTAi7Lux276WVE20jkpmWZMaQmNUvjHBcKQ2pc4Som70iQlRqup7g8VyBYgz3pzPsff6sQWkWOzfmdx1c_n5B99Y7HCrt4AJ01FPgo41Fk8-JtRabGo4gJ7VUB7xV1Tps6EycXyC3i2c-AvtqnKJumEPNrieLXa-dvLvrClFyvBcAJy8pQkSrXk0Bvhp54B13vY-nNboph1Ji8KDYBHA1rJyhAP9qGplPFb6sjNOyQd0JGWfmB0JiODVNIr6Ytmf0pXvoTSLhKMCFxUkzLCqF91FIAa_ddAZqRBWAxdv1_P9k8m_g";s:12:"refreshToken";N;s:9:"expiresIn";N;s:2:"id";s:10:"gZlSqOp2zm";s:8:"nickname";N;s:4:"name";s:12:"Durim Rexhaj";s:5:"email";s:23:"durimrexhaj21@gmail.com";s:6:"avatar";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_100_100/0?e=1561593600&v=beta&t=QOH0iX2hGfgJ_3TKZvSyHJxb1mlCIrnpp0rn6DKiLBc";s:4:"user";a:5:{s:9:"firstName";a:2:{s:9:"localized";a:1:{s:5:"en_US";s:5:"Durim";}s:15:"preferredLocale";a:2:{s:7:"country";s:2:"US";s:8:"language";s:2:"en";}}s:8:"lastName";a:2:{s:9:"localized";a:1:{s:5:"en_US";s:6:"Rexhaj";}s:15:"preferredLocale";a:2:{s:7:"country";s:2:"US";s:8:"language";s:2:"en";}}s:14:"profilePicture";a:2:{s:12:"displayImage";s:44:"urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw";s:13:"displayImage~";a:2:{s:8:"elements";a:4:{i:0;a:4:{s:8:"artifact";s:153:"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100)";s:19:"authorizationMethod";s:6:"PUBLIC";s:4:"data";a:1:{s:50:"com.linkedin.digitalmedia.mediaartifact.StillImage";a:6:{s:11:"storageSize";a:2:{s:5:"width";i:100;s:6:"height";i:100;}s:18:"storageAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}s:9:"mediaType";s:10:"image/jpeg";s:12:"rawCodecSpec";a:2:{s:4:"name";s:4:"jpeg";s:4:"type";s:5:"image";}s:11:"displaySize";a:3:{s:3:"uom";s:2:"PX";s:5:"width";d:100;s:6:"height";d:100;}s:18:"displayAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}}}s:11:"identifiers";a:1:{i:0;a:6:{s:10:"identifier";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_100_100/0?e=1561593600&v=beta&t=QOH0iX2hGfgJ_3TKZvSyHJxb1mlCIrnpp0rn6DKiLBc";s:4:"file";s:146:"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_100_100,0)";s:5:"index";i:0;s:9:"mediaType";s:10:"image/jpeg";s:14:"identifierType";s:12:"EXTERNAL_URL";s:26:"identifierExpiresInSeconds";i:1561593600;}}}i:1;a:4:{s:8:"artifact";s:153:"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200)";s:19:"authorizationMethod";s:6:"PUBLIC";s:4:"data";a:1:{s:50:"com.linkedin.digitalmedia.mediaartifact.StillImage";a:6:{s:11:"storageSize";a:2:{s:5:"width";i:200;s:6:"height";i:200;}s:18:"storageAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}s:9:"mediaType";s:10:"image/jpeg";s:12:"rawCodecSpec";a:2:{s:4:"name";s:4:"jpeg";s:4:"type";s:5:"image";}s:11:"displaySize";a:3:{s:3:"uom";s:2:"PX";s:5:"width";d:200;s:6:"height";d:200;}s:18:"displayAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}}}s:11:"identifiers";a:1:{i:0;a:6:{s:10:"identifier";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_200_200/0?e=1561593600&v=beta&t=v8yr1lYmkhbgrlqZlLZ5jKjh1l18Ej0J1H5q61Z3j8Y";s:4:"file";s:146:"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_200_200,0)";s:5:"index";i:0;s:9:"mediaType";s:10:"image/jpeg";s:14:"identifierType";s:12:"EXTERNAL_URL";s:26:"identifierExpiresInSeconds";i:1561593600;}}}i:2;a:4:{s:8:"artifact";s:153:"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400)";s:19:"authorizationMethod";s:6:"PUBLIC";s:4:"data";a:1:{s:50:"com.linkedin.digitalmedia.mediaartifact.StillImage";a:6:{s:11:"storageSize";a:2:{s:5:"width";i:400;s:6:"height";i:400;}s:18:"storageAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}s:9:"mediaType";s:10:"image/jpeg";s:12:"rawCodecSpec";a:2:{s:4:"name";s:4:"jpeg";s:4:"type";s:5:"image";}s:11:"displaySize";a:3:{s:3:"uom";s:2:"PX";s:5:"width";d:400;s:6:"height";d:400;}s:18:"displayAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}}}s:11:"identifiers";a:1:{i:0;a:6:{s:10:"identifier";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_400_400/0?e=1561593600&v=beta&t=ChKS3HcnR4tNGKNJu6dKL82X5fHxm4hUvbsZeT5etvA";s:4:"file";s:146:"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_400_400,0)";s:5:"index";i:0;s:9:"mediaType";s:10:"image/jpeg";s:14:"identifierType";s:12:"EXTERNAL_URL";s:26:"identifierExpiresInSeconds";i:1561593600;}}}i:3;a:4:{s:8:"artifact";s:153:"urn:li:digitalmediaMediaArtifact:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800)";s:19:"authorizationMethod";s:6:"PUBLIC";s:4:"data";a:1:{s:50:"com.linkedin.digitalmedia.mediaartifact.StillImage";a:6:{s:11:"storageSize";a:2:{s:5:"width";i:800;s:6:"height";i:800;}s:18:"storageAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}s:9:"mediaType";s:10:"image/jpeg";s:12:"rawCodecSpec";a:2:{s:4:"name";s:4:"jpeg";s:4:"type";s:5:"image";}s:11:"displaySize";a:3:{s:3:"uom";s:2:"PX";s:5:"width";d:800;s:6:"height";d:800;}s:18:"displayAspectRatio";a:3:{s:11:"widthAspect";d:1;s:12:"heightAspect";d:1;s:9:"formatted";s:9:"1.00:1.00";}}}s:11:"identifiers";a:1:{i:0;a:6:{s:10:"identifier";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_800_800/0?e=1561593600&v=beta&t=Q96gsybKe-fyFjnmB9f0Z-qetCdKokCkD2CttqgrC48";s:4:"file";s:146:"urn:li:digitalmediaFile:(urn:li:digitalmediaAsset:C5103AQGCxRzrl-sySw,urn:li:digitalmediaMediaArtifactClass:profile-displayphoto-shrink_800_800,0)";s:5:"index";i:0;s:9:"mediaType";s:10:"image/jpeg";s:14:"identifierType";s:12:"EXTERNAL_URL";s:26:"identifierExpiresInSeconds";i:1561593600;}}}}s:6:"paging";a:3:{s:5:"count";i:10;s:5:"start";i:0;s:5:"links";a:0:{}}}}s:2:"id";s:10:"gZlSqOp2zm";s:12:"emailAddress";s:23:"durimrexhaj21@gmail.com";}s:10:"first_name";s:5:"Durim";s:9:"last_name";s:6:"Rexhaj";s:15:"avatar_original";s:157:"https://media.licdn.com/dms/image/C5103AQGCxRzrl-sySw/profile-displayphoto-shrink_800_800/0?e=1561593600&v=beta&t=Q96gsybKe-fyFjnmB9f0Z-qetCdKokCkD2CttqgrC48";}'));
        $string = rawurlencode(utf8_encode("urn:li:organization:$id"));

        $encoded_string = str_replace("-","%3A", $string);

       // LinkedIn::setAccessToken($this->access_token);

       // $result = LinkedIn::get('v2/shares?q=owners&owners={URN}&sharesPerOwner=100');

        $client =new \GuzzleHttp\Client();

        $payload = unserialize($this->payload);

        $result = $client->request('GET', "https://api.linkedin.com/v2/ugcPosts", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->access_token,
                'Accept' => 'application/json',
                'Accept-Encoding' => 'gzip',
                'X-Restli-Protocol-Version' => '2.0.0'
            ],
            'query' => "q=authors&authors=List({$encoded_string})"
        ]);
        
        return $result;
    }
}
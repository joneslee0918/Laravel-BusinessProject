<?php

namespace App\Traits\Pinterest;

use Carbon\Carbon;
use DirkGroenen\Pinterest\Pinterest;


trait PinterestTrait
{   

    private function getInstance()
    {
        $pinterest = new Pinterest(config("services.pinterest.client_id"), config("services.pinterest.client_secret"));

        return $pinterest;
    }

    private function setCurrentUser()
    {
        $pinterest = $this->getInstance();

        return $pinterest->auth->setOAuthToken($this->access_token);
    }

    public function getAvatar($token = "")
    {
        $pinterest = new Pinterest(config("services.pinterest.client_id"), config("services.pinterest.client_secret"));
        $pinterest->auth->setOAuthToken($token);
        return $pinterest->users->me(["fields" => "username,first_name,last_name,image[small,large]"]);
        if($user = $pinterest->users->me(["fields" => "image"])){
            return $user->image["60x60"]["url"];
        }
    }

    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function publish($post = "")
    {   

    }

    
    /**
     * @param object ScheduledPost
     * @return mixed
     */
    public function publishScheduledPost($scheduledPost)
    {
    
    }
}
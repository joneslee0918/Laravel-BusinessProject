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

    public function getBoards()
    {   
        $pinterest = new Pinterest(config("services.pinterest.client_id"), config("services.pinterest.client_secret"));
        $pinterest->auth->setOAuthToken($this->access_token);
        
        return $pinterest->users->getMeBoards();
    }

    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function publish($post)
    {   
        $pinterest = new Pinterest(config("services.pinterest.client_id"), config("services.pinterest.client_secret"));
        $pinterest->auth->setOAuthToken($token);
    }

    
    /**
     * @param object ScheduledPost
     * @return mixed
     */
    public function publishScheduledPost($scheduledPost)
    {
    
    }
}
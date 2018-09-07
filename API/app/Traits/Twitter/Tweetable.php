<?php

namespace App\Traits\Twitter;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Thujohn\Twitter\Facades\Twitter;

set_time_limit(0);

trait Tweetable
{

    /**
     * Used to switch between users by using their corresponding
     * access fokens for login
     */
    public function setAsCurrentUser()
    {
        try {
            $tokens = $this->getTokens();

            $request_token = [
                'token' => $tokens->oauth_token,
                'secret' => $tokens->oauth_token_secret,
            ];

            Twitter::reconfig($request_token);
        } catch (\Exception $e) {
            throw $e;
        }
    }


    /**
     * @return mixed
     */
    public function getData()
    {
        try {
            $key = $this->id . "-twitterData";
            $minutes = 1;
            return Cache::remember($key, $minutes, function () {
                $this->setAsCurrentUser();
                return Twitter::getCredentials();
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

        /**
     * @param $userId
     * @return mixed
     */
    public function tweet($tweet)
    {
        $this->setAsCurrentUser();
        return Twitter::postTweet(["status" => $tweet]);
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function followById($userId)
    {
        $this->setAsCurrentUser();
        return Twitter::postFollow(["user_id" => $userId]);
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function unfollowById($userId)
    {
        $this->setAsCurrentUser();
        return Twitter::postUnfollow(["user_id" => $userId]);
    }

    /**
     * @param $username
     * @return mixed
     */
    public function followByName($username)
    {
        $this->setAsCurrentUser();
        return Twitter::postFollow(["screen_name" => $username]);
    }

    /**
     * @param $username
     * @return mixed
     */
    public function unfollowByName($username)
    {
        $this->setAsCurrentUser();
        return Twitter::postUnfollow(["screen_name" => $username]);
    }

    /**
     * @param int $count
     * @param int $cursor
     * @return mixed
     */
    public function getFollowerIds($count = 20, $cursor = -1, $uname = null)
    {
        $this->setAsCurrentUser();
        $params = ["count" => $count, "cursor" => $cursor];

        if($uname){
            $params["screen_name"] = $uname;
        }

        try {
            return Twitter::getFollowersIds($params);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param int $count
     * @param int $cursor
     * @return mixed
     */
    public function getFollowingIds($count = 20, $cursor = -1, $uname = null)
    {
        $this->setAsCurrentUser();

        $params = ["count" => $count, "cursor" => $cursor];

        if($uname){
            $params["screen_name"] = $uname;
        }

        try {
            return Twitter::getFriendsIds($params);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $ids
     * @return array
     */
    public function getUsersLookup($ids)
    {
        try {
            $this->setAsCurrentUser();
            return Twitter::getUsersLookup(["user_id" => $ids]);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * @param $ids
     * @return array
     */
    public function getUsersLookupByName($names)
    {
        try {
            $this->setAsCurrentUser();
            return Twitter::getUsersLookup(["screen_name" => $names]);
        } catch (\Exception $e) {
            return [];
        }
    }


    /**
     * @param array $params
     * @return array
     */
    public function getUsersInfo($params = [])
    {
        try {
            $this->setAsCurrentUser();
            return Twitter::getUsers($params);
        } catch (\Exception $e) {
            return [];
        }
    }


    /**
     * @param array $params
     * @return array
     */
    public function getSearch($params = []){

        try {
            $this->setAsCurrentUser();
            return Twitter::getSearch($params);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * @param array $params
     * @return array
     */
    public function getGeoSearch($params = []){

        try {
            $this->setAsCurrentUser();
            return Twitter::getGeoSearch($params);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * @param array $params
     * @return array
     */
    public function getGeo($id){

        try {
            $this->setAsCurrentUser();
            return Twitter::getGeo($id);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * @param int $cursor
     * @param int $perPage
     * @param int $pages
     * @param int $sleep
     * @return array
     * @throws \Exception
     */
    public function collectFollowerIds($cursor = -1, $perPage = 5000, $pages = 15, $sleep = 60)
    {
        $ids = [];

        /*
         * The start cursor is based on the latest cursor that has been stored
         * in the database, if one exists, then we can use this cursor to jump
         * to that specific page
         */
        $startCursor = $cursor;

        try {

            /*
             * Get the ids from each page
             */
            for ($i = 0; $i < $pages; $i++) {

                /*
                 * Always check at least the first page if there is something new
                 * before jumping to the given cursor page
                 */
                if ($i < 1) {
                    $items = $this->getFollowerIds($perPage, -1);
                } else {

                    /*
                     * If we have a start cursor, after finishing the first page
                     * jump directly to this cursor instead of next page
                     */
                    if ($i < 2 && $startCursor > 0) {
                        $cursor = $startCursor;
                    }

                    $items = $this->getFollowerIds($perPage, $cursor);
                }

                /*
                 * Continue assigning the cursor of the coming page
                 */
                $cursor = $items->next_cursor;

                /*
                 * Merge all pages of ids together
                 */
                $ids = array_merge($ids, $items->ids);

                /*
                 * If the cursor is 0, this means we have finished all pages
                 * and there is no point looping any further
                 */
                if ($cursor < 1) break;

                /*
                 * This is used to prevent rate limit if we want
                 * to fetch more than 15 pages. In order to do that
                 * we need to set it to at least 60 seconds between requests,
                 * since each page is a distinct request.
                 */
                sleep($sleep);
            }
        } catch (\Exception $e) {
            throw $e;
        }

        return ["ids" => $ids, "next_cursor" => $cursor];
    }


    /**
     * @param int $cursor
     * @param int $perPage
     * @param int $pages
     * @param int $sleep
     * @return array|bool
     */
    public function collectFollowingIds($cursor = -1, $perPage = 5000, $pages = 15, $sleep = 60)
    {
        $ids = [];

        /*
         * The start cursor is based on the latest cursor that has been stored
         * in the database, if one exists, then we can use this cursor to jump
         * to that specific page
         */
        $startCursor = $cursor;

        try {

            /*
             * Get the ids from each page
             */
            for ($i = 0; $i < $pages; $i++) {

                /*
                 * Always check at least the first page if there is something new
                 * before jumping to the given cursor page
                 */
                if ($i < 1) {
                    $items = $this->getFollowingIds($perPage, -1);
                } else {

                    /*
                     * If we have a start cursor, after finishing the first page
                     * jump directly to this cursor instead of next page
                     */
                    if ($i < 2 && $startCursor > 0) {
                        $cursor = $startCursor;
                    }

                    $items = $this->getFollowingIds($perPage, $cursor);
                }

                /*
                 * Continue assigning the cursor of the coming page
                 */
                $cursor = $items->next_cursor;

                /*
                 * Merge all pages of ids together
                 */
                $ids = array_merge($ids, $items->ids);

                /*
                 * If the cursor is 0, this means we have finished all pages
                 * and there is no point looping any further
                 */
                if ($cursor < 1) break;

                /*
                 * This is used to prevent rate limit if we want
                 * to fetch more than 15 pages. In order to do that
                 * we need to set it to at least 60 seconds between requests,
                 * since each page is a distinct request.
                 */
                sleep($sleep);
            }
        } catch (\Exception $e) {
            throw $e;
        }

        return ["ids" => $ids, "next_cursor" => $cursor];
    }


    /**
     * Compares and synchronizes ids stored in the database
     * against the ids that are fetched out.
     * @param int $sleep
     * @param bool $logCursor
     */
    public function syncFollowerIds($sleep = 60, $logCursor = false)
    {
        /*
         * If $logCursor is not enabled, it will always start from the first page
         * and continue to the next one in order
         */
        if (!$logCursor) {
            $cursor = -1;
        } else {
            $cursor = $this->cursor ? $this->cursor->followingids_cursor : -1;
        }

        $perPage = 5000;
        $followersCount = $this->getData()->followers_count; //Gets the twitter data for currently logged in user

        /*
         * If sleep is not enabled then only fetch 15 pages to prevent
         * rate limit, otherwise get as many pages as you have followers
         * but sleep has to be 60 seconds according to the 15 requests per 15 minute
         * limit.
         */
        if ($sleep < 1) {
            $pages = 15;
        } else {
            $pages = ceil($followersCount / $perPage);
        }

        /*
         * Gets the full collection for all given pages.
         * It contains the ids array and the next_cursor (usually -1 if all data is fetched)
         */
        $collection = $this->collectFollowerIds($cursor, $perPage, $pages, $sleep);

        /*
         * If the collection is returned successfully
         * proceed with the synchronization
         */
        if ($collection) {
            $ids = $collection["ids"];

            $cursor = $collection["next_cursor"];

            /*
             * Search for duplicate ids to prevent storing them twice
             */
            $followerIds = $this->followerIds()->whereIn("user_id", $ids);

            /*
             * In case we are not keeping track for cursor and are fetching all data at once
             * and if we manage to grab all the id pages, then it is worth checking against
             * old ids we had stored so that we know if someone unfollowed us
             */
            if ($cursor < 1 && !$logCursor) {
                /*
                 * In case someone follows you back, update the unfollow field to null
                 */
                $this->followerIds()->whereIn("user_id", $ids)->whereNotNull("unfollowed_you_at")->update(["unfollowed_you_at" => null]);

                $this->followerIds()->whereNotIn("user_id", $ids)
                    ->update(["unfollowed_you_at" => Carbon::now(), "updated_at" => Carbon::now()]);
            }

            /*
             * Get the duplicate ids that already exist in the database and exclude them
             * from our id collection from the recent search
             */
            $dupIds = $followerIds->pluck("user_id")->toArray();
            $ids = array_diff($ids, $dupIds);


            /*
             * Prepare insert parameters for bulk inserting
             */
            $insert = [];
            foreach ($ids as $id) {
                $insert[] = [
                    "channel_id" => $this->id,
                    "user_id" => $id,
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now(),
                ];
            }

            /*
             * To prevent the insert batch from running out of memory,
             * we chunk them into smaller parts
             */
            foreach (array_chunk($insert, 100000) as $chunk) {
                $this->followerIds()->insert($chunk);
            }


            /*
             * If we decide to keep track of the cursor, then store it in the database
             * so we can next time refer to it instead of always searching the same pages
             * over and over
             */
            if ($logCursor) {
                if ($cursor > 0) {
                    $this->cursor()->updateOrCreate(["channel_id" => $this->id], ["followerids_cursor" => $cursor]);
                } else {
                    $this->cursor()->updateOrCreate(["channel_id" => $this->id], ["followerids_cursor" => -1]);
                }
            }
        }
    }


    /**
     * @param int $sleep
     * @param bool $logCursor
     */
    public function syncFollowingIds($sleep = 60, $logCursor = false)
    {
        /*
         * If $logCursor is not enabled, it will always start from the first page
         * and continue to the next one in order
         */
        if (!$logCursor) {
            $cursor = -1;
        } else {
            $cursor = $this->cursor ? $this->cursor->followingids_cursor : -1;
        }

        $perPage = 5000;
        $followingCount = $this->getData()->friends_count;

        /*
        * If sleep is not enabled then only fetch 15 pages to prevent
        * rate limit, otherwise get as many pages as you have followers
        * but sleep has to be 60 seconds according to the 15 requests per 15 minute
        * limit.
        */
        if ($sleep < 1) {
            $pages = 15;
        } else {
            $pages = ceil($followingCount / $perPage);
        }

        /*
        * Gets the full collection for all given pages.
        * It contains the ids array and the next_cursor (usually -1 if all data is fetched)
        */
        $collection = $this->collectFollowingIds($cursor, $perPage, $pages, $sleep);

        /*
        * If the collection is returned successfully
        * proceed with the synchronization
        */
        if ($collection) {
            $ids = $collection["ids"];

            $cursor = $collection["next_cursor"];

            /*
            * Search for duplicate ids to prevent storing them twice
            */
            $followingIds = $this->followingIds()->whereIn("user_id", $ids);

            /*
            * In case we are not keeping track for cursor and are fetching all data at once
            * and if we manage to grab all the id pages, then it is worth checking against
            * old ids we had stored so that we know if we unfollowed someone manually
            */
            if ($cursor < 1 && !$logCursor) {
                /*
                 * In case we followed someone again, make sure to set the unfollow
                 * field to null
                 */
                $this->followingIds()->whereIn("user_id", $ids)->whereNotNull("unfollowed_at")->update(["unfollowed_at" => null]);

                $this->followingIds()->whereNotIn("user_id", $ids)
                    ->update(["unfollowed_at" => Carbon::now(), "updated_at" => Carbon::now()]);
            }

            /*
            * Get the duplicate ids that already exist in the database and exclude them
            * from our id collection from the recent search
            */
            $dupIds = $followingIds->pluck("user_id")->toArray();
            $ids = array_diff($ids, $dupIds);


            /*
            * Prepare insert parameters for bulk inserting
            */
            $insert = [];
            foreach ($ids as $id) {
                $insert[] = [
                    "channel_id" => $this->id,
                    "user_id" => $id,
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now(),
                ];
            }

            /*
            * To prevent the insert batch from running out of memory,
            * we chunk them into smaller parts
            */
            foreach (array_chunk($insert, 100000) as $chunk) {
                $this->followingIds()->insert($chunk);
            }

            /*
            * If we decide to keep track of the cursor, then store it in the database
            * so we can next time refer to it instead of always searching the same pages
            * over and over
            */
            if ($logCursor) {
                if ($cursor > 0) {
                    $this->cursor()->updateOrCreate(["channel_id" => $this->id], ["followingids_cursor" => $cursor]);
                } else {
                    $this->cursor()->updateOrCreate(["channel_id" => $this->id], ["followingids_cursor" => -1]);
                }
            }
        }
    }
}
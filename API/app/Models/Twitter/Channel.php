<?php

namespace App\Models\Twitter;

use App\Traits\Selectable;
use App\Traits\Twitter\Tweetable;
use App\Models\Channel as GlobalChannel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Channel extends Model
{
    use Selectable, Tweetable;

    public $table = "twitter_channels";

    protected $fillable = [
        "user_id",
        "channel_id",
        "username",
        "payload",
        "access_token",
        "selected"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function global()
    {
        return $this->belongsTo(GlobalChannel::class, "channel_id");
    }

    public function getTokens()
    {
        return json_decode($this->access_token);
    }

    public function accountTargets()
    {
        return $this->hasMany(AccountTarget::class);
    }

    public function accountTargetsFeed()
    {
        return $this->hasMany(AccountTargetFeed::class);
    }

    public function keywordTargets()
    {
        return $this->hasMany(KeywordTarget::class);
    }

    public function keywordTargetsFeed()
    {
        return $this->hasMany(KeywordTargetFeed::class);
    }

    public function followerIds()
    {
        return $this->hasMany(FollowerId::class);
    }

    public function followingIds()
    {
        return $this->hasMany(FollowingId::class);
    }

    public function tweets()
    {
        return $this->hasMany(Tweet::class);
    }

    public function retweets()
    {
        return $this->hasMany(Retweet::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function cursor()
    {
        return $this->hasOne(Cursor::class);
    }

    public function processes()
    {
        return $this->hasMany(Process::class);
    }

    public function startProcess($processName)
    {
        $this->processes()->create(["process_name" => $processName]);
    }

    public function stopProcess($processName)
    {
        $this->processes()->where("process_name", $processName)->delete();
    }

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }

    public function updateStatistics($type, $count = 1)
    {
        $existingStatistics = $this->statistics()->where("created_at", "LIKE", "" . Carbon::today()->toDateString() . " %")->first();
        $lastDate = $existingStatistics ? $existingStatistics->created_at : Carbon::now();
        Statistic::updateOrCreate(["channel_id" => $this->id, "created_at" => $lastDate], [$type => \DB::raw("$type + $count")]);
    }

    public function getDailyStatisticsFor($type)
    {
        $existingStatistics = $this->statistics()->where("created_at", "LIKE", "" . Carbon::today()->toDateString() . "%")->first();
        $lastDate = $existingStatistics ? $existingStatistics->created_at : null;

        if ($statistics = $this->statistics()->where("created_at", $lastDate)->first()) {
            return $statistics->{$type};
        } else {
            return 0;
        }
    }

    public function getAnalytics($days=1)
    {
        try {
            $key = $this->id . "-twitterAnalytics-$days";
            $minutes = 15;
            return Cache::remember($key, $minutes, function () use ($days) {
                $data = [];
                $startDate = Carbon::now();
        
                $followers = $this->followerIds()->whereNull('unfollowed_you_at')->whereBetween('created_at', [$startDate->subDays($days), Carbon::now()])->whereNotBetween('created_at', [$this->created_at , $this->created_at->addMinutes(5)])->get();
                $unfollowers = $this->followerIds()->whereNotNull('unfollowed_you_at')->whereBetween('unfollowed_you_at', [$startDate->subDays($days), Carbon::now()])->get();
                $tweets = $this->tweets()->whereBetween('original_created_at', [$startDate->subDays($days), Carbon::now()])->get();
                $retweets = $this->retweets()->whereBetween('original_created_at', [$startDate->subDays($days), Carbon::now()])->get();
                $likes = $this->likes()->whereBetween('original_created_at', [$startDate->subDays($days), Carbon::now()])->get();
        
                $data = [
                    'followers' => $followers->count(),
                    'unfollowers' => $unfollowers->count(),
                    'tweets' => $tweets->count(),
                    'retweets' => $retweets->count(),
                    'likes' => $likes->count(),
                    'profile' => $this->getData()
                ];
        
                return $data;
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

}

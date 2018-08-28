<?php

namespace App\Models\Twitter;

use App\Traits\Selectable;
use App\Traits\Twitter\Tweetable;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

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

}

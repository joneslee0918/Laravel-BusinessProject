<?php

namespace App\Models\Facebook;

use App\Traits\Selectable;
use App\Traits\Facebook\FacebookTrait;
use App\Models\Channel as GlobalChannel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Channel extends Model
{
    use Selectable, FacebookTrait;

    public $table = "facebook_channels";

    protected $fillable = [
        "user_id",
        "channel_id",
        "parent_id",
        "username",
        "name",
        "email",
        "payload",
        "access_token",
        "account_type",
        "selected",
        "original_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function global()
    {
        return $this->belongsTo(GlobalChannel::class, "channel_id");
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

    public function getAnalytics($days=1)
    {
        switch ($days) {
            case 1:
                $period = 'day';
                break;
            case 7:
                $period = 'week';
                break;
            case 30:
                $period = 'month';
                break;
            
            default:
                $period = 'day';
                break;
        }
        try {
            $key = $this->id . "-facebookAnalytics-$days";
            $minutes = 15;
            return Cache::remember($key, $minutes, function () use ($days, $period) {
                $data = [];    
                
                $likes = $this->pageLikes($period)['data'][0]['values'][1]['value'];
                $unlikes = $this->pageUnlikes($period)['data'][0]['values'][1]['value'];
        
                $data = [
                    'likes' => $likes,
                    'unlikes' => $unlikes
                ];
        
                return $data;
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }
}

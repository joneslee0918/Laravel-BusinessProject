<?php

namespace App\Models\Linkedin;

use App\Traits\Selectable;
use App\Traits\Linkedin\LinkedinTrait;
use App\Models\Channel as GlobalChannel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class Channel extends Model
{
    use Selectable, LinkedinTrait;

    public $table = "linkedin_channels";

    protected $fillable = [
        "user_id",
        "channel_id",
        "original_id",
        "parent_id",
        "username",
        "name",
        "email",
        "payload",
        "access_token",
        "account_type",
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

    public function pageInsightsByType($type, $startDate, $endDate)
    {
        $period = 'month';

        $sDate = intval($startDate/1000);
        $eDate = intval($endDate/1000);

        try {
            $key = $this->id . "-$type-$startDate-$endDate";
            $minutes = 15;
            $startDate = Carbon::now(); 

            return Cache::remember($key, $minutes, function () use ($period, $sDate, $eDate, $type) {
                $startDate = Carbon::now(); 

                $data = []; 
                $startDate = Carbon::now();   

                $data = $this->{$type}($sDate, $eDate);

                return $data;

            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function postsCount($sDate, $eDate)
    {
        try {
            $key = $this->id . "-postsCount-$sDate-$eDate";
            $minutes = 15;
            $startDate = Carbon::now(); 

            return Cache::remember($key, $minutes, function () use ($sDate, $eDate) {

                $posts = $this->getPosts($sDate, $eDate);

                if(!isset($posts['data'])) return 0;

                return count($posts['elements']);
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }
}

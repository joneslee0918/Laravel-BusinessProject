<?php

namespace App\Models\Facebook;

use App\Traits\Selectable;
use App\Traits\Facebook\FacebookTrait;
use App\Models\Channel as GlobalChannel;
use App\Models\Facebook\Post as FacebookPost;
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

    public function posts()
    {
        return $this->hasMany(FacebookPost::class);
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
                $startDate = Carbon::now();   

                $likes = $this->pageLikes($period)['data'][0]['values'][1]['value'];
                $unlikes = $this->pageUnlikes($period)['data'][0]['values'][1]['value'];
                $engagement = $this->pageEngagement($period)['data'][0]['values'][1]['value'];
                $reactions = $this->pageTotalReactions($period);
                $posts = $this->posts()->whereBetween('original_created_at', [$startDate->subDays($days), Carbon::now()])->get();
        
                $data = [
                    'likes' => $likes,
                    'unlikes' => $unlikes,
                    'engagement' => $engagement,
                    'reactions' => $reactions,
                    'posts' => $posts->count()
                ];

                return $data;
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function pageInsights($startDate, $endDate)
    {
        $period = 'month';

        $sDate = intval($startDate/1000);
        $eDate = intval($endDate/1000);

        try {
            $key = $this->id . "-pageInsights-$startDate-$endDate";
            $minutes = 15;
            $startDate = Carbon::now(); 

            return Cache::remember($key, $minutes, function () use ($period, $sDate, $eDate) {
                $data = []; 
                $startDate = Carbon::now();   

                $fans = collect($this->pageLikes($period, $sDate, $eDate)['data'][0]['values'])->sum('value');
                $engagement = $this->pageEngagement($period)['data'][0]['values'][1]['value'];
                $posts = $this->getPosts($sDate, $eDate)['data'];
                $postsChartData = $this->postsChartData($sDate, $eDate);
                $fansChartData = $this->fansChartData($sDate, $eDate);
                $reactions = $this->pageTotalReactions($period);
        
                $data = [                    
                    'posts' => count($posts),
                    'fans' => $fans,
                    'engagement' => $engagement,
                    'postsChartData' => $postsChartData,
                    'fansChartData' => $fansChartData,
                    'reactions' => $reactions,
                    'postsData' => $this->postsData(),
                ];

                return $data;
            });
        } catch (\Exception $e) {
            throw $e;
        }
    }
    /**
     * 
     * Prepare data for Posts Chart
     */
    private function postsChartData($sDate, $eDate)
    {
        $posts = $this->getPosts($sDate, $eDate)['data'];

        $grouped_posts = collect($posts)->sortBy('created_time')->groupBy(function($post) {
            return Carbon::parse($post['created_time'])->format('Y-m-d');
        });

        $data = [];

        foreach($grouped_posts as $key=>$value)
        {
            $data[] = [$key, count($value)];
        }

        return $data;
    }

    /**
     * Prepare data for Fans Chart
     */
    public function fansChartData($sDate, $eDate)
    {
        $data = [];

        $fans = $this->pageLikes('month', $sDate, $eDate);

        $values = $fans['data'][0]['values'];

        foreach($values as $value)
        {
            $data[] = [Carbon::parse($value['end_time'])->format("Y-m-d"), $value['value']];
        }

        return $data;
    }

    /**
     * Prepare data for Posts Table
     */
    public function postsData()
    {
        $posts = $this->posts;

        foreach($posts as $post)
        {
            $post->date = Carbon::parse($post->original_created_at)->format('M y, H:i');
            $post->reactions = count($this->postReactions($post->post_id)['data']);
            $post->comments = count($this->postComments($post->post_id)['data']);
            $post->shares = count($this->postShares($post->post_id)['data']);
        }

        return $posts;
    }
}

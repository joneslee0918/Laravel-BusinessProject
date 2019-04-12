<?php

namespace App\Models\Facebook;

use App\Traits\Selectable;
use App\Traits\Facebook\FacebookTrait;
use App\Models\Channel as GlobalChannel;
use App\Models\Facebook\Post as FacebookPost;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
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

        return $this->pageLikes('day', $sDate, $eDate);

        try {
            $key = $this->id . "-pageInsights-$startDate-$endDate";
            $minutes = 15;
            $startDate = Carbon::now(); 

            return Cache::remember($key, $minutes, function () use ($period, $sDate, $eDate) {
                $data = []; 
                $startDate = Carbon::now();   

                $fans = collect($this->pageLikes('day', $sDate, $eDate)['data'][0]['values'])->last()['value'];
                $posts = $this->getPosts($sDate, $eDate)['data'];
                $postsChartData = $this->postsChartData($sDate, $eDate);
                $fansChartData = $this->fansChartData($sDate, $eDate);
                $postsData = $this->postsData($sDate, $eDate);
                $reactions = $postsData->sum('reactions');
                $comments = $postsData->sum('comments');
                $shares = $postsData->sum('shares');
                $engagementByTypeData = $this->engagementByTypeData($sDate, $eDate);
        
                $data = [                    
                    'posts' => count($posts),
                    'fans' => $fans,
                    'postsChartData' => $postsChartData,
                    'fansChartData' => $fansChartData,
                    'postsData' => $postsData,
                    'reactions' => $reactions,
                    'comments' => $comments,
                    'shares' => $shares,
                    'engagement' => $reactions + $comments + $shares,
                    'engagementByTypeData' => $engagementByTypeData
                ];

                return $data;
            });
        } catch (\Exception $e) {
            throw $e;
        }
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
        $posts = $this->getPosts($sDate, $eDate);

        if(!isset($posts['data'])) return 0;

        return count($posts['data']);
    }

    private function fansCount($sDate, $eDate)
    {
        $fans = collect($this->pageLikes('day', $sDate, $eDate)['data'][0]['values'])->last()['value'];

        return $fans;
    }

    private function engagementsCount($sDate, $eDate)
    {
        $postsData = $this->postsData($sDate, $eDate);

        $reactions = $postsData->sum('reactions');
        $comments = $postsData->sum('comments');
        $shares = $postsData->sum('shares');

        return $reactions+$comments+$shares;
    }
    private function engagementsByType($sDate, $eDate)
    {
        $postsData = $this->postsData($sDate, $eDate);

        $reactions = $postsData->sum('reactions');
        $comments = $postsData->sum('comments');
        $shares = $postsData->sum('shares');

        $data = [                    
            'reactions' => $reactions,
            'comments' => $comments,
            'shares' => $shares
        ];

        return $data;
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
            $data[] = [Carbon::parse($key)->timestamp*1000, count($value)];
        }

        return $data;
    }

    /**
     * Prepare data for Fans Chart
     */
    public function fansChartData($sDate, $eDate)
    {
        $data = [];

        $fans = $this->pageLikes('day', $sDate, $eDate);

        $values = $fans['data'][0]['values'];


        foreach($values as $value)
        {

            $data[] = [Carbon::parse($value['end_time'])->timestamp*1000, $value['value']];
        }

        return $data;
    }

    /**
     * Prepare data for Posts Table
     */
    public function postsData($sDate, $eDate)
    {        
        $posts = $this->getPosts($sDate, $eDate)['data']; 

        $preparePosts = collect();

        foreach($posts as $post)
        {
            $post = collect($post);
            $post->put('date', Carbon::parse($post['created_time'])->format('M d, H:i'));
            $post->put('reactions', count($this->postReactions($post['id'])['data']));
            $post->put('comments', count($this->postComments($post['id'])['data']));
            $post->put('shares', count($this->postShares($post['id'])['data']));
            $post->put('timestamp', Carbon::parse($post['created_time'])->timestamp);
            
            $preparePosts->push($post);
        }

        return $preparePosts;
    }

    /**
     * Prepare data for Posts Table
     */
    public function engagementByTypeData($startDate, $endDate)
    {   
        $likes = collect($this->pageLikeReactions('day', $startDate, $endDate)['data'][0]['values']);
        $love = collect($this->pageLoveReactions('day', $startDate, $endDate)['data'][0]['values']);
        $wow = collect($this->pageWowReactions('day', $startDate, $endDate)['data'][0]['values']);
        $haha = collect($this->pageHahaReactions('day', $startDate, $endDate)['data'][0]['values']);
        $sorry = collect($this->pageSorryReactions('day', $startDate, $endDate)['data'][0]['values']);
        $anger = collect($this->pageAngerReactions('day', $startDate, $endDate)['data'][0]['values']);

        $merged = $likes->merge($love)->merge($wow)->merge($haha)->merge($sorry)->merge($anger);

        $keyed = $merged->mapWithKeys(function ($item) {
            return [$item['end_time'] => $item['value'] + $item['value']];
        });
        

        $dataReactions = collect();
        $comments = collect();
        $shares = collect();

        $dataReactions->put('name', 'Reactions');
        $comments->put('name', 'Comments');
        $shares->put('name', 'Shares');

        $reactions = [];
        foreach($keyed->toArray() as $key => $value)
        {
            $reactions[] = [Carbon::parse($key)->timestamp*1000, $value];
        }
        $dataReactions->put('data', $reactions);
        $comments->put('data',[]);
        $shares->put('data',[]);

        $dataArray = [];

        $dataArray[] = $dataReactions;
        $dataArray[] = $comments;
        $dataArray[] = $shares;

        return $dataArray;
    }
}

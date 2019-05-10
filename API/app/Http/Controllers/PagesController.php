<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Admin\Post;
use App\Models\Admin\PostCategory;
use App\Models\Admin\PostTag;

class PagesController extends Controller
{

    /**
     * Show homepage
     */
    public function index() {
        return view('frontend.homepage.index');
    }

    /**
     *
     * Show upgrade page
     */
    public function upgrade()
    {
    	return view('frontend.upgrade');
    }

    /**
     *
     * Show learning page
     */
    public function education()
    {
    	return view('frontend.education');
    }

    /**
     *
     * Show learning page
     */
    public function pricing()
    {
    	return view('frontend.tableprices');
    }

     /**
     *
     * Show learning page
     */
    public function blog()
    {
        $posts = Post::paginate(5);

    	return view('frontend.blog', compact('posts'));
    }

    /**
     *
     * Show Article page
     */
    public function article($id)
    {
        $post = Post::findOrFail($id);
        $categories = PostCategory::all();
        $tags = PostTag::all();
        $recent_posts = Post::whereNotIn('id',[$post->id])->latest()->take(3)->get();

    	return view('frontend.article', compact('post', 'categories', 'tags','recent_posts'));
    }
}

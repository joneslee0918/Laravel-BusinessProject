@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Blog</h1>
		<p>Manuals take time. These videos will get you started instantly.</p>
	</div>
</div>

<div class="container article-page-content">
	<div class="row mt100 mb100">
		<div class="col-md-8 col-xs-12">
			<div class="article-image">
				<div class="article-image-social">
					<div class="pb10"><i class="fa fa-facebook"></i></div>
					<div class="pb10"><i class="fa fa-twitter"></i></div>
					<div class="pb10"><i class="fa fa-instagram"></i></div>
				</div>
				<div class="article-image-image">
					<img src="{{ asset('/images/article-img-4.png')}}" class="img-responsive">					
				</div>				
			</div>
			<div class="article-content mt50">
				<h4 class="text-uppercase fw700">Change your way of living</h4>
				<div class="posted-by">Posted by OnStyle on 05.05.2016 at 3:34PM</div>
				<p class="pt20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.orem ipsum dolor sit amet, consectetur.</p>
				<h5 class="pt20">How to target those problems?</h5>
				<p class="pt20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.orem ipsum dolor sit amet, consectetur.</p>
				<h4 class="mt50 text-uppercase fw700">Recent Comments</h4>
				<div class="article-comments pt30">
					<div class="article-comment">
						<div class="article-comment-photo text-center">
							<div class="comment-img">
								<img src="{{ asset('/images/comment-img.png')}}">
							</div>
						</div>
						<div class="article-comment-text">
							<h5>Jeffrey Caleman</h5>
							<div class="comment-date">05. 05. 2019 at 7:00 PM</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
						</div>
					</div>
					<div class="article-comment">
						<div class="article-comment-photo text-center">
							<div class="comment-img">
								<img src="{{ asset('/images/comment-img.png')}}">
							</div>
						</div>
						<div class="article-comment-text">
							<h5>Jeffrey Caleman</h5>
							<div class="comment-date">05. 05. 2019 at 7:00 PM</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
						</div>
					</div>
				</div>
				<h4 class="mt50 text-uppercase fw700">Leave a Comment</h4>
				<div>
					<form class="comment-form">
						<div class="row pb20 pt20">
							<div class="col-md-6 col-xs-12">
								<input type="text" name="name" class="form-input" placeholder="Name">
							</div>
							<div class="col-md-6 col-xs-12">
								<input type="email" name="email" class="form-input" placeholder="E-mail">
							</div>
						</div>
						<div class="row pb20">
							<div class="col-xs-12">
								<textarea class="form-input" placeholder="Comment..."></textarea>
							</div>
						</div>
						<div class="row mb20">
							<div class="col-xs-12 text-right">
								<a href="#" class="btn theme-btn">Post</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-xs-12 category-tags-posts">
			<input type="text" name="name" class="form-input search-input" placeholder="Name">
			<h4 class="mt50 text-uppercase fw700">Categories</h4>
			<ul class="article-categories">
				<li>General</li>
				<li>Life Style</li>
				<li>Social Media</li>
				<li>Tech</li>
				<li>Music</li>
				<li>Entertainment</li>
			</ul>
			<h4 class="mt50 text-uppercase fw700">Tags</h4>
			<span class="tag">Funny</span>
			<span class="tag">Beautiful</span>
			<span class="tag">Pretty</span>
			<span class="tag">Healthy</span>
			<span class="tag">Tasty</span>
			<span class="tag">Sun</span>
			<span class="tag">Coffe</span>
			<span class="tag">Caramel</span>
			<span class="tag">Plants</span>
			<h4 class="mt50 text-uppercase fw700">Recent Posts</h4>
			<div class="recent-posts pt30">
				<div class="recent-post">
					<div class="recent-posts-photo text-center">
						<div class="comment-img">
							<img src="{{ asset('/images/comment-img.png')}}">
						</div>
					</div>
					<div class="recent-posts-text">
						<h5>Jeffrey Caleman</h5>
						<div class="comment-date">Posted by Uniclix</div>
						<div class="comment-date">23 May 2019</div>
					</div>
				</div>
				<div class="recent-post">
					<div class="recent-posts-photo text-center">
						<div class="comment-img">
							<img src="{{ asset('/images/comment-img.png')}}">
						</div>
					</div>
					<div class="recent-posts-text">
						<h5>Jeffrey Caleman</h5>
						<div class="comment-date">Posted by Uniclix</div>
						<div class="comment-date">23 May 2019</div>
					</div>
				</div>
				<div class="recent-post">
					<div class="recent-posts-photo text-center">
						<div class="comment-img">
							<img src="{{ asset('/images/comment-img.png')}}">
						</div>
					</div>
					<div class="recent-posts-text">
						<h5>Jeffrey Caleman</h5>
						<div class="comment-date">Posted by Uniclix</div>
						<div class="comment-date">23 May 2019</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('frontend.includes.footer')

@endsection
@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Watch these videos to lern all what you need about how uniclix works.</h1>
		<a href="">BLOG</a>
	</div>
</div>

<div class="container">
	<div class="row mt100 mb100">
		<div class="col-md-8 col-xs-12">
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-1.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-2.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row mt30">
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-3.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-4.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row mt30">
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-5.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="blog-panel panel-shadow">
						<div class="blog-panel-image">
							<img class="img-responsive" src="{{asset('images/blog-img-6.png')}}">
							<span class="blog-category"><a href="#" class="compose-btn category-span">Category Name</a></span>
						</div>
						<div class="blog-panel-content">
							<a href="{{route('article')}}"><h4>Fusce porttitor velit sapien, eget hendrerit libero sodales</h4></a>
							<p class="pt20">Quisque sed fermentum felis, congue dictum ligula. Vivamus lobortis iaculis accumsan. Nulla ut risus molestie, pulvinar justo in..</p>
							<p class="pt20 blog-date"> - June 21,2018</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-xs-12">
			<div class="row">
				<div class="col-xs-12">
					<input type="text" name="search" class="search-input" placeholder="Search...">
				</div>
			</div>
			<div class="row mt30">
				<div class="col-xs-12">
					<div class="recent-posts">
						<h5 class="fw700">RECENT POSTS</h5>
						<div class="row mb20">
							<div class="col-xs-3">
								<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
							</div>
							<div class="col-xs-9">
								<p class="fw700">Curabitur diam libero, iaculis ac dictum non, faucibus at sapien</p>
								<p class="fs12"> - June 21,2018</p>
							</div>
						</div>
						<div class="row mb20">
							<div class="col-xs-3">
								<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
							</div>
							<div class="col-xs-9">
								<p class="fw700">Aenean quis enim eget tellus pretium laoreet</p>
								<p class="fs12"> - June 21,2018</p>
							</div>
						</div>
						<div class="row mb20">
							<div class="col-xs-3">
								<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
							</div>
							<div class="col-xs-9">
								<p class="fw700">Curabitur diam libero, iaculis ac dictum non, faucibus at sapien</p>
								<p class="fs12"> - June 21,2018</p>
							</div>
						</div>
						<div class="row mb20">
							<div class="col-xs-3">
								<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
							</div>
							<div class="col-xs-9">
								<p class="fw700">Curabitur diam libero, iaculis ac dictum non, faucibus at sapien</p>
								<p class="fs12"> - June 21,2018</p>
							</div>
						</div>
						<div class="row mb20">
							<div class="col-xs-3">
								<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
							</div>
							<div class="col-xs-9">
								<p class="fw700">Curabitur diam libero, iaculis ac dictum non, faucibus at sapien</p>
								<p class="fs12"> - June 21,2018</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row mt30">
				<div class="col-xs-12">
					<h5 class="fw700">CATEGORIES</h5>
					<p>> First Category(5)</p>
					<p>> Second Category(11)</p>
					<p>> Third Category(3)</p>
				</div>
			</div>
			<div class="row mt30">
				<div class="col-xs-12">
					<h5 class="fw700">ARCHIVES</h5>
					<p>> June 2018(3)</p>
					<p>> May 2018(3)</p>
					<p>> April 2018(3)</p>
					<p>> March 2018(3)</p>
					<p>> February 2018(3)</p>
					<p>> January 2018(3)</p>
				</div>
			</div>
			<div class="row mt30">
				<div class="col-xs-12">
					<h5 class="fw700">TAGS</h5>
					<span class="tag">Business</span>
					<span class="tag">Following</span>
					<span class="tag">Twitter</span>
					<span class="tag">Marketing</span>
					<span class="tag">Share</span>
					<span class="tag">Manage</span>
					<span class="tag">Popular</span>
					<span class="tag">Business</span>
					<span class="tag">Following</span>
					<span class="tag">Twitter</span>
					<span class="tag">Marketing</span>
					<span class="tag">Share</span>
					<span class="tag">Manage</span>
					<span class="tag">Popular</span>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="bg-grey-content">
	<div class="container">
		@include('frontend.includes.footer')
	</div>
</div>
@endsection
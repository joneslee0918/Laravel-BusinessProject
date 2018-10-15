@extends('layouts.homepage')

@section('content')
<div class="article-banner">
</div>

<div class="container mt100 mb100">
	<div class="row">
		<div class="col-xs-12"><h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1></div>
	</div>
	<div class="row">
		<div class="col-xs-12 mt10 mb10"><span class="article-category">BUSINESS MARKETING</span> / <span>May 23, 2018</span></div>
	</div>
	<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-11 col-xs-12 mt50">
			<p class="article-em">Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas facilisis lectus sed mi sodales, convallis consequat ligula vestibulum. Vivamus sit amet dignissim quam, ac ornare tortor. Aliquam vel pulvinar diam, vel feugiat ex. Sed congue purus sed tortor tincidunt vestibulum. Suspendisse vitae dapibus mi. </p>
		</div>
	</div>
	<div class="row mt20">
		<div class="col-xs-12">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet orci sed elementum condimentum. Donec varius, lectus vel molestie gravida, massa dui aliquet ex, nec ultricies massa nunc id lacus. Fusce dapibus augue ac pretium fermentum. Aliquam porta erat ac condimentum congue. Sed non magna elit. Vivamus tincidunt nulla at ipsum laoreet dignissim. Vivamus pretium risus fringilla metus vulputate, eget rutrum nisl tempor. Etiam aliquam risus non laoreet laoreet. Cras pretium diam id felis rutrum pellentesque. Suspendisse blandit dictum massa. Praesent aliquam orci in ligula malesuada volutpat.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet orci sed elementum condimentum. Donec varius, lectus vel molestie gravida, massa dui aliquet ex, nec ultricies massa nunc id lacus. Fusce dapibus augue ac pretium fermentum. Aliquam porta erat ac condimentum congue. Sed non magna elit. Vivamus tincidunt nulla at ipsum laoreet dignissim. Vivamus pretium risus fringilla metus vulputate, eget rutrum nisl tempor. Etiam aliquam risus non laoreet laoreet. Cras pretium diam id felis rutrum pellentesque. Suspendisse blandit dictum massa. Praesent aliquam orci in ligula malesuada volutpat.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet orci sed elementum condimentum. Donec varius, lectus vel molestie gravida, massa dui aliquet ex, nec ultricies massa nunc id lacus. Fusce dapibus augue ac pretium fermentum. Aliquam porta erat ac condimentum congue. Sed non magna elit. Vivamus tincidunt nulla at ipsum laoreet dignissim. Vivamus pretium risus fringilla metus vulputate, eget rutrum nisl tempor. Etiam aliquam risus non laoreet laoreet. Cras pretium diam id felis rutrum pellentesque. Suspendisse blandit dictum massa. Praesent aliquam orci in ligula malesuada volutpat.</p>
		</div>
	</div>
	<div class="row mt100 mb80">
		<div class="col-md-6 col-xs-12 mb20">
			<div class="article-img panel-shadow">
				<img class="img-responsive" src="{{ asset('images/article-img-1.png')}}">
			</div>
		</div>
		<div class="col-md-6 col-xs-12 mb20">
			<div class="article-img panel-shadow">
				<img class="img-responsive" src="{{ asset('images/article-img-2.png')}}">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet orci sed elementum condimentum. Donec varius, lectus vel molestie gravida, massa dui aliquet ex, nec ultricies massa nunc id lacus. Fusce dapibus augue ac pretium fermentum. Aliquam porta erat ac condimentum congue. Sed non magna elit. Vivamus tincidunt nulla at ipsum laoreet dignissim. Vivamus pretium risus fringilla metus vulputate, eget rutrum nisl tempor. Etiam aliquam risus non laoreet laoreet. Cras pretium diam id felis rutrum pellentesque. Suspendisse blandit dictum massa. Praesent aliquam orci in ligula malesuada volutpat.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet orci sed elementum condimentum. Donec varius, lectus vel molestie gravida, massa dui aliquet ex, nec ultricies massa nunc id lacus. Fusce dapibus augue ac pretium fermentum. Aliquam porta erat ac condimentum congue. Sed non magna elit. Vivamus tincidunt nulla at ipsum laoreet dignissim. Vivamus pretium risus fringilla metus vulputate, eget rutrum nisl tempor. Etiam aliquam risus non laoreet laoreet. Cras pretium diam id felis rutrum pellentesque. Suspendisse blandit dictum massa. Praesent aliquam orci in ligula malesuada volutpat.</p>
		</div>
	</div>
	<div class="row mt50">
		<div class="col-md-6 col-xs-12 article-share">
			<h5 class="fw700">SHARE /</h5>
			<img src="{{asset('/img/f-icon.png')}}">
			<img src="{{asset('/img/t-icon.png')}}">
			<img src="{{asset('/img/g-plus-icon.png')}}">
			<img src="{{asset('/img/l-icon.png')}}">
		</div>
		<div class="col-md-6 col-xs-12 text-right">
			<h5 class="fw700">/ TAGS</h5>
		</div>
	</div>
	<div class="row mt mt50">
		<div class="col-xs-12">
			<div class="article-img panel-shadow">
				<img class="img-responsive" src="{{ asset('images/article-img-3.png')}}">
			</div>
		</div>
	</div>
	<div class="row mt50">
		<div class="col-xs-12">
			<h2 class="h-color fw700">Recent Comments</h2>
		</div>
	</div>
	<div class="row mt50">
		<div class="col-xs-1">
			<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
		</div>
		<div class="col-xs-11">
			<p class="text-uppercase fw700 fs16 mb0">ALEXA DOE</p>
			<p>June 3, 2018 - 13:15  <a>Reply</a></p>
			<p class="mt10">Ut consectetur tellus vel euismod vestibulum. Proin sit amet tincidunt mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi at viverra nisl, id pellentesque mauris. Etiam faucibus, lacus in efficitur tristique, risus neque fringilla augue, vel rutrum dolor dui et orci.</p>
		</div>
	</div>
	<div class="row mt20">
		<div class="col-xs-1">
			<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
		</div>
		<div class="col-xs-11">
			<p class="text-uppercase fw700 fs16 mb0">ALEXA DOE</p>
			<p>June 3, 2018 - 13:15  <a>Reply</a></p>
			<p class="mt10">Ut consectetur tellus vel euismod vestibulum. Proin sit amet tincidunt mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi at viverra nisl, id pellentesque mauris. Etiam faucibus, lacus in efficitur tristique, risus neque fringilla augue, vel rutrum dolor dui et orci.</p>
		</div>
	</div>
	<div class="row mt20">
		<div class="col-xs-1">
			<div class="rp-image"><img class="img-responsive" src="{{asset('images/rp-image-1.png')}}"></div>
		</div>
		<div class="col-xs-11">
			<p class="text-uppercase fw700 fs16 mb0">ALEXA DOE</p>
			<p>June 3, 2018 - 13:15  <a>Reply</a></p>
			<p class="mt10">Ut consectetur tellus vel euismod vestibulum. Proin sit amet tincidunt mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi at viverra nisl, id pellentesque mauris. Etiam faucibus, lacus in efficitur tristique, risus neque fringilla augue, vel rutrum dolor dui et orci.</p>
		</div>
	</div>
	<div class="row mt50">
		<div class="col-xs-12">
			<h2 class="h-color fw700">Leave a Comment</h2>
		</div>
	</div>
	<div class="row">
		<form class="comment-form">
			<div class="col-xs-12 mb20">
				<label>COMMENT</label>
				<textarea class="form-input" placeholder="Comment..."></textarea>
			</div>
			<div class="col-md-4 col-xs-12">
				<label>Name</label>
				<input type="text" name="name" class="form-input" placeholder="Name">
			</div>
			<div class="col-md-4 col-xs-12">
				<label>Email</label>
				<input type="email" name="email" class="form-input" placeholder="Email">
			</div>
			<div class="col-md-4 col-xs-12">
				<label>Website</label>
				<input type="text" name="website" class="form-input" placeholder="Website">
			</div>
			<div class="col-xs-12 mt20">
				<input type="submit" class="compose-btn btn-start form-btn" value="Post Comment">
			</div>
		</form>
	</div>
</div>

<div class="bg-grey-content">
	<div class="container">
		@include('frontend.includes.footer')
	</div>
</div>
@endsection
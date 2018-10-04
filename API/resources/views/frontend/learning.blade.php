@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Watch these videos to lern all what you need about how uniclix works.</h1>
		<a href="">LEARNING</a>
	</div>
</div>


<div class="container">
	<div class="row mt50">
		<div class="col-md-6 col-xs-12">
			<div class="video-panel">
				<img class="img-responsive" src="{{ asset('images/video-1.png')}}">
				<div class="play-icon">
					<img src="{{ asset('img/play-icon.png')}}">
				</div>
			</div>
		</div>
		<div class="col-md-6 col-xs-12 pt15p">
			<h2>Article Recommemandation</h2>
			<p>Learn why and how you can curate extremely relevant articles from across the web and schedule it.</p>
		</div>
	</div>

	<div class="row mt50">
		<div class="col-md-6 col-xs-12 pt15p">	
			<h2>Article Recommemandation</h2>
			<p>Learn why and how you can curate extremely relevant articles from across the web and schedule it.</p>		
		</div>
		<div class="col-md-6 col-xs-12">
			<div class="video-panel">
				<img class="img-responsive" src="{{ asset('images/video-2.png')}}">
				<div class="play-icon">
					<img src="{{ asset('img/play-icon.png')}}">
				</div>
			</div>
		</div>
	</div>

	<div class="row mt50">
		<div class="col-md-6 col-xs-12">
			<div class="video-panel">
				<img class="img-responsive" src="{{ asset('images/video-3.png')}}">
				<div class="play-icon">
					<img src="{{ asset('img/play-icon.png')}}">
				</div>
			</div>
		</div>
		<div class="col-md-6 col-xs-12 pt15p">
			<h2>Article Recommemandation</h2>
			<p>Learn why and how you can curate extremely relevant articles from across the web and schedule it.</p>
		</div>
	</div>

	<div class="row mt50 mb100">
		<div class="col-md-6 col-xs-12 pt15p">
			<h2>Article Recommemandation</h2>
			<p>Learn why and how you can curate extremely relevant articles from across the web and schedule it.</p>
		</div>
		<div class="col-md-6 col-xs-12">
			<div class="video-panel">
				<img class="img-responsive" src="{{ asset('images/video-4.png')}}">
				<div class="play-icon">
					<img src="{{ asset('img/play-icon.png')}}">
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
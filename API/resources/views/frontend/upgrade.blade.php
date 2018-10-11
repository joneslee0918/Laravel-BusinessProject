@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Get access to our Premium features</h1>
		<a href="">UPGRADE</a>
	</div>
</div>

<div class="bg-image-content">
	<div class="container">
		<div class="row p100">
			<div class="col-md-6 col-xs-12 pt150 tablet-responsive pb50">
				<h2 class="h-color fw700">Customize your best Time anytime</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris ante, vulputate et justo in, condimentum ornare metus.</p>
			</div>
			<div class="col-md-6 col-xs-12">
				<img class="img-responsive upgrade-img" src="{{asset('/images/calendar-img.png')}}">
			</div>
		</div>
		<div class="row p100">
			<div class="col-md-6 col-xs-12">
				<img class="img-responsive" src="{{asset('/images/laptop-img.png')}}">
			</div>
			<div class="col-md-6 col-xs-12 pt130 tablet-responsive">
				<h2 class="h-color fw700">Get Social analytics for your accounts</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris ante, vulputate et justo in, condimentum ornare metus.</p>
			</div>
		</div>
	</div>
</div>

<div class="bg-grey-content">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="bg-white-radius">
					<div class="row">
						<div class="col-md-6 col-xs-12">
							<h2 class="h-color fw700">Ready to get started?</h2>
							<p>Let's start by creating a new account.</p>
						</div>
						<div class="col-md-6 col-xs-12 text-right lh7">
							<a href="#" class="compose-btn btn-start">Create new account</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row mb30">
			<div class="col-md-4 col-xs-12">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris ante, vulputate et justo in, condimentum ornare metus.</p>
				<div class="ohidden">
					<div class="social-icons">
						<img src="{{ asset('/img/facebook.png') }}">
					</div>
					<div class="social-icons">
						<img src="{{ asset('/img/twitter.png') }}">
					</div>
					<div class="social-icons">
						<img src="{{ asset('/img/gplus.png') }}">
					</div>
					<div class="social-icons">
						<img src="{{ asset('/img/linkedin.png') }}">
					</div>
				</div>
				<div class="mt40">
					<p class="rights-reserved">© 2018 Crowdfire Inc. All rights reserved. Privacy & Terms</p>
				</div>				
			</div>
			<div class="col-md-4"></div>
			<div class="col-md-4 col-xs-12">
				<div class="row">
					<div class="col-md-6 col-xs-12">
						<h5>COMPANY</h5>
						<p><a href="#">The Team</a></p>
						<p><a href="#">About Us</a></p>
						<p><a href="#">Blog</a></p>
					</div>
					<div class="col-md-6 col-xs-12">
						<h5>RESOURCES</h5>
						<p><a href="#">Support</a></p>
						<p><a href="#">Contact</a></p>
						<p><a href="#">Terms of Service</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
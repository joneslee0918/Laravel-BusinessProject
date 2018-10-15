@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Watch these videos to lern all what you need about how uniclix works.</h1>
		<a href="">LEARNING</a>
	</div>
</div>

<div class="container mt100 mb100">
	<div class="row">
		<div class="col-md-2">
			<div class="plans-features">
				<ul class="plan-features-ul">
					<li>Social Profiles</li>
					<li>Scheduling</li>
					<li>Posts</li>
					<li>RSS Integration</li>
					<li>Twitter Growth</li>
					<li>Analytics</li>
					<li><p>Access to recommended</p></li>
				</ul>
			</div>
		</div>
		<div class="col-md-2">
			<h4 class="text-center trial-color">TRIAL</h4>
			<h2 class="text-center trial-color">FREE</h2>
			<div class="plan-content panel-shadow">
				<ul class="plan-ul">
					<li>1</li>
					<li>Normal</li>
					<li>10 per Account</li>
					<li>Basic</li>
					<li>Limited</li>
					<li>-</li>
					<li>-</li>
					<li><a href="#" class="gradient-border-btn">Buy</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-2">
			<h4 class="text-center basic-color">BASIC</h4>
			<h2 class="text-center basic-color">7.99$/mo</h2>
			<div class="plan-content panel-shadow">
				<ul class="plan-ul">
					<li>1</li>
					<li>Normal</li>
					<li>10 per Account</li>
					<li>Basic</li>
					<li>Limited</li>
					<li>-</li>
					<li>-</li>
					<li><a href="#" class="gradient-border-btn">Buy</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-2">
			<h4 class="text-center plus-color">PLUS</h4>
			<h2 class="text-center plus-color">13.99$/mo</h2>
			<div class="plan-content panel-shadow">
				<ul class="plan-ul">
					<li>1</li>
					<li>Normal</li>
					<li>10 per Account</li>
					<li>Basic</li>
					<li>Limited</li>
					<li>-</li>
					<li>-</li>
					<li><a href="#" class="gradient-border-btn">Buy</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-2">
			<h4 class="text-center premium-color">PREMIUM</h4>
			<h2 class="text-center premium-color">25.99$/mo</h2>
			<div class="plan-content panel-shadow">
				<ul class="plan-ul">
					<li>1</li>
					<li>Normal</li>
					<li>10 per Account</li>
					<li>Basic</li>
					<li>Limited</li>
					<li>-</li>
					<li>-</li>
					<li><a href="#" class="gradient-border-btn">Buy</a></li>
				</ul>
			</div>
		</div>
		<div class="col-md-2">
			<h4 class="text-center pro-color">PRO</h4>
			<h2 class="text-center pro-color ">39.99$/mo</h2>
			<div class="plan-content panel-shadow">
				<ul class="plan-ul">
					<li>1</li>
					<li>Normal</li>
					<li>10 per Account</li>
					<li>Basic</li>
					<li>Limited</li>
					<li>-</li>
					<li>-</li>
					<li><a href="#" class="gradient-border-btn">Buy</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="bg-white-radius panel-shadow">
		<div class="col-md-6 col-xs-12">
			<h2 class="theme-color">ENTERPRISE</h2>
			<p>Custom Solution - Contact for Pricing</p>
		</div>
		<div class="col-md-6 col-xs-12 text-right lh7">
			<a href="#" class="compose-btn btn-start">Buy Now</a>
		</div>
	</div>
</div>

<div class="bg-grey-content">
	<div class="container">
		@include('frontend.includes.footer')
	</div>
</div>

@endsection
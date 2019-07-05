@extends('layouts.homepage')

@section('content')

@include('frontend.includes.projects_menu')

<div class="product-pages">
    <div class="tg-first-section">
        <div class="container">
            <div class="row standard-padding text-center">
                <div class="col-xs-12">
                    <h2>Grow your Twitter audience and expand your Influence</h2>
                    <p>Grow your community on Twitter by targeting the right audience. Think of our Booster tool as a matchmaker that connects you with people most interested in what you have to offer.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row standard-padding">
            <div class="col-md-6 col-xs-12">
                <h2>Follow relevant users only</h2>
                <p>Find users by interest, hashtags, location, and channels. Just set your target and we will find you most relevant active users to follow.</p>
            </div>
            <div class="col-md-6 col-xs-12">
                <img class="img-responsive" src="{{asset('/images/tg-image-2.png')}}">
            </div>
        </div>

        <div class="row standard-padding">
            <div class="col-md-6 col-xs-12">
                <img class="img-responsive" src="{{asset('/images/tg-image-3.png')}}">
            </div>
            <div class="col-md-6 col-xs-12">
                <h2>Unfollow Inactive users</h2>
                <p>Find inactive or non-engaging users that you follow. With few clix a day clear your follow list and get rid of spammers.</p>
            </div>
        </div>

        <div class="row standard-padding">
            <div class="col-md-6 col-xs-12">
                <h2>Unfollow undesirable users</h2>
                <p>Track engagement for all of your individual post in one platform.</p>
            </div>
            <div class="col-md-6 col-xs-12">
                <img class="img-responsive" src="{{asset('/images/tg-image-4.png')}}">
            </div>
        </div>
    </div>

    <div class="home-gradient-bg">
        <div class="container">
            <div class="row mt30 mb30">
                <div class="col-xs-12 text-center">
                    <h2>SignUp and see the difference.</h2>
                    <a href="#" class="signin-btn">Get Started</a>
                </div>
            </div>
        </div>
    </div>


    <div class="container standard-padding">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2>Learn more about other Uniclix products</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt iaculis nisi, at interdum urna interdum bibendum. Curabitur ut sodales nibh, vestibulum auctor tellus.</p>
                <div class="row">
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Publisher</h5>
                            <p>Craft the perfect post for each social network, all in few click</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Content Curation</h5>
                            <p>Simplify Your Social Content Curation</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Social Listening</h5>
                            <p>Simplify Your Social Content Curation</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Analytics</h5>
                            <p>A simpler way to measure performance</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@include('frontend.includes.footer')

@endsection

@extends('layouts.homepage')

@section('content')

@include('frontend.includes.projects_menu')

<div class="product-pages">
    <div class="tg-first-section">
        <div class="container">
            <div class="row standard-padding text-center">
                <div class="col-xs-12">
                    <h2>Get Uniclix Twitter Unfollow Tool</h2>
                    <p>Join other influencers and small businesses who trust our easy to use Twitter Unfollow tool to unfollow inactive users, egg profiles, unwanted avatars and undesirable users.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row standard-padding">
            <div class="col-md-6 col-xs-12">
                <h2>Find inactive  and undesirable users & unfollowers</h2>
                <p>Quickly and easily find users you currently follow and find who to unfollow.</p>
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
                <h2>Quickly, unfollow them</h2>
                <p>Uniclix enables you to unfollow unwanted users fast.</p>
            </div>
        </div>

        <div class="row standard-padding">
            <div class="col-md-6 col-xs-12">
                <h2>Stay within limits</h2>
                <p>Twitter has limits on following users, Hence use Uniclix to stay within those limits by unfollowing extra followers that are inactive.</p>
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
                    <h2>Try Uniclix and see the difference.</h2>
                    <a href="{{config('frontendclient.client_url')}}" class="signin-btn">Get Started</a>
                </div>
            </div>
        </div>
    </div>


    <div class="container standard-padding">
        <div class="row">
            <div class="col-xs-12 text-center">
                <h2>Learn more about other Uniclix products</h2>
                <div class="row">
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Publisher</h5>
                            <p>Craft the perfect post for each social network</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Content Curation</h5>
                            <p>Simplify your social content curation</p>
                            <a href="#">Learn more</a>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12">
                        <div class="card panel-shadow mt50">
                            <h5>Social Listening</h5>
                            <p>Simplify your social content curation</p>
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

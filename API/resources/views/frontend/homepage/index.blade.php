@extends('layouts.homepage')

@push('styles')
    <link href="{{ asset('css/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('css/slick-theme.css') }}" rel="stylesheet">
@endpush

@section('content')
<div id="home-banner">
    <div class="container">
        <div class="row pb50">           
            <div class="col-md-7 col-xs-12 pb50">
                <img src="{{ asset('images/imac.png') }}" class="img-responsive laptop-img">
            </div>
            <div class="col-md-5 col-xs-12 pb50">
                <h1>Social Media Management<br>Simplified</h1>
                <p class="mt20">Uniclix helps you centralize, manage and grow your social media accounts with just a couple of clicks.</p>
                <a class="btn theme-btn mt30" href="{{config('frontendclient.client_url')}}" target="_blank">Get Started Now </a>
                <!-- <a href="/pricing" class="btn theme-btn mt30">Learn more</a> -->
            </div>
        </div>
    </div>
</div>
<div class="home-section-1 mtb100">
    <div class="container">
        <div class="row text-center">
            <div class="col-xs-12">
                <h3 class="light-heading">The most affordable and simple to use social media management platform</h3>
                <!-- <h2>Optimize your Social Media Accounts</h2>
                <p>The most affordable & easy to use platform for managing all things Social. Uniclix connects you with real people that care about your product. Publish content from your sites and schedule your posts in advance with Uniclix.</p> -->
            </div>
            <!-- <div class="col-xs-12 pt50 pb50 border-bottom-grey">
                <img src="{{ asset('images/home-img-1.png') }}" class="img-responsive center-img">
            </div> -->
        </div>
        <div class="row home-features mt100">
            <div class="col-md-3 col-xs-12">
                <div class="col-md-12 text-center intro-box intro-box">
                    <div class="profile-box schedule-bg">
                        <img src="{{ asset('images/calendar.svg') }}">
                    </div>
                    <div class="text-content">
                        <h4>Scheduled posts</h4>
                        <p class="question">How do I post to all of my SM channels at once? What is the best time to post to reach the most customers?</p>

                        <div class="seperator"></div>

                        <p class="answer">Uniclix enables users to schedule and publish posts for multiple social media channels with just a couple of clicks. 
                            Uniclix also helps users determine best times to post to reach maximum engagement.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-xs-12">
                <div class="col-md-12 text-center intro-box">
                    <div class="profile-box search-bg">
                        <img src="{{ asset('images/search.svg') }}">
                    </div>
                     <div class="text-content">
                        <h4>Auto-curated content</h4>
                        <p class="question">How do I find content to share with my audience without spending hours digging on the internet?</p>

                        <div class="seperator"></div>
                        
                        <p class="answer">Uniclix helps users to find and share content on the fly. 
                            Uniclix allows users to set topics of interest and auto-suggests relevant articles so they don’t have to spend hours searching on the internet.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-xs-12">
                <div class="text-center intro-box">
                    <div class="profile-box target-bg">
                        <img src="{{ asset('images/target.svg') }}">
                    </div>
                    <div class="text-content">
                        <h4>Twitter Boost</h4>
                        <p class="question">How do I find people who are interested in my channel? How do I increase my followers on Twitter?</p>

                        <div class="seperator"></div>
                        
                        <p class="answer">Grow your community on Twitter by targeting the right audience. Uniclix Booster tool acts as a matchmaker that connects you with the people most interested in what you have to offer.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-xs-12">
                <div class="text-center intro-box">
                    <div class="profile-box hashtag-bg">
                        <img src="{{ asset('images/hashtag.svg') }}">
                    </div>
                    <div class="text-content">
                        <h4>Social listening</h4>
                        <p class="question">How do I monitor what people are saying about me? How do I monitor what people are saying about the topics I’m interested in?</p>

                        <div class="seperator"></div>
                        
                        <p class="answer">Uniclix generates custom streams to help users monitor what others are saying about them and topics of interest. Uniclix also helps users to easily react to conversations and increase engagement.</p>
                    </div>
                </div>  
            </div>

        </div>
    </div>
</div>
<div class="row post-crafting intro-section">
    <div class="container">
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12 text-content">
                <p class="title-description">PUBLISHING</p>

                <h3>Craft the perfect post for each social network, all in few clix</h3>

                <h5>Keep your social presence active</h5> 
                
                <p class="description">Publish & schedule posts for multiple social media networks & accounts with a couple of clicks. 
                
                Uniclix helps you determine the best times to post to reach maximum engagement.</p>
            </div>
        </div>
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12">
                <img src="{{asset('images/post_crafting.png')}}" />
            </div>
        </div>
    </div>
</div>

<div class="row collaborate-section intro-section">
    <div class="container">
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12">
                <img src="{{asset('images/collaborate_with_team.png')}}" />
            </div>
        </div>
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12"> 
                <p class="title-description">Collaboration</p>

                <h3>Collaborate on content with your team</h3>

                <p class="description">Work together with your team to create content that’s high quality, on-brand, and that your audience is going to love.</p>
                
                <div class="col-md-12 pl-none">
                    <div class="col-md-6 col-xs-12 pl-none">
                        <div class="draft-section">
                            <img src="{{asset('images/plan.svg')}}" />
                            <h5>Draft posts</h5>
                            <p class="description">
                                Create drafts, get feedback, and refine content as a team 
                            </p>
                        </div>
                    </div>

                    <div class="col-md-6 col-xs-12 pl-none">
                        <div class="draft-section">
                            <img src="{{asset('images/shield.svg')}}" />
                            <h5>Approvals</h5>
                            <p class="description">
                                Review posts for quality and brand before hitting publish
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 pl-none">
                    <div class="col-md-6 col-xs-12 pl-none">
                        <div class="draft-section">
                            <img src="{{asset('images/sync.svg')}}" />
                            <h5>Stay in sync </h5>
                            <p class="description">
                                Everyone’s posts will be shared within your preset schedule 
                            </p>
                        </div>
                    </div>

                    <div class="col-md-6 col-xs-12 pl-none">
                        <div class="draft-section">
                            <img src="{{asset('images/setup.svg')}}" />
                            <h5>Account management </h5>
                            <p class="description">
                                Easily share and manage access to each social account 
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>

<div class="row join-business intro-section">
    <div class="container">
        <h3>Join small and large business that use Uniclix to build their brands</h3>
        <a href="https://web.uniclix.test" class="btn signin-btn get-started-btn">Get Started Now</a>
    </div>
</div>

<div class="row simplify-social intro-section">
    <div class="container">
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12 text-content">
                <p class="title-description">Content Curation</p>

                <h3>Simplify Your Social Content Curation</h3>
                
                <p class="description">Find & share content on the fly. 
                    Uniclix auto-suggests content relevant to your 
                    topics of interest so that you don’t have to spend hours searching on the internet.</p>
            </div>
        </div>
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12">
                <img src="{{asset('images/simplify_your_social.png')}}" />
            </div>
        </div>
    </div>
</div>

<div class="row post-crafting people-talking intro-section">
    <div class="container">        
        
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12">
                <img src="{{asset('images/people_talking.png')}}" />
            </div>
        </div>
        <div class="col-md-6 col-xs-12">
            <div class="col-md-12 text-content">
                <p class="title-description">Monitor</p>

                <h3>People are talking, make sure your listening.</h3>

                <p class="description">A great way to manage mentions and Monitor keywords and hashtags</p>

                <h5>Create custom social streams</h5>
                
                <p class="description" >Setup and track custom streams of social content ,all organized by tabs so you can monitor them by category.
                    Respond & comment directly on the content of your interest from the streams.</p>
            </div>
        </div>

    </div>
</div>

<div class="row learn-more intro-section">
    <div class="container">
        <h3>Learn more about our Twitter Booster tool</h3>   
        <p class="description">Grow your community on Twitter by targeting the right audience. 
            Think of our Booster tool as a matchmaker that connects you with people most interested in what you have to offer.</p>
        <a href="{{route('products.twitter_growth')}}" class="btn signin-btn learn-more-btn">Learn more</a>
    </div>
</div>

@include('frontend.includes.readytostart')
@include('frontend.includes.footer')
@endsection

@push('scripts')
<script src="{{ asset('js/slick.min.js') }}"></script>
<script type="text/javascript">
    $('.more-features-pics .single-item').slick({
        arrows: false,
        dots: true,
    });

    $('.testimonials-pics .single-item').slick({
        arrows: false,
        dots: true,
    });
</script>
@endpush

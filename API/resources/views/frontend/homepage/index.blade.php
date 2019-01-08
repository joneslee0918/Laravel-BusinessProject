@extends('layouts.homepage')

@push('styles')
    <link href="{{ asset('css/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('css/slick-theme.css') }}" rel="stylesheet">
@endpush

@section('content')
<div id="home-banner">
    <div class="container">
        <div class="row pb50">
            <div class="col-md-5 col-xs-12 pb50">
                <h1>Social Media Management<br>Simplified</h1>
                <p class="mt20">Uniclix helps you centralize, manage and grow your social media accounts with just a couple of clicks.</p>
                <h3 style="color:white;">Start at only $7.99</h3>
                <a href="#" class="btn theme-btn mt30">Learn more</a>
            </div>
            <div class="col-md-7 col-xs-12 pb50">
                <img src="{{ asset('images/laptop.png') }}" class="img-responsive laptop-img">
            </div>
        </div>
    </div>
</div>
<div class="home-section-1 mt50 mb50">
    <div class="container">
        <div class="row text-center">
            <div class="col-xs-12">
                <h3>The most affordable and simple to use social media management platform</h3>
                <!-- <h2>Optimize your Social Media Accounts</h2>
                <p>The most affordable & easy to use platform for managing all things Social. Uniclix connects you with real people that care about your product. Publish content from your sites and schedule your posts in advance with Uniclix.</p> -->
            </div>
            <!-- <div class="col-xs-12 pt50 pb50 border-bottom-grey">
                <img src="{{ asset('images/home-img-1.png') }}" class="img-responsive center-img">
            </div> -->
        </div>
        <div class="row home-features mt50">
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-1.png') }}">
                </div>                
                <h6>Scheduled posts</h6>
                <p>Publish & schedule posts for multiple social media networks & accounts with a couple of clicks. 
Uniclix helps you determine best times to post to reach maximum engagement.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-2.png') }}">
                </div>
                <h6>Auto-curated content</h6>
                <p>Find & share content on the fly.
Uniclix auto-suggests content relevant to your topics of interest so that you don’t have to spend hours searching on the internet.
</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-3.png') }}">
                </div>
                <h6>Audience Booster (Twitter only)</h6>
                <p>Grow your community on Twitter by targeting the right audience. Think of our Booster tool as a matchmaker that connects you with people most interested in what you have to offer.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-4.png') }}">
                </div>
                <h6>Packages starting at just $7.99</h6>
                <p>Take advantage of our First 5k launch campaign.
In order to build a global Uniclix community we are offering our services at unbeatable prices to the <strong>first five thousand</strong> subscribers who will maintain a lifetime membership at introductory prices. We offer multiple plans so that you only pay for the services you need.</p>
            </div>
        </div>
    </div>
</div>
<div class="home-section-2 pt200 pb200">
    <div class="container">
        <div class="more-features-pics">
            <img src="{{ asset('images/quotes.png') }}" class="quotes-img">
            <div class="slider single-item">
                <div class="text-center single-item-content">
                    <p>Nullam imperdiet dui et ligula ultrices, id dictum velit consequat. Maecenas venenatis vel lorem vitae cursus.</p>
                    <div class="testimonial-author">Iana Green, New York</div>
                </div>
                <div class="text-center single-item-content">
                    <p>Nullam imperdiet dui et ligula ultrices, id dictum velit consequat. Maecenas venenatis vel lorem vitae cursus.</p>
                    <div class="testimonial-author">Iana Green, New York</div>
                </div>

                <div class="text-center single-item-content">
                    <p>Nullam imperdiet dui et ligula ultrices, id dictum velit consequat. Maecenas venenatis vel lorem vitae cursus.</p>
                    <div class="testimonial-author">Iana Green, New York</div>
                </div>
            </div>
        </div>
    </div>
</div>
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
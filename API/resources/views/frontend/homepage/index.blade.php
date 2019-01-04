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
                <h1>Social Media Management,<br>Simplified</h1>
                <p class="mt20">With a single platform, Uniclix helps you build a community of followers & and centralize your social activities, automate your post with couple of clix.</p>
                <a href="#" class="btn theme-btn mt30">Get Started</a>
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
                <h2>Optimize your Social Media Accounts</h2>
                <p>The most affordable & easy to use platform for managing all things Social. Uniclix connects you with real people that care about your product. Publish content from your sites and schedule your posts in advance with Uniclix.</p>
            </div>
            <div class="col-xs-12 pt50 pb50 border-bottom-grey">
                <img src="{{ asset('images/home-img-1.png') }}" class="img-responsive center-img">
            </div>
        </div>
        <div class="row home-features mt50">
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-1.png') }}">
                </div>                
                <h6>Automatically Schedule posts</h6>
                <p>Publish content and schedule your post in advance with uniclix.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-2.png') }}">
                </div>
                <h6>Discover new content and articles</h6>
                <p>Create search streams based on keywords to find curated content that you can share on the fly.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-3.png') }}">
                </div>
                <h6>Hack your Twitter!</h6>
                <p>Build community of followers with targeted audience. Think of us as a matchmaker that connects you with people most interested in what you have to offer.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-4.png') }}">
                </div>
                <h6>Manage Multiple Accounts</h6>
                <p>Manage more than one account in one centralized platform, we support Twitter, Facebook, Linkedin and Pinterest.</p>
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
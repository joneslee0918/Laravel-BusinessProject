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
                <h1>Social Media,<br>Simplified</h1>
                <p class="mt20">Nulla imperdiet imperdiet tempus. Cras consectetur odio et velit auctor, nec pretium mauris varius.</p>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris ante, vulputate et justo in, condimentum ornare metus.</p>
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
                <h6>Schedule posts and articles</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-2.png') }}">
                </div>
                <h6>Share articles based on topics</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-3.png') }}">
                </div>
                <h6>Add targets on Twitter</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div class="col-md-3 col-xs-12 text-center">
                <div class="feature-img">
                    <img src="{{ asset('images/feature-img-4.png') }}">
                </div>
                <h6>Easily switch accounts</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
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
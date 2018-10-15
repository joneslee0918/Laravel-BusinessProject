@extends('layouts.homepage')

@push('styles')
    <link href="{{ asset('css/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('css/slick-theme.css') }}" rel="stylesheet">
@endpush

<div id="top-image"><img  class="img-responsive" src="{{ asset('images/top-office.png') }}" /></div>
@section('content')
    <div class="container">
        <div class="row justify-content-center" id="get-started-wrapper">
            <div class="col-md-5 get-started">
                <h2>Social Media <br /> Simplified</h2>
                <p>Hack your Twitter! Build a community of followers & automate your posts with a couple of clix.</p>
                <a href="#" class="compose-btn btn-start">Get Started</a>
            </div>

            <div class="col-md-7">
                <a href="#" class="play-btn"><i class="fa fa-play"></i></a>
            </div>
        </div>

        <div class="row justify-content-center" id="features-wrapper">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-7">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card-box card-box-1">
                                    <div class="card-header">
                                        <span class="twitter-part"><i class="fa fa-twitter"></i> Twitter</span>
                                        <span class="count-part"><i class="fa fa-user"></i> 12M+</span>
                                        <span class="setting-part"><button class="outline-btn"><i class="fa fa-cog"></i> Settings</button></span>
                                    </div>

                                    <div class="line"></div>

                                    <div class="card-body">
                                        <div class="card-avatar clearfix">
                                            <figure class="pull-left">
                                                <a href="#"><img src="{{ asset('images/avatar.jpg') }}" alt=""></a>
                                            </figure>

                                            <span class="card-avatar-desc">
                                                ANGELA LEE <br />
                                                <small>@angelalee</small>
                                            </span>

                                            <span class="pull-right avatar-status">
                                                <i class="fa fa-circle"></i> Connected
                                            </span>
                                        </div>
                                    </div>

                                    <div class="line"></div>

                                    <div class="card-bottom">
                                        <span><button class="outline-btn"><i class="fa fa-plus"></i> More</button></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card-box card-box-2">
                                    <div class="card-header">
                                        <p>Let's grow your audience using Twitter.</p>
                                    </div>

                                    <div class="line"></div>

                                    <div class="card-body">
                                        <div class="card-avatar clearfix">
                                            <figure class="pull-left">
                                                <a href="#"><img src="{{ asset('images/avatar.jpg') }}" alt=""></a>
                                            </figure>

                                            <span class="card-avatar-desc">
                                                ANGELA LEE <br />
                                                <small>@angelalee</small>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="line"></div>

                                    <div class="card-bottom">
                                        <p>A few things we will do: </p>
                                        <p>Tweet out smartly curated content everyday to keep your followers engaged.</p>
                                        <p>Automatically post tweets at the best time, and get more engagement on each. </p>
                                        <p><strong>Coming soon!</strong></p>
                                        <p>Track clicks, likes, shares and retweets for everything we post.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card-box card-box-3">
                                    <div class="card-header">
                                        <h4>Authorize Uniclix - Go big to use your account?</h4>
                                    </div>

                                    <div class="line"></div>

                                    <div class="card-body">
                                        <div class="card-avatar clearfix">
                                            <figure>
                                                <a href="#"><img src="{{ asset('images/authorize.jpg') }}" alt=""></a>
                                            </figure>
                                        </div>
                                    </div>
                                    <div class="card-bottom">

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card-box card-box-4">
                                    <div class="card-header">
                                        <span class="count-part"><i class="fa fa-user"></i> 9M+</span>
                                    </div>


                                    <div class="card-body">
                                        <div class="card-avatar text-center">
                                            <i class="fa fa-twitter"></i>
                                            <p>Twitter</p>
                                        </div>
                                    </div>


                                    <div class="card-bottom">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5" id="features-right-text">
                        <h3>Grow your followers</h3>
                        <p>Uniclix connects you with real people that care about your product. Learn more.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-12" id="features-publishing">
                <div class="row">
                    <div class="col-md-6 feature-publish-text">
                        <h3>Manage your posts</h3>
                        <p>Publish content from your sites and schedule your posts in advance with Uniclix. Learn more.</p>
                        <br />
                        <a href="#" class="compose-btn btn-start">How it works?</a>
                    </div>
                    <div class="col-md-6 feature-publish-img">
                        <figure>
                            <a href="#">
                                <img src="{{ asset('images/publish.jpg') }}" alt="" class="img-responsive">
                            </a>
                        </figure>
                    </div>
                </div>
            </div>

            <div class="col-md-12" id="features-schedule">
                <div class="row">
                    <div class="col-md-6 feature-publish-img">
                        <figure>
                            <a href="#">
                                <img src="{{ asset('images/schedule.png') }}" alt="" class="img-responsive">
                            </a>
                        </figure>
                    </div>

                    <div class="col-md-6 feature-publish-text">
                        <h3>Save money & time</h3>
                        <p>Uniclix offers the most affordable packages in the industry suitable for small businesses and individuals.Take advantage of the introductory offer click here to learn more.</p>
                        <br />
                        <a href="#" class="compose-btn btn-start">How it works?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="more-features">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3 text-center">
                    <div class="more-features-text">
                        <h3>More amazing features...</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias amet blanditiis consequuntur deleniti.</p>
                    </div>

                    <div class="more-features-pics">
                        <div class="slider single-item">
                            <div class="text-center">
                                <h4>1. Schedule posts to go out multiple times</h4>
                                <img src="{{ asset('images/more-features/01.png') }}" alt="" class="img-responsive single-item-img">
                                <div class="single-item-bottom">
                                    <a href="#" class="compose-btn btn-start">Post at best time?</a>
                                </div>
                            </div>
                            <div class="text-center">
                                <h4>2. Access your account and manage your targets</h4>
                                <img src="{{ asset('images/more-features/01.png') }}" alt="" class="img-responsive single-item-img">
                                <div class="single-item-bottom">
                                    <a href="#" class="compose-btn btn-start">Control your account</a>
                                </div>
                            </div>

                            <div class="text-center">
                                <h4>3. Sit and let us do the work behind the scenes</h4>
                                <img src="{{ asset('images/more-features/01.png') }}" alt="" class="img-responsive single-item-img">
                                <div class="single-item-bottom">
                                    <a href="#" class="compose-btn btn-start">Enjoy the growth</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="testimonials-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-md-offset-3 text-center">
                    <div class="testimonials-pics">
                        <div class="slider single-item">
                            <div class="text-center">
                                <img src="{{ asset('images/testimonials/01.png') }}" alt="" class="img-responsive single-item-img">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque dolor doloremque doloribus, ducimus, eaque facilis fuga id iure minima necessitatibus nisi nulla numquam obcaecati odio officia quasi qui quia.</p>
                                <small>Ana Green, New York</small>
                            </div>
                            <div class="text-center">
                                <img src="{{ asset('images/testimonials/01.png') }}" alt="" class="img-responsive single-item-img">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque dolor doloremque doloribus, ducimus, eaque facilis fuga id iure minima necessitatibus nisi nulla numquam obcaecati odio officia quasi qui quia.</p>
                                <small>Natalie Green, Denver</small>
                            </div>

                            <div class="text-center">
                                <img src="{{ asset('images/testimonials/01.png') }}" alt="" class="img-responsive single-item-img">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque dolor doloremque doloribus, ducimus, eaque facilis fuga id iure minima necessitatibus nisi nulla numquam obcaecati odio officia quasi qui quia.</p>
                                <small>Eva Green, LA</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-grey-content">
        <div class="container">
            <div class="row">
                <div class="bg-white-radius">
                    <div class="col-md-6 col-xs-12">
                        <h2>Ready to get started?</h2>
                        <p>Let's start by creating a new account.</p>
                    </div>
                    <div class="col-md-6 col-xs-12 text-right lh7">
                        <a href="#" class="compose-btn btn-start">Create new account</a>
                    </div>
                </div>
            </div>
            @include('frontend.includes.footer')
        </div>
    </div>

<!--     <div class="footer-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="footer-get-started">
                        <div class="row">
                            <div class="col-md-9">
                                <h3>Ready to get started?</h3>
                                <p>Let start by creating an account.</p>
                            </div>
                            <div class="col-md-3 footer-start-btn">
                                <a href="#" class="compose-btn btn-start">Create new account</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 footer-info">
                    <div class="row">
                        <div class="col-md-8">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae eveniet facere inventore modi numquam quaerat quibusdam quis tenetur! Aut corporis error esse laudantium omnis sapiente soluta ullam, unde voluptates.</p>
                            <ul class="list-inline footer-social">
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                        <div class="col-md-2">
                            <h5><strong>Company</strong></h5>
                            <ul class="list-unstyled">
                                <li>The Team</li>
                                <li>About Us</li>
                                <li>Blog</li>
                            </ul>
                        </div>
                        <div class="col-md-2">
                            <h5><strong>Resources</strong></h5>
                            <ul class="list-unstyled">
                                <li>Support</li>
                                <li>Contact</li>
                                <li>Terms of Service</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 footer-copyright">
                    <p>&copy; Uniclix LLC. All rights reserved. Privacy & Terms</p>
                </div>
            </div>
        </div>
    </div> -->
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
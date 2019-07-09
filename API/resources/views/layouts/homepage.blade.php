<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">
    <title>Uniclix</title>

    <!-- Scripts -->
    <script type="text/javascript" src="{{asset('js/jquery.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap/bootstrap.min.js')}}"></script>
    <!-- Fonts -->

    <!-- Styles -->
    <link href="/favicon.ico" rel="favicon" type="image/ico">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
    <link href="{{asset('font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/bootstrap/bootstrap.min.css') }}" rel="stylesheet">
    @stack('styles')
    <link href="{{ asset('css/frontend.css') }}" rel="stylesheet">
    <link href="{{ asset('css/projects.css') }}" rel="stylesheet">
    <link href="{{ asset('css/helper.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139556974-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-139556974-1');
    </script>


    </head>
</head>
<body>
<!-- <div id="top-image"><img  class="img-responsive" src="{{ asset('images/top-office.png') }}" /></div> -->
<div class="full-height">
    <header id="header-wrap">
        <div class="navbar navbar-default {{--navbar-fixed-top --}} menu-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="{{ route('homepage.index') }}" class="navbar-brand text-center">
                        <img class="img-responsive" id="logo-img" src="{{ asset('images/logo.png') }}" alt="uniclix">
                        <!-- <span class="logo-text">uniclix</span> -->
                    </a>
                </div>
                <div class="navbar-collapse collapse">
                    <a href="{{config('frontendclient.client_url')}}" class="btn pull-right signin-btn">Sign in</a>
                    <nav>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="{{ Request::is('/') ? 'active' : ''}}"><a href="/">Home</a></li>
                            <!-- <li class="{{ Request::is('upgrade') ? 'active' : ''}}"><a class="page-scroll" href="{{ route('upgrade') }}">Upgrade</a></li> -->
                            <!-- <li class="{{ Request::is('education') ? 'active' : ''}}"><a class="page-scroll" href="{{ route('education') }}">How it works</a></li>
                            <li class="{{ Request::is('pricing') ? 'active' : ''}}"><a class="page-scroll" href="{{ route('pricing') }}">Pricing</a></li> -->
                            <li class="{{ Request::is('blog') ? 'active' : ''}}"><a class="page-scroll" href="https://blog.uniclixapp.com">Blog</a></li>
                            <li class="{{ Request::is('products') ? 'active' : ''}}"><a class="page-scroll" href="{{ route('products.publisher')}}">Products</a></li>
                            <li class="{{ Request::is('blog') ? 'active' : ''}}"><a class="page-scroll" href="/jobs">Jobs</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    <div class="content">
        @yield('content')
    </div>
</div>
@stack('scripts')
</body>
</html>

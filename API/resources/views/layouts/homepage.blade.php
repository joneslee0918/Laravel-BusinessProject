<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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
    <link href="{{ asset('css/helper.css') }}" rel="stylesheet">
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
                        <img class="img-responsive" id="logo-img" src="{{ asset('images/uniclix.png') }}" alt="uniclix">
                        <span class="logo-text">uniclix</span>
                    </a>
                </div>
                <div class="navbar-collapse collapse">
                    <a href="{{config('frontendclient.client_url')}}" class="btn pull-right visible-lg signin-btn">Sign in</a>
                    <nav>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a class="page-scroll" href="{{ route('upgrade') }}">Upgrade</a></li>
                            <li><a class="page-scroll" href="{{ route('learning') }}">Learning</a></li>
                            <li><a class="page-scroll" href="{{ route('pricing') }}">Pricing</a></li>
                            <li><a class="page-scroll" href="{{ route('blog') }}">Blog</a></li>
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

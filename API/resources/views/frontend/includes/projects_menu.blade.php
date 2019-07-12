<div id="page-banner">
</div>
<div class="projects-menu">
    <div class="container">
        <div class="projects-menu-container">
            <ul class="nav navbar-nav projects_menu">
                <li class="{{ Request::is('social-media-calendar') ? 'active' : ''}}"><a href="{{ route('products.publisher') }}">Publisher</a></li>
                <li class="{{ Request::is('content-curation-tool') ? 'active' : ''}}"><a href="{{ route('products.content_curation') }}">Content Curation</a></li>
                <li class="{{ Request::is('social-listening-tool') ? 'active' : ''}}"><a href="{{ route('products.social_listening') }}">Social Listening</a></li>
                <li class="{{ Request::is('social-media-analytics') ? 'active' : ''}}"><a href="{{ route('products.analytics') }}">Analytics</a></li>
                <li class="{{ Request::is('twitter-followers-app') ? 'active' : ''}}"><a href="{{ route('products.twitter_growth') }}">Twitter Booster</a></li>
            </ul>
        </div>
    </div>
</div>

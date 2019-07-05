<div id="page-banner">
</div>
<div class="projects-menu">
    <div class="container">
        <div class="projects-menu-container">
            <ul class="nav navbar-nav projects_menu">
                <li class="{{ Request::is('products/publisher') ? 'active' : ''}}"><a href="{{ route('products.publisher') }}">Publisher</a></li>
                <li class="{{ Request::is('products/content_curation') ? 'active' : ''}}"><a href="{{ route('products.content_curation') }}">Content Curation</a></li>
                <li class="{{ Request::is('products/social_listening') ? 'active' : ''}}"><a href="{{ route('products.social_listening') }}">Social Listening</a></li>
                <li class="{{ Request::is('products/analytics') ? 'active' : ''}}"><a href="{{ route('products.analytics') }}">Analytics</a></li>
            </ul>
        </div>
    </div>
</div>

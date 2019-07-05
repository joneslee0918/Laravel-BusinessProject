@extends('layouts.homepage')

@section('content')

@include('frontend.includes.projects_menu')

<div class="product-pages">
    <div class="p-first-section">
        <div class="container">
            <div class="row standard-padding">
                <div class="col-md-7 col-xs-12">
                    <h1 class="mb30">Craft the perfect post for each social network, all in few clix</h1>
                    <a href="https://web.uniclix.test" class="btn theme-btn fw700">Get started now</a>
                </div>
                <div class="col-md-5 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/publisher-img-1.svg')}}">
                </div>
            </div>

            <div class="row standard-padding text-center">
                <div class="col-xs-12">
                    <h2>Keep your social presence active</h2>
                    <p class="p-container mb50">Publish & schedule posts for multiple social media networks & accounts with a couple of clicks. Uniclix helps you determine the best times to post to reach maximum engagement.</p>
                    <img class="img-responsive" src="{{asset('/images/publisher-img-2.svg')}}">
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-6 col-md-push-6">
                    <h2>Auto Scheduling</h2>
                    <p>Keep your social presence active 24/7 by automatically scheduling a post for all of your social accounts at once with unified Clix, and UniClix will publish them automatically for you.</p>
                </div>
                <div class="col-md-6 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/pr-schedule.png')}}">
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-6 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/account.png')}}">
                </div>
                <div class="col-md-6 col-xs-12">
                    <h2>Publish in all Social Media Accounts</h2>
                    <p>Schedule and publish content to Twitter, Facebook Pages and Groups, LinkedIn from one place with UniClix.</p>
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-6 col-xs-12">
                    <h2>Tailored Posts</h2>
                    <p>Tailor each post for each social network and preview the posts before publishing.</p>
                </div>
                <div class="col-md-6 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/pr-tailored-posts.png')}}">
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-6 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/pr-compose-calendar.png')}}">
                </div>
                <div class="col-md-6 col-xs-12">
                    <h2>Optimal Send Times</h2>
                    <p>Customize the best time to post and maximize the engagement with the recommended time for each account.</p>
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-6 col-xs-12">
                    <h2>Collaborate on content with your team</h2>
                    <p>Work together with your team to create content that’s high quality, on-brand, and that your audience is going to love.</p>
                </div>
                <div class="col-md-6 col-xs-12">
                    <img class="img-responsive" src="{{asset('/images/pr-dashboard.png')}}">
                </div>
            </div>

            <div class="row standard-padding">
                <div class="col-md-3 col-xs-12">
                    <img class="img-responsive margin-center" src="{{asset('/images/pr-draft-img.svg')}}">
                    <div class="subtitle">Draft posts</div>
                    <p>Create drafts, get feedback, and refine content as a team</p>
                </div>
                <div class="col-md-3 col-xs-12">
                    <img class="img-responsive margin-center" src="{{asset('/images/pr-approvals-img.svg')}}">
                    <div class="subtitle">Approvals</div>
                    <p>Review posts for quality and brand before hitting publish</p>
                </div>
                <div class="col-md-3 col-xs-12">
                    <img class="img-responsive margin-center" src="{{asset('/images/pr-sync-img.svg')}}">
                    <div class="subtitle">Stay in sync</div>
                    <p>Everyone’s posts will be shared within your preset schedule</p>
                </div>
                <div class="col-md-3 col-xs-12">
                    <img class="img-responsive margin-center" src="{{asset('/images/pr-setup-img.svg')}}">
                    <div class="subtitle">Account management</div>
                    <p>Easily share and manage access to each social account</p>
                </div>
            </div>
        </div>
    </div>

    @include('frontend.includes.compareplans')

</div>

@include('frontend.includes.footer')

@endsection

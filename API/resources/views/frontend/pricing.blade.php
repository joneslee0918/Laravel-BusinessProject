@extends('layouts.homepage')

@section('content')
<div id="page-banner">
</div>
<div class="product-pages">
    <div class="p-first-section">
        <div class="container">
            <div class="row standard-padding">
                <h class="col-xs-12 text-center">
                    <h2>Uniclix price table</h2>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="tabset">

    <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked>
    <label for="tab1">Product Plan</label>

    <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier">
    <label for="tab2">Twitter Growth</label>

    <div class="tab-panels">
        <section id="marzen" class="tab-panel plan-shadow">
            <div class="container">
                <div class="montly-annual text-right">
                    <span class="billing-toggle">monthly billing</span>
                    <label class="label">
                    <div class="toggle">
                        <input id="toggleMonthlyYearly" class="toggle-state" type="checkbox" name="check" value="check" />
                        <div class="toggle-inner">
                        <div class="indicator"></div>
                        </div>
                        <div class="active-bg"></div>
                    </div>
                    </label>
                    <span class="billing-toggle">annual billing</span>
                </div>
                <div class="text-right mb30">save up to 20%</div>
                <div class="pricing-plans">
                    <div class="plan plan-shadow">
                        <div class="plan-name-container">
                            <div class="plan-name">Basic</div>
                        </div>
                        <div class="plan-price-container">
                            <div>
                                <span class="plan-price">$<span class="plan-price-amount">10</span></span>
                                <span class="fw700">/ mo</span>
                            </div>
                            <div class="billed-period">Billend monthly</div>
                        </div>
                        <div class="plan-content-container">
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 6 social accounts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> Unlimited posts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 1 user</div>
                        </div>
                        <div class="plan-button-container">
                            <a class="btn plan-price-btn" href="#">Start free trial</a>
                            <div class="plan-see-more">or <a href="#">see more features</a></div>
                        </div>
                    </div>
                    <div class="plan plan-shadow">
                        <div class="plan-name-container">
                            <div class="plan-name">Plus</div>
                        </div>
                        <div class="plan-price-container">
                            <div>
                                <span class="plan-price">$<span class="plan-price-amount">15</span></span>
                                <span class="fw700">/ mo</span>
                            </div>
                            <div class="billed-period">Billend monthly</div>
                        </div>
                        <div class="plan-content-container">
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 10 social accounts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> Unlimited posts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 1 user</div>
                        </div>
                        <div class="plan-button-container">
                            <a class="btn plan-price-btn" href="#">Start free trial</a>
                            <div class="plan-see-more">or <a href="#compareplans">see more features</a></div>
                        </div>
                    </div>
                    <div class="plan plan-shadow">
                        <div class="plan-name-container">
                            <div class="plan-name">Premium</div>
                        </div>
                        <div class="plan-price-container">
                            <div>
                                <span class="plan-price">$<span class="plan-price-amount">50</span></span>
                                <span class="fw700">/ mo</span>
                            </div>
                            <div class="billed-period">Billend monthly</div>
                        </div>
                        <div class="plan-content-container">
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 25 social accounts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> Unlimited posts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 2 user</div>
                        </div>
                        <div class="plan-button-container">
                            <a class="btn plan-price-btn" href="#">Start free trial</a>
                            <div class="plan-see-more">or <a href="#compareplans">see more features</a></div>
                        </div>
                    </div>
                    <div class="plan plan-shadow">
                        <div class="plan-name-container">
                            <div class="plan-name">Pro</div>
                        </div>
                        <div class="plan-price-container">
                            <div>
                                <span class="plan-price">$<span class="plan-price-amount">90</span></span>
                                <span class="fw700">/ mo</span>
                            </div>
                            <div class="billed-period">Billend monthly</div>
                        </div>
                        <div class="plan-content-container">
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 50 social accounts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> Unlimited posts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 6 user</div>
                        </div>
                        <div class="plan-button-container">
                            <a class="btn plan-price-btn" href="#">Start free trial</a>
                            <div class="plan-see-more">or <a href="#compareplans">see more features</a></div>
                        </div>
                    </div>
                    <div class="plan plan-shadow">
                        <div class="plan-name-container">
                            <div class="plan-name">Agency</div>
                        </div>
                        <div class="plan-price-container">
                            <div>
                                <span class="plan-price">$<span class="plan-price-amount">180</span></span>
                                <span class="fw700">/ mo</span>
                            </div>
                            <div class="billed-period">Billend monthly</div>
                        </div>
                        <div class="plan-content-container">
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 100 social accounts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> Unlimited posts</div>
                            <div class="plan-items"><img src="{{asset('/images/plan-tick.svg')}}"> 6 user</div>
                        </div>
                        <div class="plan-button-container">
                            <a class="btn plan-price-btn" href="#">Start free trial</a>
                            <div class="plan-see-more">or <a href="#compareplans">see more features</a></div>
                        </div>
                    </div>
                </div>
                <div class="text-box plan-shadow">
                    Try our basic free plan. 1 social accounts, 10 posts per account, 1 user. <a href="#">Get started now</a>
                </div>
                <div class="compare-plans-container text-left" id="compareplans">
                    <h1>Compare plans</h1>
                </div>
                <div class="compare-plans-table-container">
                    <table class="compare-plans-table" style="width:100%">
                        <tr>
                            <th style="width:20%">
                            </th>
                            <th>
                                <h5>Free</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Basic</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Plus</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Premium</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Pro</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Agency</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Monthly</td>
                            <td></td>
                            <td>$10</td>
                            <td>$15</td>
                            <td>$50</td>
                            <td>$90</td>
                            <td>$180</td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Annual Billing</td>
                            <td></td>
                            <td>$100</td>
                            <td>$150</td>
                            <td>$500</td>
                            <td>$900</td>
                            <td>$1800</td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Social Accounts</td>
                            <td>1</td>
                            <td>6</td>
                            <td>10</td>
                            <td>25</td>
                            <td>50</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Users</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2</td>
                            <td>6</td>
                            <td>6</td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Post Limitation</td>
                            <td class="plan-table-text">10</td>
                            <td class="plan-table-text">Unlimited</td>
                            <td class="plan-table-text">Unlimited</td>
                            <td class="plan-table-text">Unlimited</td>
                            <td class="plan-table-text">Unlimited</td>
                            <td class="plan-table-text">Unlimited</td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Schedule and Publish</td>
                            <td class="plan-table-text">Limited</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Content Curation</td>
                            <td class="plan-table-text">Limited</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Mentions</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Social Listening & Monitoring</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Analytics</td>
                            <td class="plan-table-text">Limited</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Andvanced Schedule</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Create and Manage Draft Posts</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Team: Invite Additional Users</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Approval Workflow</td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-cancel.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <th style="width:20%">
                            </th>
                            <th>
                                <h5>Free</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Basic</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Plus</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Premium</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Pro</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                            <th>
                                <h5>Agency</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
        <section id="rauchbier" class="tab-panel plan-shadow">
            <div class="container">
                <div class="compare-plans-table-container">
                    <table class="compare-plans-table" style="width:100%">
                        <tr>
                            <th style="width:80%">
                            </th>
                            <th>
                                <h5>Twitter Growth</h5>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                            </th>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Monthly</td>
                            <td>$10</td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Targeted Followers</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">Recommended Unfollowers</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Target Audience</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <td class="fs14 text-left">DM</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr class="grey-tr">
                            <td class="fs14 text-left">Mentions</td>
                            <td><img src="{{asset('/images/plan-success.svg')}}"></td>
                        </tr>
                        <tr>
                            <th style="width:80%">
                            </th>
                            <th>
                                <a class="btn plan-price-btn" href="#">Start trial</a>
                                <h5>Twitter Growth</h5>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    </div>

</div>

<script>
$(document).ready(function(){
    $("#toggleMonthlyYearly").click( function(){
        if( $(this).is(':checked') )
        {
            $('.plan-price-amount').each(function(){
                var text = parseInt($(this).text())*10;
                $(this).text(text);
            })

            $('.billed-period').text("Billed annually");
        }
        else {
            $('.plan-price-amount').each(function(){
                var text = parseInt($(this).text())/10;
                $(this).text(text);

                $('.billed-period').text("Billed monthly");
            })
        }
    });
})
</script>

@include('frontend.includes.footer')

@endsection

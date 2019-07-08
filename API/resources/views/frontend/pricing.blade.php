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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt iaculis nisi, at interdum urna interdum bibendum. Curabitur ut sodales nibh, vestibulum auctor tellus.</p>
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
        <section id="marzen" class="tab-panel">
            <div class="container">
                <div class="montly-annual text-right">
                    <span class="billing-toggle">monthly billing</span>
                    <label class="label">
                    <div class="toggle">
                        <input class="toggle-state" type="checkbox" name="check" value="check" />
                        <div class="toggle-inner">
                        <div class="indicator"></div>
                        </div>
                        <div class="active-bg"></div>
                    </div>
                    </label>
                    <span class="billing-toggle">annual billing</span>
                </div>

                <div class="pricing-plans">
                    <div class="plan panel-shadow">
                        <h2>Basic</h2>
                    </div>
                    <div class="plan panel-shadow">
                        <h2>Basic</h2>
                    </div>
                    <div class="plan panel-shadow">
                        <h2>Basic</h2>
                    </div>
                    <div class="plan panel-shadow">
                        <h2>Basic</h2>
                    </div>
                    <div class="plan panel-shadow">
                        <h2>Basic</h2>
                    </div>
                </div>
            </div>
        </section>
        <section id="rauchbier" class="tab-panel">
            <div class="container">

            </div>
        </section>
    </div>

</div>

@include('frontend.includes.footer')

@endsection

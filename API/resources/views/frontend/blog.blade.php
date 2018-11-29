@extends('layouts.homepage')

@section('content')
<div id="banner">
	<div class="container">
		<h1>Blog</h1>
		<p>Manuals take time. These videos will get you started instantly.</p>
	</div>
</div>

<div class="container mt100">
	<div class="row mb30">
		<div class="col-xs-12">
			<div class="blog-post panel-shadow">
				<div class="blog-post-image fleft">
					<img src="{{asset('images/blog-img-7.png')}}" class="img-responsive w100">
				</div>
				<div class="blog-post-content fright">
					<h4>Take care of yourself</h4>
					<div class="blog-post-date"><span class="blog-post-author">Uniclix</span><span>30.01.2019</span></div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus, ut hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet libero. In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis...</p>
					<div class="blog-post-footer">
						<div class="blog-post-share">
							<span class="blog-post-span-1">Share:</span> 
							<span class="blog-post-span-2">
								<ul class="list-inline blog-post-social">
		                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
		                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
		                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
		                        </ul>
                    		</span>
						</div>
						<div class="blog-post-show-more">
							<a href="{{route('article')}}" class="theme-btn-transparent">Read more</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row mb30">
		<div class="col-xs-12">
			<div class="blog-post panel-shadow">	
				<div class="blog-post-image fright">
					<img src="{{asset('images/blog-img-8.png')}}" class="img-responsive w100">
				</div>			
				<div class="blog-post-content fleft">
					<h4>Take care of yourself</h4>
					<div class="blog-post-date"><span class="blog-post-author">Uniclix</span><span>30.01.2019</span></div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus, ut hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet libero. In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis...</p>
					<div class="blog-post-footer">
						<div class="blog-post-share">
							<span class="blog-post-span-1">Share:</span> 
							<span class="blog-post-span-2">
								<ul class="list-inline blog-post-social">
		                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
		                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
		                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
		                        </ul>
                    		</span>
						</div>
						<div class="blog-post-show-more">
							<a href="#" class="theme-btn-transparent">Read more</a>
						</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
	<div class="row mb30">
		<div class="col-xs-12">
			<div class="blog-post panel-shadow">
				<div class="blog-post-image fleft">
					<img src="{{asset('images/blog-img-9.png')}}" class="img-responsive w100">
				</div>
				<div class="blog-post-content fright">
					<h4>Take care of yourself</h4>
					<div class="blog-post-date"><span class="blog-post-author">Uniclix</span><span>30.01.2019</span></div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus, ut hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet libero. In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis...</p>
					<div class="blog-post-footer">
						<div class="blog-post-share">
							<span class="blog-post-span-1">Share:</span> 
							<span class="blog-post-span-2">
								<ul class="list-inline blog-post-social">
		                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
		                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
		                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
		                        </ul>
                    		</span>
						</div>
						<div class="blog-post-show-more">
							<a href="#" class="theme-btn-transparent">Read more</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row mb30">
		<div class="col-xs-12">
			<div class="blog-post panel-shadow">	
				<div class="blog-post-image fright">
					<img src="{{asset('images/blog-img-10.png')}}" class="img-responsive w100">
				</div>			
				<div class="blog-post-content fleft">
					<h4>Take care of yourself</h4>
					<div class="blog-post-date"><span class="blog-post-author">Uniclix</span><span>30.01.2019</span></div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus, ut hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet libero. In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis...</p>
					<div class="blog-post-footer">
						<div class="blog-post-share">
							<span class="blog-post-span-1">Share:</span> 
							<span class="blog-post-span-2">
								<ul class="list-inline blog-post-social">
		                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
		                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
		                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
		                        </ul>
                    		</span>
						</div>
						<div class="blog-post-show-more">
							<a href="#" class="theme-btn-transparent">Read more</a>
						</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
	<div class="row mb70 text-right">
		<div class="col-xs-12 blog-pagination">
			<nav aria-label="Page navigation example">
			  <ul class="pagination">
			    <li class="page-item">
			      <a class="page-link" href="#" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			        <span class="sr-only">Previous</span>
			      </a>
			    </li>
			    <li class="page-item"><a class="page-link" href="#">1</a></li>
			    <li class="page-item"><a class="page-link" href="#">2</a></li>
			    <li class="page-item"><a class="page-link" href="#">3</a></li>
			    <li class="page-item">
			      <a class="page-link" href="#" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			        <span class="sr-only">Next</span>
			      </a>
			    </li>
			  </ul>
			</nav>
		</div>
	</div>
</div>

@include('frontend.includes.footer')

@endsection
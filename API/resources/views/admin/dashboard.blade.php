@extends('layouts.auth')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                  <div class="row mb30">
                    <div class="col-md-6">All Posts</div>
                    <div class="col-md-6 text-right">
                      <a href="{{ route('admin.post.create')}}"><button type="button" class="btn btn-primary">Create New Post</button></a>
                    </div>
                  </div>
                </div>

                <div class="card-body">
                    <ul class="list-group posts-lists">
                      @foreach($posts as $post)
                      <li class="list-group-item">
                        <div class="row">
                          <div class="col-md-6"><h4>{{$post->title}}</h4></div>
                          <div class="col-md-6 text-right">
                            <a href="{{ route('post.edit', $post->id) }}"><button type="button" class="btn btn-info">Edit</button></a>
                            <button type="button" class="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      </li>
                      @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
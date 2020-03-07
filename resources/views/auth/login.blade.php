@extends('layouts.main')

@section('content')
    <div class="page-header clear-filter" filter-color="orange">
        <div class="page-header-image" style="background-image:url({{asset('images/login.jpg')}})"></div>   
        <div class="content">
            <div class="container">
                <div class="col-md-4 ml-auto mr-auto">
                    <div class="card card-login card-plain">
                        <form class="form" method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="card-header text-center">
                                <div class="logo-container">
                                    <img src="{{asset('images/now-logo.png')}}" alt="">
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="input-group no-border input-lg">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="now-ui-icons ui-1_email-85"></i>
                                        </span>
                                    </div>
                                    <input type="text" name="email" class="form-control @error('email') is-invalid @enderror" placeholder="{{ __('E-Mail Address') }}" value="{{ old('email') }}" required autocomplete="email" autofocus/>
                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                                <div class="input-group no-border input-lg">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="now-ui-icons text_caps-small"></i>
                                        </span>
                                    </div>
                                <input id="password" placeholder="{{ __('Password') }}" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="card-footer text-center">
                                <button type="submit" class="btn btn-primary btn-round btn-lg btn-block">Acceder</button>
                                {{-- <div class="pull-left">
                                    <h6>
                                        @if (Route::has('password.request'))
                                            <a href="{{ route('password.request') }}" class="link">{{ __('Forgot Your Password?') }}</a>
                                        @endif
                                    </h6>
                                </div> --}}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
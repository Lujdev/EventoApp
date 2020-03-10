<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'App-Tickets') }}</title>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('css/fontawesome-free/js/all.min.js') }}"></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    {{-- <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" /> --}}
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fontawesome-free/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
</head>

<body class="login-page sidebar-collapse">
    <div id="app">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" style="background-color: #252a31 !important; padding-top: 5px !important;" color-on-scroll="400">
            <div class="container">
                <div class="dropdown button-dropdown">
                    <a href="#pablo" class="dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">
                        <span class="button-bar"></span>
                        <span class="button-bar"></span>
                        <span class="button-bar"></span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-header">Menu</a>
                        <a class="dropdown-item" href="#">Contactanos</a>
                        @guest
                            <a class="dropdown-item" href="{{ route('login') }}">{{ __('Login') }}</a>
                        @else
                            <a class="dropdown-item" onclick="event.preventDefault();  document.getElementById('logout-form').submit();" href="{{ route('logout') }}">{{ __('Logout') }}</a>
                            <a class="dropdown-item" href="{{ route('indexpanel') }}">Lista Registrados</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        @endguest
                    </div>
                </div>
                <div class="navbar-translate">
                    <a class="navbar-brand" href="{{ url('/') }}" rel="tooltip"
                        title="App Eventos" data-placement="bottom" target="_blank">
                        {{ config('app.name', 'App Event') }}
                    </a>
                    <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navigation" aria-controls="navigation-index" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-bar top-bar"></span>
                        <span class="navbar-toggler-bar middle-bar"></span>
                        <span class="navbar-toggler-bar bottom-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse justify-content-end" id="navigation"
                    data-nav-image="{{asset('images/blurred-image-1.jpg')}}">
                    <ul class="navbar-nav">
                        @guest
                            {{-- <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li> --}}
                            @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                            @endif
                        @else
                            <li class="nav-item">
                                <a class="nav-link">{{ Auth::user()->name }}</a>
                            </li>
                            {{-- <li class="nav-item">
                                <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();  document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
                            </li>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form> --}}
                            {{-- <li class="nav-item">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                </a>
                            </li> --}}
                        @endguest
                        <li class="nav-item">
                            <a style="font-size: 1rem;" class="nav-link" rel="tooltip" title="Follow us on Twitter" data-placement="bottom"
                                href="https://twitter.com/NaugthyCode" target="_blank">
                                <i class="fab fa-twitter"></i>
                                <p class="d-lg-none d-xl-none">Twitter</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a style="font-size: 1rem;" class="nav-link" rel="tooltip" title="Like us on Facebook" data-placement="bottom"
                                href="https://www.facebook.com/NaugthyCode" target="_blank">
                                <i class="fab fa-facebook-square"></i>
                                <p class="d-lg-none d-xl-none">Facebook</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a style="font-size: 1rem;" class="nav-link" rel="tooltip" title="Follow us on Instagram" data-placement="bottom"
                                href="https://www.instagram.com/naugthycode" target="_blank">
                                <i class="fab fa-instagram"></i>
                                <p class="d-lg-none d-xl-none">Instagram</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- End Navbar -->

        <!-- Content -->

            <meta>
                @yield('content')
            </meta>

        <!-- End Content -->

        <!-- Footer -->
            @include('footer')
        <!-- End Footer -->
        
    </div>

    <!-- Others JS-->
    
    <script src="{{ asset('js/custom.js') }}" ></script>
</body>

</html>

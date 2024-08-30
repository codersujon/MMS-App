<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
      
    <title>MMS-App</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Styles and Js -->
    @vite(['resources/css/app.css','resources/js/app.js'])

</head>

<body class="font-body">

    {{-- yield start --}}
        @yield('main-content')
    {{-- yield end --}}

    {{-- js --}}
    <script src="{{ asset('backend/js/jquery-3.7.1.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{ asset('backend/js/ajax.js') }}"></script>
</body>

</html>

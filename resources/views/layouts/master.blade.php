<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
      
    <title>MMS-App</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">

    <!-- Styles and Js -->
    @vite(['resources/css/app.css','resources/js/app.js'])

</head>

<body>

    {{-- yield start --}}
        @yield('main-content')
    {{-- yield end --}}

    {{-- js --}}
    <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
</body>

</html>

@extends('layouts.master')
@section('main-content')
<div class="antialiased bg-gray-50 dark:bg-gray-900">

    {{-- navbar start --}}
    @include('backend.layouts.navbar')
    <!-- sidebar start -->
    @include('backend.layouts.sidebar')


    <main class="p-4 md:ml-64 h-auto pt-20">
       @yield('main')
    </main>
</div>
@endsection

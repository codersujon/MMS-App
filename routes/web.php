<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/dashboard', function () {
    return view('backend.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Members
Route::get('/members', [MemberController::class, 'index'])->name('members.index');
Route::post('/members/store', [MemberController::class, 'store'])->name('members.store');
Route::get('/members/list', [MemberController::class, 'memberList'])->name('members.list');
Route::get('/members/destroy/{id}', [MemberController::class, 'destroy'])->name('members.destroy');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MemberPlanController;
use App\Http\Controllers\PenaltySettingController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/dashboard', function () {
    return view('backend.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function(){
    Route::controller(MemberController::class)->group(function(){
        Route::get('/members', 'index')->name('members.index');
        Route::post('/members/store', 'store')->name('members.store');
        Route::get('/members/list', 'memberList')->name('members.list');
        Route::get('/members/destroy/{id}','destroy')->name('members.destroy');
    });
});


// Members Plans
Route::middleware('auth')->group(function(){
    Route::controller(MemberPlanController::class)->group(function(){
        Route::get('/members/plans', 'index')->name('members.plans.index');
        Route::post('/members/plans/store', 'store')->name('members.plans.store');
        Route::get('/members/plans/all', 'allPlans')->name('members.plans.all');
        Route::get('/members/plans/destroy/{id}', 'destroyPlans')->name('members.plans.destroy');
    });
});


// Penalty Settings
Route::middleware('auth')->group(function(){
    Route::controller(PenaltySettingController::class)->group(function(){
        Route::get('/penalty/settings', 'index')->name('penalty.settings.index');
        Route::post('/penalty/store', 'store')->name('penalty.settings.store');
        Route::get('/penalty/all', 'allPenalty')->name('penalty.all');
        Route::get('/penalty/destroy/{id}', 'penaltyDestroy')->name('penalty.destroy');
    });
});


// Payments
Route::middleware('auth')->group(function(){
    Route::controller(PaymentController::class)->group(function(){
        Route::get('/payments/all', 'index')->name('payments.all.index');
        Route::post('/payments/store', 'store')->name('payments.store');
        Route::get('/payments/list', 'allPayments')->name('payments.list');
        Route::get('/payments/destroy/{id}', 'destroy')->name('payments.destroy');
        Route::get('/get-installment/{id}', 'getInstallment')->name('get-installment');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

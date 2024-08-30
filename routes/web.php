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

// Members
Route::get('/members', [MemberController::class, 'index'])->name('members.index');
Route::post('/members/store', [MemberController::class, 'store'])->name('members.store');
Route::get('/members/list', [MemberController::class, 'memberList'])->name('members.list');
Route::get('/members/destroy/{id}', [MemberController::class, 'destroy'])->name('members.destroy');

// Members Plans
Route::get('/members/plans', [MemberPlanController::class, 'index'])->name('members.plans.index');
Route::post('/members/plans/store', [MemberPlanController::class, 'store'])->name('members.plans.store');
Route::get('/members/plans/all', [MemberPlanController::class, 'allPlans'])->name('members.plans.all');
Route::get('/members/plans/destroy/{id}', [MemberPlanController::class, 'destroyPlans'])->name('members.plans.destroy');


// Penalty Settings
Route::get('/penalty/settings', [PenaltySettingController::class, 'index'])->name('penalty.settings.index');
Route::post('/penalty/store', [PenaltySettingController::class, 'store'])->name('penalty.settings.store');
Route::get('/penalty/all', [PenaltySettingController::class, 'allPenalty'])->name('penalty.all');
Route::get('/penalty/destroy/{id}', [PenaltySettingController::class, 'penaltyDestroy'])->name('penalty.destroy');


// Payments
Route::get('/payments/all', [PaymentController::class, 'index'])->name('payments.all.index');
Route::post('/payments/store', [PaymentController::class, 'store'])->name('payments.store');
Route::get('/payments/list', [PaymentController::class, 'allPayments'])->name('payments.list');
Route::get('/payments/destroy/{id}', [PaymentController::class, 'destroy'])->name('payments.destroy');


Route::get('/get-installment/{id}', [PaymentController::class, 'getInstallment'])->name('get-installment');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

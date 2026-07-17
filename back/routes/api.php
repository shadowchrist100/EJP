<?php

use App\Http\Controllers\MinistryRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/salvation', [UserController::class, 'salvation']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/dons', [DonationController::class, 'store']);
Route::get('/refresh_access_token', [AuthController::class, 'refresh']);

// Google Authentication
Route::get('/google/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Password Reset
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Email Verification (public link)
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verify'])->name('verification.verify');

Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/init-refresh-token', [AuthController::class, 'initRefreshToken']);
    Route::post('/ministry_request', [MinistryRequestController::class, 'store']);
    Route::get('/profile', [UserController::class, 'show']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::delete('/profile', [UserController::class, 'destroy']);
    Route::post('/email/resend', [AuthController::class, 'resend']);
});

// Admin routes (admin + superadmin)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/users/salvation', [AdminController::class, 'salvation']);
    Route::get('/ministry-requests', [AdminController::class, 'ministryRequests']);
    Route::get('/user/{id}', [AdminController::class, 'userDetail']);
});

// Super admin only routes
Route::middleware(['auth:sanctum', 'superadmin'])->prefix('admin')->group(function () {
    Route::post('/user/{id}/make-admin', [AdminController::class, 'makeAdmin']);
    Route::post('/user/{id}/remove-admin', [AdminController::class, 'removeAdmin']);
});


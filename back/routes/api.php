<?php

use App\Http\Controllers\MinistryRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/salvation', [UserController::class, 'salvation']);
Route::get('/refresh_access_token', [AuthController::class, 'refresh']);
// Route::post('/dons', )

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/ministry_request', [MinistryRequestController::class, 'store']);
    Route::put('/profile', [UserController::class, 'update']);
});


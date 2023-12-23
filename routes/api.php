<?php

use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/product-category", [ProductCategoryController::class, "index"]);
Route::get("/product-category/{id}", [ProductCategoryController::class, "show"]);

Route::get("/product", [ProductController::class, "index"]);
Route::get("/product/{uuid}", [ProductController::class, "show"]);

Route::middleware(['auth:sanctum', 'throttle:none'])->group(function() {
    Route::post("/product/create", [ProductController::class, "store"]);
});

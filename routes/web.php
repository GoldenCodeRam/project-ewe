<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', []);
});

Route::middleware("auth")->group(function () {

    Route::get('/home', function () {
        return Inertia::render('Home', [
            "user" => Auth::user(),
        ]);
    })->name("Home");

    Route::get('/home/product/create', function () {
        return Inertia::render('Product/Create', [
            "user" => Auth::user(),
        ]);
    });
});

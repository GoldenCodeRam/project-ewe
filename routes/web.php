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

Route::middleware("auth")->group(function() {
    Route::get('/home', function() {
        return Inertia::render('Home', []);
    });
});


function test() {
    $radius = 80;
    $coordinates = [];
    for ($i = 0; $i < 6; $i++) {
        $x = round($radius * cos((2 * pi() * $i) / 6) + 100, 3) + rand(-10, 10);
        $y = round($radius * sin((2 * pi() * $i) / 6) + 100, 3) + rand(-10, 10);
        $coordinates[] = [$x, $y];
    }

    return $coordinates;
}

function catmullRom2bezier() {
    $points = test();
    $size = count($points);

    $k = 2;

    $path = "M{$points[0][0]},{$points[0][1]}";

    for ($i = 0; $i < $size; $i++) {
        $p0 = $points[($i + $size - 1) % $size];
        $p1 = $points[($i + $size) % $size];
        $p2 = $points[($i + $size + 1) % $size];
        $p3 = $points[($i + $size + 2) % $size];

        $cp1x = $p1[0] + ($p2[0] - $p0[0]) / 6 * $k;
        $cp1y = $p1[1] + ($p2[1] - $p0[1]) / 6 * $k;

        $cp2x = $p2[0] - ($p3[0] - $p1[0]) / 6 * $k;
        $cp2y = $p2[1] - ($p3[1] - $p1[1]) / 6 * $k;

        $path .= "C{$cp1x},{$cp1y},{$cp2x},{$cp2y},{$p2[0]},{$p2[1]}";
    }

    return $path;
}

function tj($ti, $pi, $pj) {
    $dx = $pi[0] - $pj[0];
    $dy = $pi[1] - $pj[1];
    $l = pow(pow($dx, 2) + pow($dy, 2), 0.5);
    return pow($ti + $l, 0.5);
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function login(): Response {
        return Inertia::render('Auth/Login', []);
    }
}

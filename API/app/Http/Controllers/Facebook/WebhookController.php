<?php

namespace App\Http\Controllers\Facebook;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WebhookController extends Controller
{
    public function messages(Request $request)
    {
        return $request->all();
    }
}

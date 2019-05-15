<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\RoleAddon;

class BillingController extends Controller
{
    private $user;
    private $selectedChannel;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth()->user();
            $this->selectedChannel = $this->user->selectedChannel();
            return $next($request);
        });
    }

    public function changePlan(Request $request)
    {
        $plan = $request->input('plan');
        $role = Role::where("name", $plan)->first();
        if(!$role) return response()->json(["error" => "Plan not found"], 404);;

        $user = $this->user;
        $user->role_id = $role->id;
        $user->save();

        return response()->json(["success" => true], 200);
    }

    public function activateAddon(Request $request)
    {
        $addon = $request->input('addon');
        $roleAddon = RoleAddon::where("name", $addon)->first();
        if(!$roleAddon) return response()->json(["error" => "Addon not found"], 404);;

        $user = $this->user;
        $user->roleAddons()->attach($roleAddon->id);

        return response()->json(["success" => true], 200);
    }

    public function cancelAddon(Request $request)
    {
        $addon = $request->input('addon');
        $roleAddon = RoleAddon::where("name", $addon)->first();
        if(!$roleAddon) return response()->json(["error" => "Addon not found"], 404);;

        $user = $this->user;
        $user->roleAddons()->detach($roleAddon->id);

        return response()->json(["success" => true], 200);
    }
}
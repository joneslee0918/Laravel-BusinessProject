<?php

namespace App\Traits;


use App\Models\Role;
use App\Models\RoleLimit;
use App\Models\RoleAddon;

trait NewPermissible
{
    public function hasRole($roleName)
    {  
        if($roleName=="free") return true;

        if ($this->subscribedToPlan($roleName, 'main')) {
           return Role::where("id", $this->role_id)->where("name", strtolower($roleName))->exists() || $this->hasAddon($roleName);
        }

        if(!$this->subscribed('main')) {
            $this->setRole("free");
        }

        return false;
    }

    public function hasPermission($permission)
    {
        $role = Role::where("id", $this->role_id)->first();

        if ($role && $this->subscribedToPlan($role->name, 'main')) {

            return $role->permissions()->where("name", strtolower($permission))->exists() || $this->hasAddonPermission($permission);
        }

        if(!$this->subscribed('main')) {
            $this->setRole("free");
        }

        return false;
    }

    public function hasAddon($addon)
    {
        return $this->roleAddons()->where("name", strtolower($addon))->exists() && $this->subscribedToPlan($addon, 'addon');
    }

    public function hasAddonPermission($permission)
    {
        $addons = $this->roleAddons()->get();

        foreach($addons as $addon){
            if($addon->permissions()->where("name", strtolower($permission))->exists() && $this->subscribedToPlan($addon->name, 'addon')) return true;
        }

        return false;
    }

    public function setRole($roleName)
    {
        $roleName = strtolower($roleName);

        if ($role = Role::where("name", $roleName)->first()) {
            $this->role_id = $role->id;
            $this->save();
        }
    }

    public function setAddon($addonName)
    {
        $addonName = strtolower($addonName);

        if($addon = RoleAddon::where("name", $addonName)->first()){
            $this->roleAddons()->attach($addon->id);
        }
    }

    public function getLimit($type)
    {
        if($limit = RoleLimit::where("role_id", $this->role_id)->first()){
            return $limit->{$type};
        }

        return 0;
    }
}
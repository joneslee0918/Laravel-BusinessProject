<?php

namespace App\Traits;


use App\Models\Role;
use App\Models\RoleLimit;

trait Permissible
{
    public function hasRole($roleName)
    {
        if ($role = Role::where("name", $roleName)->first()) {

            return $this->role_id == $role->id;
        }

        return false;
    }

    public function hasPermission($permission)
    {
        if ($role = Role::where("id", $this->role_id)->first()) {

            return $role->permissions()->where("name", $permission)->exists();
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

    public function getLimit($type)
    {
        if($limit = RoleLimit::where("role_id", $this->role_id)->first()){
            return $limit->{$type};
        }

        return 0;
    }
}
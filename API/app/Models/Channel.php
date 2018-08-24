<?php

namespace App\Models;

use App\Traits\Selectable;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use Selectable;

    protected $fillable = [
        "user_id",
        "type",
        "selected",
        "banned",
        "deleted",
        "created_at",
        "updated_at",
    ];

    public function attributes()
    {
        $classType = "\App\Models\\" . ucfirst($this->type) . "\Channel";

        return $this->hasOne((new $classType));
    }

    public function getData()
    {
        return $this->attributes()->first()->getData();
    }
}

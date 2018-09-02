<?php

namespace App\Traits;


trait Selectable
{
    public function select()
    { 
        if($this->selected < 1){
            $this->where("user_id", $this->user_id)->where("selected", 1)->update(["selected" => 0]);
            $this->selected = 1;
            $this->save();
        }
    }
}
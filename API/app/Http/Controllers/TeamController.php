<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\TeamUserChannel;

class TeamController extends Controller
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

    public function getMembers()
    {   
        return response()->json($this->user);
    }

    public function add(Request $request)
    {   
        $user = $this->user;
        $name = $request->input('name');
        $email = $request->input('email');
        $admin = $request->input('admin');
        $teamId = $request->input('teamId');
        $assignedChannels = $request->input('assignedChannels');

        if($email === $user->email) return response()->json(["error" => "You are already the owner of this team."], 409);

        if(!$teamId){
            $team = $user->teams()->first();

            if(!$team){
                $team = $user->teams()->create([
                    "name" => $user->organization_name ? $user->organization_name : "My Organization" 
                ]);
            }
        }else{
            $team = Team::find($teamId);

            if(!$team->members()->where("member_id", $user->id)->where("is_admin", 1)->exists()){
                return response()->json(["error" => "You don't have permission to add members to this team"], 403);
            }
        }

        $member = User::where("email", $email)->first();

        if(!$member){
            $member = User::create([
                "email" => $email,
                "name" => $name,
                "role_id" => 1
            ]);
        }        

        if($team->members()->where("member_id", $member->id)
        ->orWhere("approver_id", $member->id)
        ->orWhere("owner_id", $member->id)) return response()->json(["error" => "Member already exists in this team."], 409);

        $teamMember = $team->members()->create([
            "member_id" => $member->id,
            "owner_id" => $user->id,
            "is_admin" => $admin ? 1 : 0
        ]);

        $team->channels()->delete();

        $assignedChannelData = [];

        foreach($assignedChannels as $channel){
            $assignedChannelData[] = [
                "member_id" => $member->id,
                "owner_id" => $user->id,
                "approver_id" => $user->id,
                "channel_id" => $channel["id"],
                "team_id" => $team->id,
                "role" => $channel["permissionLevel"] === "publisher" ? "publisher" : "member"
            ];
        }

        if(count($assignedChannelData))
        TeamUserChannel::insert($assignedChannelData);
        
        return response()->json(["message" => "New member has been added"], 200);
    }
}

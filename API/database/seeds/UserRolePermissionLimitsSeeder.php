<?php

use Illuminate\Database\Seeder;

use App\Models\Role;
use App\Models\Permission;

class UserRolePermissionLimitsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("roles")->truncate();
        DB::table("permissions")->truncate();
        DB::table("role_permissions")->truncate();
        DB::table("role_limits")->truncate();

        DB::table("roles")->insert([
            [
                "name" => "starter",
                "description" => "Starter features"
            ],
            [
                "name" => "basic",
                "description" => "Basic features"
            ],
            [
                "name" => "premium",
                "description" => "Premium features"
            ],
            [
                "name" => "pro",
                "description" => "Pro features"
            ]
        ]);

        DB::table("permissions")->insert([
            [
                "name" => "manage-dashboard",
                "description" => "Dashboard management"
            ],
            [
                "name" => "manage-fans",
                "description" => "Fans management"
            ],
            [
                "name" => "manage-non-followers",
                "description" => "Non-followers management"
            ],
            [
                "name" => "manage-recent-unfollowers",
                "description" => "Recent unfollowers management"
            ],
            [
                "name" => "manage-recent-followers",
                "description" => "Recent followers management"
            ],
            [
                "name" => "manage-inactive-following",
                "description" => "Inactive following management"
            ],
            [
                "name" => "manage-following",
                "description" => "All following management"
            ],
            [
                "name" => "manage-account-targets",
                "description" => "Account targets management"
            ],
            [
                "name" => "manage-keyword-targets",
                "description" => "Keyword targets management"
            ],
            [
                "name" => "manage-whitelist",
                "description" => "Whitelist management"
            ],
            [
                "name" => "manage-blacklist",
                "description" => "Blacklist management"
            ],
            [
                "name" => "scheduling",
                "description" => "Scheduled posts"
            ],
            [
                "name" => "accounts",
                "description" => "Accounts management"
            ],
            [
                "name" => "compose",
                "description" => "Post something"
            ]
        ]);

        $starter = Role::where("name", "starter")->first();
        $basic = Role::where("name", "basic")->first();
        $premium = Role::where("name", "premium")->first();
        $pro = Role::where("name", "pro")->first();

        $permissions = Permission::all()->pluck("id");

        $starter->permissions()->attach($permissions);
        $basic->permissions()->attach($permissions);
        $premium->permissions()->attach($permissions);
        $pro->permissions()->attach($permissions);

        $starter->roleLimit()->create([
            "accounts_per_platform" => 1,
            "posts_per_account" => 10,
            "twitter_daily_follows" => 10,
            "twitter_daily_unfollows" => 10
        ]);

        $basic->roleLimit()->create([
            "accounts_per_platform" => 2,
            "posts_per_account" => 100,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $premium->roleLimit()->create([
            "accounts_per_platform" => 2,
            "posts_per_account" => 100,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $pro->roleLimit()->create([
            "accounts_per_platform" => 2,
            "posts_per_account" => 2000,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);
    }
}

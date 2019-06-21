<?php

use Illuminate\Database\Seeder;

use App\Models\Role;
use App\Models\RoleAddon;
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
        DB::table("role_addons")->truncate();
        DB::table("permissions")->truncate();
        DB::table("role_permissions")->truncate();
        DB::table("role_addon_permissions")->truncate();
        DB::table("role_limits")->truncate();

        DB::table("roles")->insert([
            [
                "name" => "free",
                "trial_days" => 0,
                "description" => "Free features"
            ],
            [
                "name" => "basic",
                "trial_days" => 30,
                "description" => "Basic features"
            ],
            [
                "name" => "plus",
                "trial_days" => 30,
                "description" => "Plus features"
            ],
            [
                "name" => "premium",
                "trial_days" => 0,
                "description" => "Premium features"
            ],
            [
                "name" => "pro",
                "trial_days" => 0,
                "description" => "Pro features"
            ],
            [
                "name" => "agency",
                "trial_days" => 0,
                "description" => "Agency features"
            ]
        ]);

        DB::table("role_addons")->insert([
            [
                "name" => "twitter_growth",
                "description" => "Twitter growth features"
            ]
        ]);

        DB::table("permissions")->insert([
            [
                "name" => "manage",
                "description" => "Twitter growth"
            ],
            [
                "name" => "manage-dashboard",
                "description" => "Dashboard management"
            ],
            [
                "name" => "manage-reply",
                "description" => "Reply to users in twitter growth"
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
                "name" => "schedule-best-time",
                "description" => "Scheduled posts at best time"
            ],
            [
                "name" => "accounts",
                "description" => "Accounts management"
            ],
            [
                "name" => "compose",
                "description" => "Post something"
            ],
            [
                "name" => "articles",
                "description" => "Curate articles of interest"
            ],
            [
                "name" => "mentions",
                "description" => "Track social media mentions"
            ],
            [
                "name" => "streams",
                "description" => "Social listening"
            ],
            [
                "name" => "analytics",
                "description" => "Analytics"
            ],
            [
                "name" => "advanced-analytics",
                "description" => "Analytics"
            ],
        ]);

        $free = Role::where("name", "free")->first();
        $basic = Role::where("name", "basic")->first();
        $plus = Role::where("name", "plus")->first();
        $premium = Role::where("name", "premium")->first();
        $pro = Role::where("name", "pro")->first();
        $agency = Role::where("name", "agency")->first();

        $twitterGrowth = RoleAddon::where("name", "twitter_growth")->first();

        $freePerm = Permission::whereIn("name", ["articles", "compose", "scheduling", "analytics", "accounts"])->pluck("id");
        $permissions = Permission::whereIn("name", [
                "articles",
                "compose",
                "scheduling",
                "schedule-best-time",
                "analytics",
                "advanced-analytics",
                "streams",
                "mentions"])->pluck("id");

        $twitterGrowthPerm = Permission::whereIn("name",
            ["manage",
            "manage-dashboard",
            "manage-reply",
            "manage-fans",
            "manage-non-followers",
            "manage-recent-unfollowers",
            "manage-recent-followers",
            "manage-inactive-following",
            "manage-following",
            "manage-account-targets",
            "manage-keyword-targets",
            "manage-whitelist",
            "manage-blacklist"])->pluck("id");

        $free->permissions()->attach($freePerm);
        $basic->permissions()->attach($permissions);
        $plus->permissions()->attach($permissions);
        $premium->permissions()->attach($permissions);
        $pro->permissions()->attach($permissions);
        $agency->permissions()->attach($permissions);

        $twitterGrowth->permissions()->attach($twitterGrowthPerm);

        $free->roleLimit()->create([
            "account_limit" => 1,
            "accounts_per_platform" => 1,
            "posts_per_account" => 10,
            "twitter_daily_follows" => 100,
            "twitter_daily_unfollows" => 100
        ]);

        $basic->roleLimit()->create([
            "account_limit" => 6,
            "accounts_per_platform" => 6,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $plus->roleLimit()->create([
            "account_limit" => 10,
            "accounts_per_platform" => 10,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $premium->roleLimit()->create([
            "account_limit" => 25,
            "accounts_per_platform" => 25,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $pro->roleLimit()->create([
            "account_limit" => 50,
            "accounts_per_platform" => 50,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $agency->roleLimit()->create([
            "account_limit" => 100,
            "accounts_per_platform" => 100,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);
    }
}

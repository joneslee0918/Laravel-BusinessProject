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
                "description" => "Free features",
                "monthly_price" => 0,
                "annual_price" => 0
            ],
            [
                "name" => "basic",
                "trial_days" => 30,
                "description" => "Basic features",
                "monthly_price" => 10,
                "annual_price" => 100
            ],
            [
                "name" => "plus",
                "trial_days" => 30,
                "description" => "Plus features",
                "monthly_price" => 15,
                "annual_price" => 150
            ],
            [
                "name" => "premium",
                "trial_days" => 30,
                "description" => "Premium features",
                "monthly_price" => 50,
                "annual_price" => 500
            ],
            [
                "name" => "pro",
                "trial_days" => 30,
                "description" => "Pro features",
                "monthly_price" => 90,
                "annual_price" => 900
            ],
            [
                "name" => "agency",
                "trial_days" => 30,
                "description" => "Agency features",
                "monthly_price" => 180,
                "annual_price" => 1800
            ]
        ]);

        DB::table("role_addons")->insert([
            [
                "name" => "twitter_growth",
                "description" => "Twitter growth features",
                "trial_days" => 3,
                "monthly_price" => 10,
                "annual_price" => 100
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
                "name" => "draft-posts",
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
        $basicPlusPermissions = Permission::whereIn("name", [
                "articles",
                "compose",
                "scheduling",
                "schedule-best-time",
                "analytics",
                "advanced-analytics",
                "streams",
                "mentions"])->pluck("id");
        
        $allPermissions = Permission::whereIn("name", [
            "articles",
            "compose",
            "scheduling",
            "schedule-best-time",
            "analytics",
            "advanced-analytics",
            "streams",
            "draft-posts",
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
        $basic->permissions()->attach($basicPlusPermissions);
        $plus->permissions()->attach($basicPlusPermissions);
        $premium->permissions()->attach($allPermissions);
        $pro->permissions()->attach($allPermissions);
        $agency->permissions()->attach($allPermissions);

        $twitterGrowth->permissions()->attach($twitterGrowthPerm);

        $free->roleLimit()->create([
            "account_limit" => 2,
            "accounts_per_platform" => 2,
            "team_accounts" => 1,
            "posts_per_account" => 10,
            "twitter_daily_follows" => 100,
            "twitter_daily_unfollows" => 100
        ]);

        $basic->roleLimit()->create([
            "account_limit" => 6,
            "accounts_per_platform" => 6,
            "team_accounts" => 1,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $plus->roleLimit()->create([
            "account_limit" => 10,
            "accounts_per_platform" => 10,
            "team_accounts" => 1,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $premium->roleLimit()->create([
            "account_limit" => 25,
            "accounts_per_platform" => 25,
            "team_accounts" => 2,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $pro->roleLimit()->create([
            "account_limit" => 50,
            "accounts_per_platform" => 50,
            "team_accounts" => 6,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);

        $agency->roleLimit()->create([
            "account_limit" => 100,
            "accounts_per_platform" => 100,
            "team_accounts" => 6,
            "posts_per_account" => 99999,
            "twitter_daily_follows" => 500,
            "twitter_daily_unfollows" => 500
        ]);
    }
}

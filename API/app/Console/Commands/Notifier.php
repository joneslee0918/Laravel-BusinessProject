<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\User;
use App\Notifications\User\AccountDisconnected;
use App\Notifications\User\DependOnSocialAccounts;
use App\Notifications\User\DependOnSocialAccountsSecond;
use App\Notifications\User\FiveHoursAfterSignUp;
use App\Notifications\User\OneDayAfterSignUp;

class Notifier extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notifications to users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Command::info("Fetching channels...");
        if ($users = User::all()) {
            foreach ($users as $user) {
                $user->notify((new AccountDisconnected($user)));
                $user->notify((new DependOnSocialAccounts($user)));
                $user->notify((new DependOnSocialAccountsSecond($user)));
                $user->notify((new FiveHoursAfterSignUp($user)));
                $user->notify((new OneDayAfterSignUp($user)));
            }
        }

        Command::info("DONE");
    }
}

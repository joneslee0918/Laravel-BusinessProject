import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Twitter from '../components/Accounts/Twitter';
import Facebook from '../components/Accounts/Facebook';
import AccountLinks from '../components/Accounts/AccountLinks';

const AccountsRouter = () => (
    <div>
        <Switch>
            <Route path={`/accounts`} exact={true} component={AccountLinks} />
            <Route path={`/accounts/twitter`} component={Twitter} />
            <Route path={`/accounts/facebook`} component={Facebook} />
        </Switch>
    </div>
);

export default AccountsRouter;
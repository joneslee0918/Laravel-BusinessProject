import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Twitter from '../components/Accounts/Twitter';
import Facebook from '../components/Accounts/Facebook';
import Linkedin from '../components/Accounts/Linkedin';
import AccountLinks from '../components/Accounts/AccountLinks';

const AccountsRouter = () => (
    <div>
        <Switch>
            <Route path={`/accounts`} exact={true} component={AccountLinks} />
            <Route path={`/accounts/twitter`} component={Twitter} />
            <Route path={`/accounts/facebook`} component={Facebook} />
            <Route path={`/accounts/linkedin`} component={Linkedin} />
        </Switch>
    </div>
);

export default AccountsRouter;
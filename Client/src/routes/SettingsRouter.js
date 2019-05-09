import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Profile from '../components/Settings/Sections/Profile';
import Billing from '../components/Settings/Sections/Billing';

const SettingsRouter = () => (
    <div>
        <Switch>
            <Route exact path={`/settings`} render={() => <Redirect to="/settings/profile"/>} />
            <Route path={`/settings/profile`} component={Profile} />
            <Route path={`/settings/billing`} component={Billing} />
        </Switch>
    </div>
);

export default SettingsRouter;
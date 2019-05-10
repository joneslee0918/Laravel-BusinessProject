import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Profile from '../components/Settings/Sections/Profile';

const SettingsRouter = () => (
    <div>
        <Switch>
            <Route exact path={`/settings`} render={() => <Redirect to="/settings/profile"/>} />
            <Route path={`/settings/profile`} component={Profile} />
        </Switch>
    </div>
);

export default SettingsRouter;
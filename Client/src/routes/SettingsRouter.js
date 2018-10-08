import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Profile from '../components/Settings/Sections/Profile';

const SettingsRouter = () => (
    <div>
        <Route exact path={`/settings`} render={() => <Redirect to="/settings/profile"/>} />
        <Route path={`/settings/profile`} component={Profile} />
    </div>
);

export default SettingsRouter;
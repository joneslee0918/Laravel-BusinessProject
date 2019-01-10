import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Overview from '../components/Analytics/Sections/Overview';
import Advanced from '../components/Analytics/Sections/Advanced';


const ManageRouter = () => (
    <div>
        <Switch>
            <Route exact path={`/analytics`} render={() => <Redirect to="/analytics/overview"/>} />
            <Route path={`/analytics/overview`} component={Overview} />
            <Route path={`/analytics/advanced`} component={Advanced} />
        </Switch>
    </div>
);

export default ManageRouter;
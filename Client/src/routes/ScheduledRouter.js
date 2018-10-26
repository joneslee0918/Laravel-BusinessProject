import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ScheduledPosts from '../components/Scheduled/Sections/ScheduledPosts';
import PastScheduled from '../components/Scheduled/Sections/PastScheduled';

const ScheduledRouter = () => (
    <div>
        <Switch>
            <Route exact path={`/scheduled`} render={() => <Redirect to="/scheduled/posts"/>} />
            <Route path={`/scheduled/posts`} component={ScheduledPosts} />
            <Route path={`/scheduled/past`} component={PastScheduled} />
        </Switch>
    </div>
);

export default ScheduledRouter;
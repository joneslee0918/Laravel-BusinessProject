import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ScheduledPosts from '../components/Scheduled/Sections/ScheduledPosts';
import PastScheduled from '../components/Scheduled/Sections/PastScheduled';

const ScheduledRouter = () => (
    <div>
        <Route exact path={`/scheduled`} render={() => <Redirect to="/scheduled/posts"/>} />
        <Route path={`/scheduled/posts`} component={ScheduledPosts} />
        <Route path={`/scheduled/past`} component={PastScheduled} />
    </div>
);

export default ScheduledRouter;
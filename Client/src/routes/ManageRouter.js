import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../components/Manage/Sections/Dashboard';
import AccountTargets from '../components/Manage/Sections/AccountTargets';
import KeywordTargets from '../components/Manage/Sections/KeywordTargets';
import Fans from '../components/Manage/Sections/Fans';
import NonFollowers from '../components/Manage/Sections/NonFollowers';
import RecentUnfollowers from '../components/Manage/Sections/RecentUnfollowers';
import RecentFollowers from '../components/Manage/Sections/RecentFollowers';
import InactiveFollowing from '../components/Manage/Sections/InactiveFollowing';
import Following from '../components/Manage/Sections/Following';
import WhiteList from '../components/Manage/Sections/WhiteList';
import BlackList from '../components/Manage/Sections/BlackList';

const ManageRouter = () => (
    <div>
        <Route path={`/manage/dashboard`} component={Dashboard} />
        <Route path={`/manage/account-targets`} component={AccountTargets} />
        <Route path={`/manage/keyword-targets`} component={KeywordTargets} />
        <Route path={`/manage/fans`} component={Fans} />
        <Route path={`/manage/non-followers`} component={NonFollowers} />
        <Route path={`/manage/recent-unfollowers`} component={RecentUnfollowers} />
        <Route path={`/manage/recent-followers`} component={RecentFollowers} />
        <Route path={`/manage/inactive-following`} component={InactiveFollowing} />
        <Route path={`/manage/following`} component={Following} />
        <Route path={`/manage/WhiteList`} component={WhiteList} />
        <Route path={`/manage/BlackList`} component={BlackList} />
    </div>
);

export default ManageRouter;
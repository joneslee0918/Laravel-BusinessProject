import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../components/Manage/Dashboard';
import AccountTargets from '../components/Manage/AccountTargets';
import KeywordTargets from '../components/Manage/KeywordTargets';
import Fans from '../components/Manage/Fans';
import NonFollowers from '../components/Manage/NonFollowers';
import RecentUnfollowers from '../components/Manage/RecentUnfollowers';
import RecentFollowers from '../components/Manage/RecentFollowers';
import InactiveFollowing from '../components/Manage/InactiveFollowing';
import Following from '../components/Manage/Following';
import WhiteList from '../components/Manage/WhiteList';
import BlackList from '../components/Manage/BlackList';

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
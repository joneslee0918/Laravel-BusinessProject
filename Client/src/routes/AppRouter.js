import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Manage from "../components/Manage/Manage";
import Scheduled from "../components/Scheduled/Scheduled";
import Accounts from "../components/Accounts/Accounts";
import LoginPage from "../components/LoginPage";
import TopMenu from "../components/Menus/TopMenu";
import NotFoundPage from "../components/NotFoundPage";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <TopMenu />
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/manage" component={Manage} />
                <Route path="/scheduled" component={Scheduled} />
                <Route path="/accounts" component={Accounts} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
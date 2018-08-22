import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Manage from "../components/Manage";
import Scheduled from "../components/Scheduled";
import Accounts from "../components/Accounts";
import LoginPage from "../components/LoginPage";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/manage/dashboard" component={Manage} />
                <Route path="/scheduled" component={Scheduled} />
                <Route path="/accounts" component={Accounts} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
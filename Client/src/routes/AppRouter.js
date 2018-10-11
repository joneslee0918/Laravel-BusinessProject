import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Manage from "../components/Manage/Manage";
import Scheduled from "../components/Scheduled/Scheduled";
import Accounts from "../components/Accounts/Accounts";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/manage" component={Manage} />
                <PrivateRoute path="/scheduled" component={Scheduled} />
                <PrivateRoute path="/accounts" component={Accounts} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
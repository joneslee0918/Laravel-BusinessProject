import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Manage from "../components/Manage/Manage";
import Scheduled from "../components/Scheduled/Scheduled";
import Accounts from "../components/Accounts/Accounts";
import Settings from "../components/Settings/Settings";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

class AppRouter extends React.Component {
    render(){
        return  (
            <Router history={history}>
                <div>
                    <Switch>
                        <PublicRoute path="/" component={LoginPage} exact={true}/>
                        <PrivateRoute path="/manage" component={Manage} />
                        <PrivateRoute path="/scheduled" component={Scheduled} />
                        <PrivateRoute path="/accounts" component={Accounts} />
                        <PrivateRoute path="/settings" component={Settings} />
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;
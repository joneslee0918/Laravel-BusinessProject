import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import TopMenu from "../components/Menus/TopMenu";
import Composer from "../components/Compose";
import EmailChecker from "../components/EmailChecker";
import ActiveChecker from "../components/ActiveChecker";
import Middleware from "../components/Middleware";

export const PrivateRoute = ({
    isAuthenticated, 
    middleware,
    component: Component, 
    ...rest}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? 
        (   (!!middleware)
            ? 
            <div>
                <Middleware />
            </div>
            :
            <div>
                <TopMenu />
                <Component {...props} />
                <Composer />
                <EmailChecker />
                <ActiveChecker />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
    middleware: state.middleware.step
});

export default connect(mapStateToProps)(PrivateRoute);
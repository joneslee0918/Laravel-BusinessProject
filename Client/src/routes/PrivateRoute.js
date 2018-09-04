import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import TopMenu from "../components/Menus/TopMenu";
import Composer from "../components/Compose";

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component, 
    ...rest}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? 
        (   <div>
                <TopMenu />
                <Component {...props} />
                <Composer />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
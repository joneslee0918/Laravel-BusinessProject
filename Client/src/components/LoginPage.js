import React from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";

const LoginPage = ({startLogin}) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(login(1))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
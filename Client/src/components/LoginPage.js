import React from 'react';
import {connect} from "react-redux";
import {startLogin} from "../actions/auth";
import TwitterLogin  from "react-twitter-auth";

export class LoginPage extends React.Component{
    onFailure = (response) => {console.log(response)};
    onSuccess = (response) => {console.log(response)};
    render(){
        return (
              <div>
        <button onClick={startLogin}>Login</button>
        <TwitterLogin loginUrl="http://uniclix.test/api/twitter/login"
                    onFailure={this.onFailure} onSuccess={this.onSuccess}
                    requestTokenUrl="http://uniclix.test/api/twitter/reverse"
                    showIcon={true}>
            <b>Custom</b> Twitter <i>Login</i> content
        </TwitterLogin>
        </div>  
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
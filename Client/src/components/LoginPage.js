import React from 'react';
import {connect} from "react-redux";
import TwitterLogin  from "react-twitter-auth";
import {startLogin} from "../actions/auth";
import {twitterRequestTokenUrl, twitterAccessTokenUrl} from "../config/api";

export class LoginPage extends React.Component{

    constructor(props) {
        super(props);
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        response.json().then(body => {
            this.props.startLogin(body);
        });
    };

    render(){
        return (
            <div>
            <TwitterLogin loginUrl={twitterAccessTokenUrl}
                        onFailure={this.onFailure} onSuccess={this.onSuccess}
                        requestTokenUrl={twitterRequestTokenUrl}
                        showIcon={true}
                        >
            </TwitterLogin>
            </div>  
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (body) => dispatch(startLogin(body))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
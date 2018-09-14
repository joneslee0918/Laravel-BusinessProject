import React from 'react';
import {connect} from "react-redux";
import TwitterLogin  from "react-twitter-auth";
import {startLogin} from "../actions/auth";
import {startSetChannels} from "../actions/channels";
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
            this.props.startLogin(body).then(() => {
                this.props.startSetChannels();
            });
        });
    };

    render(){
        return (
            <div className="login-container">

                <div className="box-container">
                    <a href="#" className="brand"><img src="/images/uniclix.png"/></a>
                    <div className="divider"></div>
                    <TwitterLogin loginUrl={twitterAccessTokenUrl}
                                onFailure={this.onFailure} onSuccess={this.onSuccess}
                                requestTokenUrl={twitterRequestTokenUrl}
                                showIcon={false}
                                >
                    </TwitterLogin>
                </div>
            </div>  
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (body) => dispatch(startLogin(body)),
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
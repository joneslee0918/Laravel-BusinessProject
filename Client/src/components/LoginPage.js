import React from 'react';
import {connect} from "react-redux";
import TwitterLogin  from "react-twitter-auth";
import {startLogin} from "../actions/auth";
import {startSetChannels} from "../actions/channels";
import {startSetProfile} from "../actions/profile";
import {twitterRequestTokenUrl, twitterAccessTokenUrl, backendUrl} from "../config/api";
import {LoaderWithOverlay} from "./Loader";

export class LoginPage extends React.Component{

    state = {
        loading: false
    }

    constructor(props) {
        super(props);
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        this.setState(() => ({loading: true}));
        response.json().then(body => {
            this.props.startLogin(body).then(() => {
                this.props.startSetProfile();
                this.props.startSetChannels();
                //this.setState(() => ({loading: false}));
            });
        });
    };

    render(){
        return (
            <div className="login-container">
                {this.state.loading && <LoaderWithOverlay />}
                <div className="box-container">
                    <a href={backendUrl} className="brand"><img src="/images/uniclix.png"/></a>
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
    startSetProfile: () => dispatch(startSetProfile()),
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
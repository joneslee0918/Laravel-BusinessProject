import React from 'react';
import {connect} from "react-redux";
import TwitterLogin  from "react-twitter-auth";
import FacebookLogin from 'react-facebook-login';
import {startLogin} from "../actions/auth";
import {startSetChannels} from "../actions/channels";
import {startSetProfile} from "../actions/profile";
import {twitterRequestTokenUrl, twitterAccessTokenUrl, backendUrl, facebookAppId} from "../config/api";
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

    onTwitterSuccess = (response) => {
        this.setState(() => ({loading: true}));
        response.json().then(body => {
            this.props.startLogin(body, "twitter").then(() => {
                this.props.startSetProfile();
                this.props.startSetChannels();
            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        });
    };

    onFacebookSuccess = (response) => {
        this.setState(() => ({loading: true}));
        this.props.startLogin(response, "facebook").then(() => {
            this.props.startSetProfile();
            this.props.startSetChannels();
        }).catch(error => {
            this.setState(() => ({loading: false}));
        });;
    };

    render(){
        return (
            <div className="login-container">
                {this.state.loading && <LoaderWithOverlay />}
                <div className="box-container">
                    <a href={backendUrl} className="brand"><img className="brand-img" src="/images/uniclix.png"/></a>
                    <div className="divider"></div>
                    <TwitterLogin loginUrl={twitterAccessTokenUrl}
                                onFailure={this.onFailure} onSuccess={this.onTwitterSuccess}
                                requestTokenUrl={twitterRequestTokenUrl}
                                showIcon={false}
                                >
                    </TwitterLogin>

                    <FacebookLogin
                        appId={facebookAppId}
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="manage_pages,publish_pages,pages_show_list,publish_to_groups,groups_access_member_info,public_profile,email"
                        callback={this.onFacebookSuccess} />
                </div>
            </div>  
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (body, network) => dispatch(startLogin(body, network)),
    startSetProfile: () => dispatch(startSetProfile()),
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
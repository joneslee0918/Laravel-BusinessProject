import React from 'react';
import {connect} from "react-redux";
import TwitterLogin  from "react-twitter-auth";
import FacebookLogin from 'react-facebook-login';
import {startLogin} from "../actions/auth";
import {startSetChannels} from "../actions/channels";
import {startSetProfile} from "../actions/profile";
import {twitterRequestTokenUrl, twitterAccessTokenUrl, backendUrl, facebookAppId, linkedinAppId} from "../config/api";
import {LoaderWithOverlay} from "./Loader";
import LinkedInButton from "./LinkedInButton";

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
        });
    };

    onLinkedInSuccess = (response) => {
       const token = response._token.accessToken;
       const params = `grant_type=authorization_code&code=${token}&redirect_uri=https://web.uniclix.test&client_id=77d3j1o1cby4cc&client_secret=yCi4G6otW7j6hzWT`;
       const url = "https://www.linkedin.com/oauth/v2/accessToken?";
        // const result = axios.get(`${url}${params}`)
        //     .then((response) => {
        //         console.log(response);
        //         return response.data;
        //     });
        // this.setState(() => ({loading: true}));
        // this.props.startLogin(response, "linkedin").then(() => {
        //     this.props.startSetProfile();
        //     this.props.startSetChannels();
        // }).catch(error => {
        //     this.setState(() => ({loading: false}));
        // });
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

                    <LinkedInButton 
                        clientId={linkedinAppId}
                        redirectUri={`${backendUrl}/api/linkedin/callback`}
                    />
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
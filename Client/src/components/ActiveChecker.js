import React from 'react';
import {connect} from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import Modal from 'react-modal';
import {startSetChannels, startAddFacebookChannel, startAddLinkedinChannel, startAddPinterestChannel, startAddTwitterChannel} from "../actions/channels";
import {getAccounts, saveAccounts} from "../requests/facebook/channels";
import FacebookLogin from 'react-facebook-login';
import {twitterRequestTokenUrl, twitterAccessTokenUrl, backendUrl, facebookAppId, linkedinAppId, pinterestAppId} from "../config/api";
import LinkedInButton from "./LinkedInButton";
import PinterestButton from "./PinterestButton";
import channelSelector, {findAccounts} from "../selectors/channels";
import Loader from "./Loader";


class ActiveChecker extends React.Component{

    state = {
        active: true,
        error: false,
        loading: false
    }

    componentDidMount() {
        this.setState(() => ({
            active: this.props.selectedChannel ? this.props.selectedChannel.active : false
        }));
    }

    componentDidUpdate(prevProps) {
        if(prevProps.selectedChannel !== this.props.selectedChannel){
            this.setState(() => ({
                active: this.props.selectedChannel ? this.props.selectedChannel.active : false
            }));
        }
    }

    onFailure = (response) => {
        console.log(response);
    };

    onTwitterSuccess = (response) => {
        this.setState(() => ({loading: true}));

        try{
            response.json().then(body => {
                this.props.startAddTwitterChannel(body.oauth_token, body.oauth_token_secret)
                .then(response => {
                    this.setState(() => ({loading: false}));
                }).catch(error => {
                    this.setState(() => ({loading: false}));
                });
            });
        }catch(e){}
    };

    onFacebookSuccess = (response) => {
        try{
            this.setState(() => ({loading: true}));
            this.props.startAddFacebookChannel(response.accessToken).then(() => {

                if(this.props.selectedChannel.account_type == "profile"){
                    this.setState(() => ({loading: false}));
                    return;
                }else{
                    getAccounts().then((response) => {
                        const accounts = findAccounts(response, {prop: this.props.selectedChannel.details.original_id});
                        
                        if(accounts.length){
                            saveAccounts(accounts)
                            .then(() => {
                                this.props.startSetChannels();
                                this.setState(() => ({loading: false}));
                            }).catch( error => {
                                this.setState(() => ({
                                    error: "Something went wrong!",
                                    loading: false
                                }));
                            });
                        }
                    });
                }


            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        }catch(e){}

    };

    onLinkedInSuccess = (response) => {
        try{
            this.setState(() => ({loading: true}));
            this.props.startAddLinkedinChannel(response.accessToken).then(() => {
                this.setState(() => ({loading: false}));
            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        }catch(e){}
    };

    onPinterestSuccess = (response) => {
        try{
            this.setState(() => ({loading: true}));
            this.props.startAddPinterestChannel(response.accessToken).then(() => {
                this.setState(() => ({loading: false}));
            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        }catch(e){}
    };

    render(){

        const {selectedChannel} = this.props; 

        const LoginButton = () => {
            if(selectedChannel.type == "twitter"){
                return (
                        <TwitterLogin loginUrl={twitterAccessTokenUrl}
                                    onFailure={this.onFailure} onSuccess={this.onTwitterSuccess}
                                    requestTokenUrl={twitterRequestTokenUrl}
                                    showIcon={false}
                                    forceLogin={true}
                                    >
                        </TwitterLogin>
                        );
            }else if(selectedChannel.type == "facebook"){
               return (
                    <FacebookLogin
                    appId={facebookAppId}
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="manage_pages,publish_pages,pages_show_list,publish_to_groups,public_profile,email"
                    callback={this.onFacebookSuccess} />
               );
            }else if(selectedChannel.type == "linkedin"){
                return (
                    <LinkedInButton 
                        clientId={linkedinAppId}
                        redirectUri={`${backendUrl}/api/linkedin/callback`}
                        onSuccess={this.onLinkedInSuccess}
                        onError={this.onFailure}
                    />
                );
             }else if(selectedChannel.type == "pinterest"){
                return (
                    <PinterestButton 
                    clientId={pinterestAppId}
                    redirectUri={`${backendUrl}/api/pinterest/callback`}
                    onSuccess={this.onPinterestSuccess}
                    onError={this.onFailure}
                    />
                );
             }else{
                 return (<div></div>);
             }
        };

        return (
            <div>
                <Modal
                isOpen={!!this.state.active == false}
                ariaHideApp={false}
                >       

                    <div className="form-group flex_container-center center-inline">
                        {this.state.loading && <Loader />}
                        <div>
                            <h3>Login required!</h3>
                            <p> It seems like your <strong>{selectedChannel.type}</strong> account <strong>{selectedChannel.name}</strong> has been disconnected. 
                            Please reconnect and continue your progress by pressing the button below.
                            <br/><br/>
                            <strong>Important: Please make sure that you are logged out from any other {selectedChannel.type} account first!</strong>
                            </p>
                        </div>
                    </div>
                    <div className="center-inline top-border p10 m10-top social-login">
                        <LoginButton />
                        {!!this.props.loading && <Loader />}
                    </div>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const filter = {selected: 1, provider: undefined};
    const selectedChannel = channelSelector(state.channels.list, filter);

    return {
        channelsLoading: state.channels.loading,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels()),
    startAddFacebookChannel: (token) => dispatch(startAddFacebookChannel(token)),
    startAddTwitterChannel: (token, secret) => dispatch(startAddTwitterChannel(token, secret)),
    startAddLinkedinChannel: (token) => dispatch(startAddLinkedinChannel(token)),
    startAddPinterestChannel: (token) => dispatch(startAddPinterestChannel(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChecker);
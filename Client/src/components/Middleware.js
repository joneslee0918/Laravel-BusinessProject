import React from 'react';
import {connect} from 'react-redux';
import { setMiddleware } from '../actions/middleware';
import TwitterLogin from 'react-twitter-auth';
import Modal from 'react-modal';
import {startSetChannels, startAddFacebookChannel, startAddLinkedinChannel, startAddPinterestChannel, startAddTwitterChannel} from "../actions/channels";
import {getAccounts, saveAccounts} from "../requests/facebook/channels";
import FacebookLogin from 'react-facebook-login';
import {twitterRequestTokenUrl, twitterAccessTokenUrl, backendUrl, facebookAppId, linkedinAppId, pinterestAppId} from "../config/api";
import LinkedInButton from "./LinkedInButton";
import PinterestButton from "./PinterestButton";
import channelSelector, {findAccounts} from "../selectors/channels";
import {fbFields, fbScope} from "./FacebookButton";
import {destroyChannel} from "../requests/channels";
import Loader, {LoaderWithOverlay} from './Loader';

class Middleware extends React.Component{

    state = {
        continueBtn: this.props.channels.length > 0,
        loading: false
    }

    twitterRef = React.createRef();
    facebookRef = React.createRef();
    linkedinRef = React.createRef();

    componentDidMount(){
       const middleware = this.props.channels.length < 1;
       if(!middleware) this.props.setMiddleware(false);
    }

    componentDidUpdate(prevProps){
        if(prevProps.channels !== this.props.channels){
            this.setState(() => ({
                continueBtn: this.props.channels.length > 0
            }));
        }
    }

    onFailure = (response) => {
        this.setState(() => ({loading: false}));
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
            const accountId = this.props.selectedChannel.details.original_id;
            this.props.startAddFacebookChannel(response.accessToken).then(() => {

                if(this.props.selectedChannel.account_type == "profile"){
                    this.setState(() => ({loading: false}));
                    return;
                }else{
                    getAccounts().then((response) => {
                        const accounts = findAccounts(response, {prop: accountId});
            
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
        }catch(e){
            this.setState(() => ({loading: false}));
        }

    };

    onLinkedInSuccess = (response) => {
        try{
            this.setState(() => ({loading: true}));
            this.props.startAddLinkedinChannel(response.accessToken).then(() => {
                this.setState(() => ({loading: false}));
            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        }catch(e){
            this.setState(() => ({loading: false}));
        }
    };

    onPinterestSuccess = (response) => {
        try{
            this.setState(() => ({loading: true}));
            this.props.startAddPinterestChannel(response.accessToken).then(() => {
                this.setState(() => ({loading: false}));
            }).catch(error => {
                this.setState(() => ({loading: false}));
            });
        }catch(e){
            this.setState(() => ({loading: false}));
        }
    };

    remove = (id) => {
        this.setState(() => ({loading: true}));
        return destroyChannel(id)
        .then((response) => {
            this.setState(() => ({loading: false}));
            this.props.startSetChannels()
            .then((response) => {
                // if(response.length < 1){
                //     this.props.logout();
                // }
            });
        }).catch((e) => {
            this.setState(() => ({loading: false}));
            if(typeof e.response !== "undefined" && typeof e.response.data.error !== "undefined"){
                this.setState(() => ({
                    error: e.response.data.error
                }));
                return;
            }
        });
    }

    render(){
        const {middleware, channels} = this.props;
        const {continueBtn, loading} = this.state;
        return (
            <div className="middleware">

                {middleware !== "loading" && <h2>{middleware === "channels" ? "Connect your social profiles." : "Start Your Free Trial"}</h2>}
                {middleware !== "channels" && middleware !== "billing" && <Loader />}
                {loading && <LoaderWithOverlay />}
                
                {middleware == "channels" &&
                <div className="box channels-box">
                    
                    {channels.length > 0 && <div className="channel-profile-container">                    
                        <h5>Connect your social profiles:</h5>

                        <div className="channel-profiles">
                            
                            {channels.map(channel => (
                                <div key={channel.id} className="channel-profile-box col-xs-12">
                                    <img className="channel-profile-picture" src="https://uniclix.test/images/logo.png" />
                                    <div className="channel-profile-info">                                
                                        <p className="channel-profile-name">{channel.name}</p>
                                        <p className="channel-profile-type">{channel.type}</p>
                                    </div>
                                    <i className="fa fa-close" onClick={() => this.remove(channel.id)}></i>
                                </div>  
                            ))}
                        </div>
                    </div>}


                    <div className="col-md-12">
                        <h5>Click one of the buttons below to get started:</h5>
                    </div>
                    
                    <div className="channel-buttons">
                        <div className="col-md-4 col-xs-12">
                            <button className="facebook_bg col-xs-12" onClick={(e) => this.facebookRef.current.click()}> <i className="fa fa-facebook"></i> Facebook</button>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <button className="twitter_bg col-xs-12" onClick={(e) => this.twitterRef.current.onButtonClick(e)}> <i className="fa fa-twitter"></i> Twitter</button>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <button className="linkedin_bg col-xs-12" onClick={(e) => console.log(this.linkedinRef.current)}> <i className="fa fa-linkedin"></i> Linkedin</button>
                        </div>

                        <TwitterLogin loginUrl={twitterAccessTokenUrl}
                            onFailure={this.onFailure} onSuccess={this.onTwitterSuccess}
                            requestTokenUrl={twitterRequestTokenUrl}
                            showIcon={false}
                            forceLogin={true}
                            className="hide"
                            ref={this.twitterRef}
                        ></TwitterLogin>

                        <FacebookLogin
                            appId={facebookAppId}
                            autoLoad={false}
                            fields={fbFields}
                            scope={fbScope}
                            callback={this.onFacebookSuccess} 
                            cssClass="hide"
                            onClick={() => console.log("clicked")}
                            ref={this.facebookRef}
                        />

                        <LinkedInButton 
                            clientId={linkedinAppId}
                            redirectUri={`${backendUrl}/api/linkedin/callback`}
                            onSuccess={this.onLinkedInSuccess}
                            onError={this.onFailure}
                            cssClass="hide"
                            ref={this.linkedinRef}
                        />
                    
                    </div>

                    {   
                        continueBtn ?
                        <button className="magento-btn mt50" onClick={() => this.props.setMiddleware(false)}>Continue to Uniclix</button>
                        :
                        <button className="magento-btn mt50 disabled-btn">Continue to Uniclix</button>
                    }
                </div>
                }

                {middleware == "billing" &&
                <div className="box channels-box">
                    <h5>Select Your Billing Cycle</h5>
                    <div className="plan-box">
                    
                    </div>
                    <div className="plan-box"></div>
                    
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    middleware: state.middleware.step,
    channels: state.channels.list
});

const mapDispatchToProps = (dispatch) => ({
    setMiddleware: (middleware) => dispatch(setMiddleware(middleware)),
    startSetChannels: () => dispatch(startSetChannels()),
    startAddFacebookChannel: (token) => dispatch(startAddFacebookChannel(token)),
    startAddTwitterChannel: (token, secret) => dispatch(startAddTwitterChannel(token, secret)),
    startAddLinkedinChannel: (token) => dispatch(startAddLinkedinChannel(token)),
    startAddPinterestChannel: (token) => dispatch(startAddPinterestChannel(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Middleware);
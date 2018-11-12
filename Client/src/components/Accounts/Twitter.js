import React from 'react';
import {connect} from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import SweetAlert from "sweetalert2-react";
import {twitterRequestTokenUrl, twitterAccessTokenUrl} from "../../config/api";
import {startAddTwitterChannel, startSetChannels} from "../../actions/channels";
import channelSelector from "../../selectors/channels";
import {destroyChannel} from "../../requests/channels";
import {logout} from "../../actions/auth";
import Loader from "../../components/Loader";

class Twitter extends React.Component {
    constructor(props) {
        super(props);
    }

    defaultAction = {
        id: "",
        type: ""
    };

    state = {
        action: this.defaultAction
    }

    setAction = (action = this.defaultAction) => {
        this.setState(() => ({
            action
        }));
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        response.json().then(body => {
            this.props.startAddTwitterChannel(body.oauth_token, body.oauth_token_secret);
        });
    };

    remove = (id) => {
        return destroyChannel(id)
        .then((response) => {
            this.props.startSetChannels()
            .then((response) => {
                if(response.length < 1){
                    this.props.logout();
                }
            });
        }).catch((error) => {

        });
    }

    render(){
        return (
            <div className="accounts-container">

                <SweetAlert
                    show={!!this.state.action.id}
                    title={`Do you wish to ${this.state.action.type} this item?`}
                    text="To confirm your decision, please click one of the buttons below."
                    showCancelButton
                    type="warning"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    onConfirm={() => {
                        if(this.state.action.type === 'delete'){
                            this.remove(this.state.action.id);
                        }else{
                            console.log('something went wrong');
                        }
                        this.setAction();
                    }}
                />

                <h2>HAVE TWITTER ACCOUNTS?</h2>
                <p>Connect them all, and we'll help you get the right audience.</p>
                
                <div className="flex_container-center">
                    <div className="accounts-container__logo col-md-1">
                        <div>
                            <i className="fa fa-twitter"></i>
                        </div>
                    </div>
                    <div className="accounts-container__content col-md-10">
                        <div className="accounts-container__content__wrapper">
                            <div className="accounts-container__content__wrapper__heading">
                                <h2>Let's grow your audience using Facebook!</h2>
                            </div> 
                            
                            <ChannelItems channels={this.props.channels} setAction={this.setAction} /> 
                            {!!this.props.loading && <Loader />}
                        </div> 
            
                        <div className="accounts-container__content__wrapper__footer">
                            <TwitterLogin loginUrl={twitterAccessTokenUrl}
                                        onFailure={this.onFailure} onSuccess={this.onSuccess}
                                        requestTokenUrl={twitterRequestTokenUrl}
                                        showIcon={true}
                                        forceLogin={true}
                                        className="add-channel-plus-btn">
                                        <i className="fa fa-plus"></i>
                            </TwitterLogin>
                            <span className="left-side-label">Have an account? Let's connect!</span>
                        </div> 
                    </div>
                </div>
              
            </div>
        );
    };
} 

const ChannelItems = ({ channels, setAction }) => (
    channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} setAction={setAction} />
    ))
);

const ChannelItem = ({ channel, setAction }) => (
    <div className="accounts-container__content__wrapper__body">
        <div className="channel-container">
            <a href="#" className="block-urls">
                <div className="profile-info pull-right">
                    <img className="pull-left" src={channel.avatar} />
                    <div className="pull-left">
                        <p className="profile-name">{channel.name}</p>
                        <p className="profile-username">@{channel.username}</p>
                    </div>
                    <div className="item-actions pull-right">
                        <div className="trash-btn" onClick={() => setAction({id: channel.id, type: "delete"})}><i className="fa fa-trash"></i> <span className="delete-text"> Delete</span></div>
                    </div>
                </div>
            </a>
        </div>
    </div>
);

const mapStateToProps = (state) => {

    const twitterChannelsFilter = {selected: undefined, provider: "twitter"};
    const channels = channelSelector(state.channels.list, twitterChannelsFilter);
    return {
        channels,
        loading: state.channels.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddTwitterChannel: (accessToken, accessTokenSecret) => dispatch(startAddTwitterChannel(accessToken, accessTokenSecret)),
    startSetChannels: () => dispatch(startSetChannels()),
    logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(Twitter);
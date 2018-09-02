import React from 'react';
import {connect} from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import {twitterRequestTokenUrl, twitterAccessTokenUrl} from "../../config/api";
import {startAddTwitterChannel} from "../../actions/channels";
import channelSelector from "../../selectors/channels";
import Loader from "../../components/Loader";

class Accounts extends React.Component {
    constructor(props) {
        super(props);
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        response.json().then(body => {
            this.props.startAddTwitterChannel(body.oauth_token, body.oauth_token_secret);
        });
    };

    render(){
        return (
            <div className="accounts-container">
                <h2>HAVE MORE TWITTER ACCOUNTS?</h2>
                <p>Connect them all, and we'll help you get the right audience.</p>
                
                <div className="accounts-container__logo col-md-1">
                    <div>
                        <i className="fa fa-twitter"></i>
                    </div>
                </div>
                <div className="accounts-container__content col-md-10">
                    <div className="accounts-container__content__wrapper">
                        <div className="accounts-container__content__wrapper__heading">
                            <h2>Let's grow your audience using Twitter!</h2>
                        </div> 
                        
                        <ChannelItems channels={this.props.channels} /> 
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
                        <span className="left-side-label">Have another account? Let's connect!</span>
                    </div> 
                </div>
            </div>
        );
    };
} 

const ChannelItems = ({ channels }) => (
    channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel}/>
    ))
);

const ChannelItem = ({ channel }) => (
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
                        <i className="fa fa-trash"></i>
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
    startAddTwitterChannel: (accessToken, accessTokenSecret) => dispatch(startAddTwitterChannel(accessToken, accessTokenSecret))
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
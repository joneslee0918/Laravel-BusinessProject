import React from 'react';
import {connect} from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import Modal from 'react-modal';
import {twitterRequestTokenUrl, twitterAccessTokenUrl} from "../config/api";
import {startAddTwitterChannel, startSetChannels} from "../actions/channels";
import channelSelector from "../selectors/channels";
import Loader from "./Loader";


class ActiveChecker extends React.Component{

    state = {
        active: true
    }

    componentDidMount() {
        this.setState(() => ({
            active: this.props.selectedChannel ? this.props.selectedChannel.active : true
        }));
    }

    componentDidUpdate(prevProps) {
        if(prevProps.selectedChannel !== this.props.selectedChannel){
            this.setState(() => ({
                active: this.props.selectedChannel ? this.props.selectedChannel.active : true
            }));
        }
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
            <div>
                <Modal
                isOpen={!!this.state.active == false}
                ariaHideApp={false}
                >       

                    <div className="form-group flex_container-center center-inline">
                        <div>
                            <h3>Account login required!</h3>
                            <p> It seems like your current account has been disconnected. 
                            Please reconnect and continue your progress by pressing the button below.
                            <br/><br/>
                            <strong>Important: Please make sure that you are logged out from any other account first!</strong>
                            </p>
                        </div>
                    </div>
                    <div className="center-inline top-border p10 m10-top">
                    
                        <TwitterLogin loginUrl={twitterAccessTokenUrl}
                            onFailure={this.onFailure} onSuccess={this.onSuccess}
                            requestTokenUrl={twitterRequestTokenUrl}
                            showIcon={true}
                            forceLogin={true}
                            className="upgrade-btn">
                            Reconnect
                        </TwitterLogin>
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
    startAddTwitterChannel: (accessToken, accessTokenSecret) => dispatch(startAddTwitterChannel(accessToken, accessTokenSecret)),
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChecker);
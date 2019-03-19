import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import channelSelector, {streamChannels} from '../../selectors/channels';

class StreamCreator extends React.Component{

    state = {
        selectedAccount:  Object.entries(this.props.selectedChannel).length ? 
        {label: <ProfileChannel channel={this.props.selectedChannel} />, value: this.props.selectedChannel.id, type: this.props.selectedChannel.type} : 
        (this.props.channels.length ? 
          {label: <ProfileChannel channel={this.props.channels[0]} />, value: this.props.channels[0].id, type: this.props.channels[0].type} : {})
    }

    handleAccountChange = (selectedAccount) => {
        this.setState(() => ({
            selectedAccount
        }));
    };

    render(){
        return (<div className="streams-default-container">
                    <div className="account-selection">
                        <Select
                            value={this.state.selectedAccount}
                            onChange={this.handleAccountChange}
                            options={this.props.channels.map(channel => {
                                return {label: <ProfileChannel channel={channel} />, value: channel.id, type: channel.type}
                            })}
                        />
                    </div>
                    <div className="streams-default">

                            <div className="selection-item">
                                <i className="fa fa-home"></i>
                                <span>Home</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-at"></i>
                                <span>Mentions</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-retweet"></i>
                                <span>Retweets</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-heart"></i>
                                <span>Likes</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-mail-forward"></i>
                                <span>My Tweets</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-search"></i>
                                <span>Search</span>
                            </div>
                            <div className="selection-item">
                                <i className="fa fa-clock-o"></i>
                                <span>Scheduled</span>
                            </div>

                    </div>
                </div>);
    }
}

const ProfileChannel = ({channel}) => (
    <div className="channel-container">
        <div className="profile-info pull-right">
            <span className="pull-left profile-img-container">
                <img src={channel.avatar}/>
                <i className={`fa fa-${channel.type} ${channel.type}_bg smallIcon`}></i>
            </span>
            <div className="pull-left"><p className="profile-name" title={channel.name}>{channel.name}</p>
            <p className="profile-username">{channel.username !== null ? "@"+channel.username : ""}</p>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    const channels = streamChannels(state.channels.list);
    const selectedChannel = channelSelector(channels, {selected: 1});
    
    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    }
}


export default connect(mapStateToProps)(StreamCreator);
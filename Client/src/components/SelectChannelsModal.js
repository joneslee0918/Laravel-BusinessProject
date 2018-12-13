import React from 'react';
import {connect} from 'react-redux';
import channelSelector from '../selectors/channels';

class SelectChannelsModal extends React.Component{

    state = {
        twitterSelect: false,
        facebookSelect: false
    }

    toggleTwitterSelect = () => {
        this.setState(() => ({
            twitterSelect: !this.state.twitterSelect
        }));
    };

    toggleFacebookSelect = () => {
        this.setState(() => ({
            facebookSelect: !this.state.facebookSelect
        }));
    };

    onAddAccountsClick = () => {
        window.location.href = "/accounts";
    };

    render(){

        const {channels, onChange, toggle} = this.props;

        const twitterChannels = channelSelector(channels, {selected: undefined, provider: "twitter"});
        const facebookChannels = channelSelector(channels, {selected: undefined, provider: "facebook"});

        return (
            <div className="modal-content">
                <button className="upgrade-btn m10" onClick={this.onAddAccountsClick}><i className="fa fa-plus"></i> Add accounts</button>
                <div className="modal-body scrollable-400">
                    
                    {!!twitterChannels.length &&
                        <h3 className="bg-heading" onClick={this.toggleTwitterSelect}>
                        <i className="fa fa-twitter"> </i> Twitter
                        {this.state.twitterSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                        </h3>
                    }
                    {!!twitterChannels.length && this.state.twitterSelect &&
                        
                        twitterChannels.map((channel) => (
                                <label key={channel.id} className="channel-item selection-container">
                                    <input type="radio" onChange={() => onChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="twitter_channel" />
                                    <span className="checkmark round"></span>
                                    <img className="avatar-box" src={channel.avatar} /> {channel.name}
                                </label>
                        )
                    )}
        
                    {!!facebookChannels.length &&
                        <h3 className="bg-heading" onClick={this.toggleFacebookSelect}>
                        <i className="fa fa-facebook"> </i> Facebook
                        {this.state.facebookSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                        </h3>
                    }
                    {!!facebookChannels.length && this.state.facebookSelect &&
                        
                        facebookChannels.map((channel) => (
                                <label key={channel.id} className="channel-item selection-container">
                                    <input type="checkbox" onChange={() => onChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="facebook_channel" />
                                    <span className="checkmark"></span>
                                    <img className="avatar-box" src={channel.avatar} /> {channel.name}
                                </label>
                        )
                    )}
                </div>
        
                <div className="modal-footer">
                    <div onClick={toggle} className="publish-btn-group gradient-background-teal-blue link-cursor pull-right">
                        <button className="publish-btn naked-button">Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectChannelsModal;
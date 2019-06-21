import React from 'react';
import channelSelector from '../selectors/channels';
import { withRouter } from 'react-router';

class SelectChannelsModal extends React.Component{

    state = {
        twitterSelect: false,
        facebookSelect: false,
        linkedinSelect: false,
        pinterestSelect: false
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

    toggleLinkedinSelect = () => {
        this.setState(() => ({
            linkedinSelect: !this.state.linkedinSelect
        }));
    };

    togglePinterestSelect = () => {
        this.setState(() => ({
            pinterestSelect: !this.state.pinterestSelect
        }));
    };

    onAddAccountsClick = () => {
        this.props.toggleComposer();
        this.props.toggle();
        return this.props.history.push(`/accounts`);
    };

    render(){

        const {channels, onChange, toggle} = this.props;

        const twitterChannels = channelSelector(channels, {selected: undefined, provider: "twitter"});
        const facebookChannels = channelSelector(channels, {selected: undefined, provider: "facebook"});
        const linkedinChannels = channelSelector(channels, {selected: undefined, provider: "linkedin"});
        const pinterestChannels = channelSelector(channels, {selected: undefined, provider: "pinterest"});

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
                                    <img className="avatar-box" onError={(e) => e.target.src='/images/dummy_profile.png'} src={channel.avatar} /> {channel.name}
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
                                    <img className="avatar-box" onError={(e) => e.target.src='/images/dummy_profile.png'} src={channel.avatar} /> {channel.name}
                                </label>
                        )
                    )}

                    {!!linkedinChannels.length &&
                        <h3 className="bg-heading" onClick={this.toggleLinkedinSelect}>
                        <i className="fa fa-linkedin"> </i> Linkedin
                        {this.state.linkedinSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                        </h3>
                    }
                    {!!linkedinChannels.length && this.state.linkedinSelect &&
                        
                        linkedinChannels.map((channel) => (
                                <label key={channel.id} className="channel-item selection-container">
                                    <input type="checkbox" onChange={() => onChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="linkedin_channel" />
                                    <span className="checkmark"></span>
                                    <img className="avatar-box" onError={(e) => e.target.src='/images/dummy_profile.png'} src={channel.avatar} /> {channel.name}
                                </label>
                        )
                    )}

                    {!!pinterestChannels.length &&
                        <h3 className="bg-heading" onClick={this.togglePinterestSelect}>
                        <i className="fa fa-pinterest"> </i> Pinterest
                        {this.state.pinterestSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                        </h3>
                    }
                    {!!pinterestChannels.length &&                                                                                                                                                                          this.state.pinterestSelect &&
                        
                        pinterestChannels.map((channel) => (
                                <label key={channel.id} className="channel-item selection-container">
                                    <input type="checkbox" onChange={() => onChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="pinterest_channel" />
                                    <span className="checkmark"></span>
                                    <img className="avatar-box" onError={(e) => e.target.src='/images/dummy_profile.png'} src={channel.avatar} /> {channel.name}
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

export default withRouter(SelectChannelsModal);
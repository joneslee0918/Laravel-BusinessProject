import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import Modal from 'react-modal';
import channelSelector, {streamChannels} from '../../selectors/channels';
import streamTypes from './StreamTypesFixture';
import {addStream} from '../../requests/streams';
import Loader from '../Loader';

class StreamCreator extends React.Component{

    state = {
        selectedAccount:  Object.entries(this.props.selectedChannel).length ? 
        {label: <ProfileChannel channel={this.props.selectedChannel} />, value: this.props.selectedChannel.name, type: this.props.selectedChannel.type, id: this.props.selectedChannel.id} : 
        (this.props.channels.length ? 
          {label: <ProfileChannel channel={this.props.channels[0]} />, value: this.props.channels[0].name, type: this.props.channels[0].type, id: this.props.channels[0].id} : {}),
        loading: false,
        searchModal: false,
        searchTerm: ""
    }

    handleAccountChange = (selectedAccount) => {
        this.setState(() => ({
            selectedAccount
        }));
    };

    submitStream = (item) => {

        this.setState(() => ({
            loading: true
        }));

        const channelId = this.state.selectedAccount.id;
        const network = this.state.selectedAccount.type;
        const selectedTab = this.props.selectedTab;
        const searchTerm = this.state.searchTerm;

        addStream(item, channelId, selectedTab, network, searchTerm).then(() => this.props.reload()).then(() => {
           if(typeof this.props.close !== "undefined") this.props.close();
        });
    };

    handleTypeClick = (item) => {
        if(item.value !== "search"){
            this.submitStream(item);
        }else{
            this.toggleSearchModal();
        }
    }

    handleSearchInputChange = (event) => {

        try{
            const value = event.target.value;
            this.setState(() => (
                {searchTerm: value}
            ));
        }catch(e){}
    } 

    toggleSearchModal = () => {
        this.setState(() => ({
            searchModal: !this.state.searchModal
        }), () => {
            if(!this.state.searchModal && this.state.searchTerm !== ""){
                this.submitStream({label: "Search", value: "search", icon: "search"});
            }
        });
    }


    render(){
        return (this.state.loading ? <Loader /> : <div className="streams-default-container">

                    <Modal isOpen={!!this.state.searchModal} ariaHideApp={false} className="stream-type-modal search-modal">
                        <div>
                            <input type="text" onChange={e => this.handleSearchInputChange(e)} value={this.state.searchTerm} placeholder="Example: coca cola or #fashion"/>
                            <button onClick={this.toggleSearchModal} className="publish-btn-group gradient-background-teal-blue link-cursor">Done</button>
                        </div>
                    </Modal>

                    <div className="account-selection">
                        <Select
                            value={this.state.selectedAccount}
                            onChange={this.handleAccountChange}
                            options={this.props.channels.map(channel => {
                                return {label: <ProfileChannel channel={channel} />, value: channel.name, type: channel.type, id: channel.id}
                            })}
                        />
                    </div>
                    <div className="streams-default">
                            
                        {(streamTypes[this.state.selectedAccount.type]).map((item, index) => (
                            <div key={index} className="selection-item" onClick={(e) => this.handleTypeClick(item)}>
                                <i className={`fa fa-${item.icon}`}></i>
                                <span>{item.label}</span>
                            </div>
                        ))}

                    </div>
                    {typeof this.props.close !== "undefined" && 
                    <div className="txt-center p10">
                            <p onClick={this.props.close} className="link-cursor">Cancel</p>
                    </div>}
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
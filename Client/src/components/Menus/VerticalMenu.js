import React from 'react';
import {NavLink} from "react-router-dom";

const VerticalMenu = ({ menuItems, channels, selectedChannel, selectChannel }) => {
    return (
        <div>
            <aside className="vertical-menu gradient-background-teal-blue">

                <div className="btn-group">
                    <ProfileInfo selectedChannel = {selectedChannel} />
                    <ProfileSelectionDropDown channels = {channels} selectChannel={selectChannel} />
                </div>
        
                <MenuItems menuItems={ menuItems } />
                <SupportSection />
            </aside>
        </div>
    );
};

const ProfileInfo = ({ selectedChannel }) => (
    <div className="user-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="profile-info pull-right">
            <img className="pull-left" src={selectedChannel.avatar} />
            <div className="pull-left">
                <p className="profile-name">{selectedChannel.name}</p>
                <p className="profile-username">@{selectedChannel.username}</p>
            </div>
            <div className="pull-right down-arrow">
                <i className="fa fa-angle-down"></i>
            </div>
        </div>
    </div>
);

const ProfileSelectionDropDown = ({ channels, selectChannel }) => (
    <div className="dropdown-menu select-channel">
        {!!channels.length && 
            channels.map((channel) => (
                <ProfileSelectionItem key={channel.id} channel={channel} selectChannel={selectChannel}/>
            ))
        }
        <button className="add-channel-btn block-urls">Add new channel</button>
    </div>
);

const ProfileSelectionItem = ({ channel, selectChannel }) => (
    <div className="channel-container">
        <a href="#" className="block-urls" onClick={(e) => { selectChannel(channel.id) }}>
            <div className="profile-info pull-right">
                <img className="pull-left" src={channel.avatar} />
                <div className="pull-left">
                    <p className="profile-name">{channel.name}</p>
                    <p className="profile-username">@{channel.username}</p>
                </div>
            </div>
        </a>
    </div>
);

const MenuItems = ({ menuItems }) => (
    <ul className="v-menu-links clear-both">
        {menuItems.map((item) => (
            <li key={item.id}><NavLink className="links" to={item.uri}>{item.displayName}</NavLink></li>
        ))}
    </ul>
);

const SupportSection = () => (
    <div className="support">
        <div>
            <a href="mailto:info@oda-lab.com?Subject=The%20sky%20is%20falling!"><i className="fa fa-comment"></i> SUPPORT</a>
        </div>
    </div>
);

export default VerticalMenu;
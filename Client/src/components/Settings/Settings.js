import React from 'react';
import { connect } from "react-redux";
import VerticalMenu from "../Menus/VerticalMenu";
import channelSelector from "../../selectors/channels";
import { setGlobalChannel } from '../../actions/channels';
import SettingsRouter from '../../routes/SettingsRouter';

const menuItems = [
    {   
        id: "profile",
        displayName: "Profile",
        uri: "/settings/profile" 
    }
];

const Settings = ({channels, selectedChannel, selectChannel}) => (
    <div>
        <VerticalMenu 
            menuItems={menuItems} 
            channels={channels} 
            selectedChannel={selectedChannel}
            selectChannel={selectChannel}
            />
            <div className="body-container">
                <div className="main-section">
                    <SettingsRouter/>
                </div>
            </div>
    </div>
);

const mapStateToProps = (state) => {

    const unselectedGlobalChannels = {selected: 0, provider: undefined};
    const selectedGlobalChannel = {selected: 1, provider: undefined};
    
    const channels = channelSelector(state.channels.list, unselectedGlobalChannels);
    const selectedChannel = channelSelector(state.channels.list, selectedGlobalChannel);

    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

const mapDispatchToProps = (dispatch) => ({
    selectChannel: (id) => dispatch(setGlobalChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
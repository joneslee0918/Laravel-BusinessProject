import React from 'react';
import { connect } from "react-redux";
import VerticalMenu from "../Menus/VerticalMenu";
import channelSelector from "../../selectors/channels";

const menuItems = [
    {   
        id: "scheduled_posts",
        displayName: "Scheduled Posts",
        uri: "/scheduled/posts" 
    },
    {   
        id: "scheduled_past",
        displayName: "Past Scheduled",
        uri: "/scheduled/past" 
    }
];

const Scheduled = ({channels, selectedChannel}) => (
    <div>This is the Scheduled page.
        <VerticalMenu menuItems={menuItems} channels={channels} selectedChannel={selectedChannel}/>
    </div>
);

const mapStateToProps = (state) => {

    const unselectedGlobalChannels = {selected: 0, provider: undefined};
    const selectedGlobalChannel = {selected: 1, provider: undefined};
    
    const channels = channelSelector(state.channels, unselectedGlobalChannels);
    const selectedChannel = channelSelector(state.channels, selectedGlobalChannel);

    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(Scheduled);
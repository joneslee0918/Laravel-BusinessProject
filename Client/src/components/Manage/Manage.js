import React from 'react';
import { connect } from "react-redux";
import VerticalMenu from "../Menus/VerticalMenu";
import MenuItems from "./Fixtures/MenuItems";
import ManageRouter from "../../routes/ManageRouter";
import channelSelector from "../../selectors/channels";

const Manage = ({channels, selectedChannel}) => { 
    return (
        <div>
            <VerticalMenu menuItems={MenuItems} channels={channels} selectedChannel={selectedChannel}/>
            <div className="body-container">
                <div className="main-section">
                    <ManageRouter />
                </div>
            </div>
        </div>  
    );
};

const mapStateToProps = (state) => {

    const unselectedTwitterChannels = {selected: 0, provider: "twitter"};
    const selectedTwitterChannel = {selected: 1, provider: "twitter"};
    
    const channels = channelSelector(state.channels, unselectedTwitterChannels);
    const selectedChannel = channelSelector(state.channels, selectedTwitterChannel);

    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(Manage);
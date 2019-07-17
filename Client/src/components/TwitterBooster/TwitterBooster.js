import React from 'react';
import { connect } from "react-redux";
import VerticalMenu from "../Menus/VerticalMenu";
import MenuItems from "./Fixtures/MenuItems";
import ManageRouter from "../../routes/ManageRouter";
import channelSelector from "../../selectors/channels";
import { setTwitterChannel } from '../../actions/channels';
import { NavLink } from 'react-router-dom';

const Manage = ({channels, selectedChannel, selectChannel}) => { 
    const hasChannel = typeof(selectedChannel.username) !== "undefined"; 
    return (
        <div>
            {!!hasChannel ? <div>
                <VerticalMenu 
                    menuItems={MenuItems} 
                    channels={channels} 
                    selectedChannel={selectedChannel}
                    selectChannel={selectChannel}
                    />
                <div className="body-container">
                    <div className="main-section">
                        <ManageRouter/>
                    </div>
                </div>
            </div>:
            <div className="no-data">
                This feature requires a twitter account.
                <div><NavLink to="/accounts">Connect to Twitter</NavLink></div>
            </div>
            }

        </div>  
    );
};

const mapStateToProps = (state) => {

    const unselectedTwitterChannels = {selected: 0, provider: "twitter"};
    const selectedTwitterChannel = {selected: 1, provider: "twitter"};

    const channels = channelSelector(state.channels.list, unselectedTwitterChannels);
    const selectedChannel = channelSelector(state.channels.list, selectedTwitterChannel);

    return {
        channels,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

const mapDispatchToProps = (dispatch) => ({
    selectChannel: (id) => dispatch(setTwitterChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
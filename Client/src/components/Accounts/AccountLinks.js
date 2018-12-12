import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import channelSelector from "../../selectors/channels";

class AccountLinks extends React.Component {

    render(){
        return (
            <div className="accounts-container">

            <h2>HAVE MORE ACCOUNTS?</h2>
            <p>Connect them all, and we'll help you get the right audience.</p>

                <div className="">

                    <NavLink to="/accounts/twitter" >
                        <div className="account_box twitter_bg col-xs-12">
                            
                            <div>
                                <div className="center-inline"><i className="fa fa-twitter xl_font"></i></div>
                                <h4>Add Twitter Accounts</h4>
                                <p className="center-inline">Connected: {this.props.twitterChannels.length}</p>
                            </div>
                        </div>
                    </NavLink> 
                    <NavLink to="/accounts/facebook" >
                        <div className="account_box facebook_bg col-xs-12">
                            <div>
                                <div className="center-inline"><i className="fa fa-facebook xl_font"></i></div>
                                <h4>Add Facebook Accounts</h4>
                                <p className="center-inline">Connected: {this.props.facebookChannels.length}</p>
                            </div>
                        </div>
                    </NavLink>
                    
                </div>
            </div>
        );
    };
} 

const mapStateToProps = (state) => {

    const facebookChannelsFilter = {selected: undefined, provider: "facebook"};
    const twitterChannelsFilter = {selected: undefined, provider: "twitter"};
    const facebookChannels = channelSelector(state.channels.list, facebookChannelsFilter);
    const twitterChannels = channelSelector(state.channels.list, twitterChannelsFilter);
    return {
        facebookChannels,
        twitterChannels
    };
};

export default connect(mapStateToProps)(AccountLinks);
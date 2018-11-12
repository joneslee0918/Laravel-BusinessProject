import React from 'react';
import {connect} from 'react-redux';
import SweetAlert from "sweetalert2-react";
import FacebookLogin from 'react-facebook-login';
import {facebookAppId} from "../../config/api";
import {startAddFacebookChannel, startSetChannels} from "../../actions/channels";
import channelSelector from "../../selectors/channels";
import {destroyChannel} from "../../requests/channels";
import {logout} from "../../actions/auth";
import Loader from "../../components/Loader";

class Facebook extends React.Component {
    constructor(props) {
        super(props);
    }

    defaultAction = {
        id: "",
        type: ""
    };

    state = {
        action: this.defaultAction
    }

    setAction = (action = this.defaultAction) => {
        this.setState(() => ({
            action
        }));
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        if(response){
            this.props.startAddFacebookChannel(response.accessToken);
        }
    };

    remove = (id) => {
        return destroyChannel(id)
        .then((response) => {
            this.props.startSetChannels()
            .then((response) => {
                if(response.length < 1){
                    this.props.logout();
                }
            });
        }).catch((error) => {

        });
    }

    render(){
        return (
            <div className="accounts-container">

                <SweetAlert
                    show={!!this.state.action.id}
                    title={`Do you wish to ${this.state.action.type} this item?`}
                    text="To confirm your decision, please click one of the buttons below."
                    showCancelButton
                    type="warning"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    onConfirm={() => {
                        if(this.state.action.type === 'delete'){
                            this.remove(this.state.action.id);
                        }else{
                            console.log('something went wrong');
                        }
                        this.setAction();
                    }}
                />

                <h2>HAVE FACEBOOK ACCOUNTS?</h2>
                <p>Connect them all, and we'll help you get the right audience.</p>
                
                <div className="flex_container-center">
                    <div className="accounts-container__logo facebook_color col-md-1">
                        <div>
                            <i className="fa fa-facebook"></i>
                        </div>
                    </div>
                    <div className="accounts-container__content col-md-10">
                        <div className="accounts-container__content__wrapper">
                            <div className="accounts-container__content__wrapper__heading">
                                <h2>Let's grow your audience using Facebook!</h2>
                            </div> 
                            
                            <ChannelItems channels={this.props.channels} setAction={this.setAction} /> 
                            {!!this.props.loading && <Loader />}
                        </div> 
            
                        <div className="accounts-container__content__wrapper__footer">
                            <FacebookLogin
                                appId={facebookAppId}
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="manage_pages,publish_pages,pages_show_list,publish_to_groups,groups_access_member_info,public_profile,email"
                                callback={this.onSuccess} 
                                icon={<i className="fa fa-plus"></i>}
                                cssClass="add-channel-plus-btn"
                                textButton=""
                                />
                            <span className="left-side-label">Have an account? Let's connect!</span>
                        </div> 
                    </div>
                </div>
              
            </div>
        );
    };
} 

const ChannelItems = ({ channels, setAction }) => (
    channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} setAction={setAction} />
    ))
);

const ChannelItem = ({ channel, setAction }) => (
    <div className="accounts-container__content__wrapper__body">
        <div className="channel-container">
            <a href="#" className="block-urls">
                <div className="profile-info pull-right">
                    <img className="pull-left" src={channel.avatar} />
                    <div className="pull-left">
                        <p className="profile-name">{channel.name}</p>
                        <p className="profile-username">{!!channel.username && `@${channel.username}`}</p>
                    </div>
                    <div className="item-actions pull-right">
                        <div className="trash-btn" onClick={() => setAction({id: channel.id, type: "delete"})}><i className="fa fa-trash"></i> <span className="delete-text"> Delete</span></div>
                    </div>
                </div>
            </a>
        </div>
    </div>
);

const mapStateToProps = (state) => {

    const facebookChannelsFilter = {selected: undefined, provider: "facebook"};
    const channels = channelSelector(state.channels.list, facebookChannelsFilter);
    return {
        channels,
        loading: state.channels.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddFacebookChannel: (accessToken) => dispatch(startAddFacebookChannel(accessToken)),
    startSetChannels: () => dispatch(startSetChannels()),
    logout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
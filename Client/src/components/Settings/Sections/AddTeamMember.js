import React from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
import Select from 'react-select';
import {publishChannels} from '../../../selectors/channels';
import {validateEmail, validateUrl} from "../../../utils/validator";
import {startSetProfile} from "../../../actions/profile";
import SelectChannelsModal from "../../SelectChannelsModal";
import {LoaderWithOverlay} from "../../Loader";

class AddTeamMember extends React.Component{

    state = {
        name: "",
        email: "",
        admin: false,
        assignedChannels: [],
        assignedApprover: "",
        selectChannelsModal: false,
        teamId: false,
        loading: false,
        error: false,
        success: false
    };


    onFieldChange = (e) => {
        const id = e.target.id;
        let state = Object.assign({}, this.state);
        state[id] = e.target.value;
        this.setState(() => (state));
    };

    toggleAdmin = () => {
        this.setState(() => ({
            admin: !this.state.admin
        }));
    };

    onChannelSelectionChange = (obj) => {
        const selectedPinterestChannel = !obj.selected && obj.type == "pinterest" ? obj : false;

        const assignedChannels = this.props.channels.map((channel) => {
            if(channel.id === obj.id){
                return {
                    ...channel,
                    selected: channel.selected ? 0 : 1
                }
            }
            else{
        
                if(obj.type == "twitter" && channel.type == "twitter"){
                    return {
                        ...channel,
                        selected:0
                    }
                }else{
                    return {
                        ...channel
                    };
                }
            }
        });

        this.setState(() => ({
            assignedChannels,
            selectedPinterestChannel
        }));
    };

    toggleSelectChannelsModal = () => {

        this.setState(() => ({
            assignedChannels: this.props.channels,
            selectChannelsModal: !this.state.selectChannelsModal
        }));
    };

    render(){
        return (
            <div>
            <Modal isOpen={this.state.selectChannelsModal} closeTimeoutMS={300} ariaHideApp={false} className="flex-center modal-no-radius no-outline">
                <SelectChannelsModal 
                channels={this.props.channels} 
                onChange={this.onChannelSelectionChange}
                toggle={this.toggleSelectChannelsModal}
                toggleComposer={this.props.close}
                />
            </Modal>


                <h2 className="blend-title">ADD NEW MEMBER</h2>   
                {this.state.loading && <LoaderWithOverlay/>}

                {this.state.error && 
                    <div className="alert alert-danger">{this.state.error}</div>
                }

                {this.state.success && 
                    <div className="alert alert-success">{this.state.success}</div>
                }

                <form onSubmit={(e) => this.onSubmit(e)} className="profile-form">
                    <div className="form-group shadow-box team-form scrollbar">
    
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">NAME</label>
                            <input type="text" className="form-control" onChange={(e) => this.onFieldChange(e)} id="name" value={this.state.name} placeholder="John Doe" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" className="form-control" id="email" onChange={(e) => this.onFieldChange(e)} value={this.state.email} placeholder="johndoe@example.com" />
                        </div>

                        <div className="col-6 col-md-6 form-field">
                            <div className="custom-control custom-switch">
                                <input type="checkbox" onChange={this.toggleAdmin} value={this.state.admin} className="custom-control-input" id="admin" />
                                <label className="custom-control-label" htmlFor="admin">&nbsp;Make Admin</label>
                            </div>
                        </div>

                    </div>

                    <div className="form-group shadow-box team-form scrollbar">
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="channel">ASSIGN SOCIAL ACCOUNT</label>
                            <input type="text" className="form-control whiteBg" onClick={this.toggleSelectChannelsModal} readOnly value={this.state.website} id="channel" placeholder="Name of the social account" />
                        </div>

                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="permissionLevel">PERMISSION LEVEL</label>
                            <input type="text" className="form-control" value={this.state.website} onChange={(e) => this.onFieldChange(e)} id="permissionLevel" placeholder="Select permission" />
                        </div>
        
                    </div>
        
                    <div>
                        <button className="upgrade-btn pull-right">Submit</button>
                        <button onClick={this.props.close} className="btn btn-link pull-right">Cancel</button>
                    </div>
                </form>
            </div>
        );
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
    const channels = publishChannels(state.channels.list);
    return {
        channels
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetProfile: () => dispatch(startSetProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamMember);
import React from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
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
        publishChannels: this.props.channels,
        assignedChannels: [],
        assignedApprover: "",
        selectChannelsModal: false,
        teamId: false,
        loading: false,
        error: false,
        success: false
    };


    componentDidMount(){
        this.setState(() => ({
            publishChannels: this.props.channels
        }), () => this.setAssignedChannels());
    }

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

        const publishChannels = this.state.publishChannels.map((channel) => {
            if(channel.id === obj.id){
                return {
                    ...channel,
                    selected: channel.selected ? 0 : 1
                }
            }

            return {
                ...channel
            };
        });

        this.setState(() => ({
            publishChannels,
            selectedPinterestChannel
        }), () => this.setAssignedChannels());
    };

    setAssignedChannels = () => {
        const assignedChannels = this.state.publishChannels.filter(channel => channel.selected === 1)
        .map(channel => ({...channel, permissionLevel: "member"}));

        this.setState(() => ({
            assignedChannels
        }));
    };

    setPermissionLevel = (e, channelId) => {
        const  assignedChannels = this.state.assignedChannels.map(channel => {
            if(channel.id === channelId){
                return {
                    ...channel,
                    permissionLevel: e.target.value
                }
            }

            return {
                ...channel
            }
        });

        this.setState(() => ({
            assignedChannels
        }));
    };

    toggleSelectChannelsModal = () => {

        this.setState(() => ({
            selectChannelsModal: !this.state.selectChannelsModal
        }));
    };

    render(){
        return (
            <div>
            <Modal isOpen={this.state.selectChannelsModal} closeTimeoutMS={300} ariaHideApp={false} className="flex-center modal-no-radius no-outline">
                <SelectChannelsModal 
                channels={this.state.publishChannels} 
                onChange={this.onChannelSelectionChange}
                toggle={this.toggleSelectChannelsModal}
                twitterSelectType="checkbox"
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

                <div className="profile-form">
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

                    <div className="form-group shadow-box">

                        <div>
                            <button onClick={this.toggleSelectChannelsModal} className="btn compose-btn" >Add/Remove Social Accounts</button>
                        </div>
                        
                        <div className="team-form scrollbar">
                            <br />

                            {this.state.assignedChannels.map((channel, index) => (
                            <div key={index}>
                                <div className="col-6 col-md-6 form-field">
                                    <label htmlFor={`channel-${channel.id}`}>ASSIGN SOCIAL ACCOUNT</label>
                                    <input type="text" value={`${channel.name} - ${channel.type}`} className="form-control whiteBg" onClick={this.toggleSelectChannelsModal} readOnly id={`channel-${channel.id}`} placeholder="Name of the social account" />
                                </div>

                                <div className="col-6 col-md-6 form-field">
                                    <label htmlFor={`permission-${channel.id}`}>PERMISSION LEVEL</label>
                                    <select id={`permission-${channel.id}`} onChange={(e) => this.setPermissionLevel(e, channel.id)} value={channel.permissionLevel} className="form-control">
                                        <option value="member">Approval Required</option>
                                        <option value="publisher">Publisher</option>
                                    </select>
                                </div>
                            </div>))}
                        </div>

        
                    </div>
        
                    <div>
                        <button className="upgrade-btn pull-right">Submit</button>
                        <button onClick={this.props.close} className="btn btn-link pull-right">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}


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
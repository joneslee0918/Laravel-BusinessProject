import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import TeamMember from './TeamMember';
import UpdateTeamMember from './UpdateTeamMember';
import {getTeamMembers, getTeams} from '../../../requests/team';
import {LoaderWithOverlay} from "../../Loader";
import SweetAlert from 'sweetalert2-react';
import {removeMember} from '../../../requests/team';
import SocialAccountsPrompt from '../../SocialAccountsPrompt';

class Team extends React.Component{

    state = {
        loading: false,
        addOrUpdateMember: false,
        members: [],
        teams: [],
        teamId: false,
        removePrompt: false,
        memberToRemove: false,
        memberToUpdate: false,
        error: false
    }

    componentDidMount(){
        this.setState(() => ({
            loading: true
        }));

        this.loadTeams();
    }

    toggleAddOrUpdateMember = () => {
        this.setState(() => ({
            addOrUpdateMember: !this.state.addOrUpdateMember,
            memberToUpdate: false
        }));
    };

    setRemovePrompt = (removePrompt = false, memberToRemove = false) => {
        this.setState(() => ({
            removePrompt,
            memberToRemove
        }));
    };

    setMemberToUpdate = (addOrUpdateMember = false, memberToUpdate = false) => {
        this.setState(() => ({
            addOrUpdateMember,
            memberToUpdate
        }));
    };

    loadTeams = () => {

        if(this.state.teamId){
            this.fetchMembers();
            return;
        }

        getTeams().then(response => {
            if(response.length < 1) {
                this.setState(() => ({
                    loading: false
                }));
                return;
            };

            this.setState(() => ({
                teams: response,
                teamId: response[0].id,
                error: false
            }), () => {
                this.fetchMembers();
            });
        }).catch(e => {
            console.log(e);
        });
    };

    fetchMembers = () => {
        this.setState(() => ({
            loading: false
        }));
        getTeamMembers(this.state.teamId).then(response => {
            this.setState(() => ({
                members: response,
                error: false
            }));
        }).catch(e => {
            this.setState(() => ({
                loading: false
            }));
            console.log(e);
        });
    };

    onTeamChange = (e) => {
        const teamId = e.target.value;
        this.setState(() => ({
            teamId
        }), () => {
            this.loadTeams();
        });
    };

    hasOwnTeamOnly = () => {
        const {profile} = this.props;
        const {teams} = this.state;

        const teamsArr = teams.filter(team => team.user_id === profile.user.id);

        return teamsArr.length < 2;
    }

    remove = () => {
        const member = this.state.memberToRemove;
        this.setState(() => ({
            loading: true
        }));
        removeMember({teamId: member.team_id, memberId: member.details.id})
        .then(response => {
            this.setState(() => ({
                loading: false
            }));
            this.loadTeams();
        }).catch( e => {

            if(typeof e.response !== "undefined" && typeof e.response.data.error !== "undefined"){
                this.setState(() => ({
                    error: e.response.data.error,
                    loading: false
                }));
                return;
            }

            this.setState(() => ({
                loading: false
            }));
        });
    }

    render(){
        const {members, teams} = this.state;
        return (
            
            <div>    
            <h2>TEAM</h2>
            {this.state.error && 
                <div className="alert alert-danger">{this.state.error}</div>
            }
            {this.state.loading && <LoaderWithOverlay/>}

            <SweetAlert
                show={!!this.state.removePrompt && !!this.state.memberToRemove}
                title={`Do you wish to delete this member?`}
                text="To confirm your decision, please click one of the buttons below."
                showCancelButton
                type="warning"
                confirmButtonText="Yes"
                cancelButtonText="No"
                onConfirm={() => {
                    this.remove();
                    this.setRemovePrompt();
                }}
                onCancel={() => {
                    this.setRemovePrompt();
                }}
                onClose={() => this.setRemovePrompt()}
            />

            <Modal
                isOpen={this.state.addOrUpdateMember}
                ariaHideApp={false}
                className="team-modal scrollbar"
            >       
                <UpdateTeamMember 
                    close={this.toggleAddOrUpdateMember} 
                    teamId={this.state.teamId}
                    fetchMembers={this.loadTeams}
                    member={this.state.memberToUpdate}
                />
            </Modal>

                {teams.length > 1 && <div className="col-4 col-md-4 form-field">
                    <select id={`teams`} onChange={this.onTeamChange} value={this.state.teamId} className="form-control">
                        {
                            this.state.teams.map((team, index) => (
                                <option key={index} value={team.id}>{team.name}</option>
                            ))
                        }

                    </select>
                </div>
                }

                {!this.state.loading &&
                    (!!this.state.members.length ?
                    <div>

                        <div>
                            <button onClick={this.toggleAddOrUpdateMember} className="btn upgrade-btn pull-right">Add New Team Member</button>
                        </div>
                        
                        {members.map(member => (
                            <TeamMember 
                            key={member.id} 
                            member={member} 
                            fetchMembers={this.loadTeams} 
                            remove={this.setRemovePrompt}
                            update={this.setMemberToUpdate}
                            />
                        ))}

                    </div>
                    :

                    <SocialAccountsPrompt 
                        image = "/images/hello_bubble_smiley.svg"
                        title = "Let's start by adding new members!"
                        description = "To add members to your team, click the button below."
                        buttonTitle = "Add new member"
                        action = {this.toggleAddOrUpdateMember}
                    /> )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.profile
    return {
        profile
    };
};

export default connect(mapStateToProps)(Team);
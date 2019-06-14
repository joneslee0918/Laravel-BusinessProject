import React from 'react';
import Modal from 'react-modal';
import TeamMember from './TeamMembers';
import AddTeamMember from './AddTeamMember';

class Team extends React.Component{

    state = {
        loading: false,
        addNewMember: false,
        members: []
    }

    toggleAddNewMember = () => {
        this.setState(() => ({
            addNewMember: !this.state.addNewMember
        }));
    }

    render(){
        const {members} = this.state;
        return (
            
            <div>    

            <Modal
                isOpen={this.state.addNewMember}
                ariaHideApp={false}
                className="team-modal scrollbar"
            >       
                <AddTeamMember close={this.toggleAddNewMember}/>
            </Modal>

                <h2>TEAM</h2>

                {
                    !!this.state.members.length ?
                    <div>

                        <div>
                            <button onClick={this.toggleAddNewMember} className="btn upgrade-btn pull-right">Add New Team Member</button>
                        </div>
                        
                        {members.map(member => (
                            <TeamMember member={member} />
                        ))}

                    </div>
                    :
                    <div className="no-data">
                        You don't have any member in your team.
                        <div><button onClick={this.toggleAddNewMember} className="btn compose-btn">Add New Team Member</button></div>
                    </div>
                }
            </div>
        );
    }
}

export default Team;
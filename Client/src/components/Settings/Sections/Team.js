import React from 'react';
import TeamMember from './TeamMembers';

class Team extends React.Component{

    state = {
        loading: false,
        members: []
    }

    render(){
        const {members} = this.state;
        return (
            
            <div>    
                <h2>TEAM</h2>
                {!!this.state.members.length ?
                    <div>

                        <div>
                            <button className="btn upgrade-btn pull-right">Add New Team Member</button>
                        </div>
                        
                        {members.map(member => (
                            <TeamMember member={member} />
                        ))}

                    </div>
                :
                <div className="no-data">
                    You don't have any member in your team.
                    <div><button className="btn compose-btn">Add New Team Member</button></div>
                </div>
                }
            </div>
        );
    }
}

export default Team;
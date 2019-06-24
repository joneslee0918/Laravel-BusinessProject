import React from 'react';

class TeamMember extends React.Component{
    render(){
        const member = this.props;
        return (
            <div className="clear-both">

                <div className="item-row">

                    <div>
                        <div className="profile-info pull-left">
                            
                            <div className="pull-left">
                                <p className="profile-name">{member.name}<span className="profile-username">{member.email}</span></p>
                                <p className="profile-title">Some description here</p>
                            </div>

                        </div>
                    </div>

                    <div className="item-actions pull-right">

                        <ul className="v-center-align">
                            <li className="text-links">
                                <a className="link-cursor">View</a>
                            </li>
                            
                            <li className="text-links">
                                <a className="link-cursor">Edit</a>
                            </li>
                        
                            <li className="text-links">
                                <a className="link-cursor">Remove</a>
                            </li>
                        </ul>

                    </div>

                </div>
        
            </div>
        );
    }
}

export default TeamMember;
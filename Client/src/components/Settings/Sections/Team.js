import React from 'react';

class Team extends React.Component{
    render(){
        return (
            
            <div>    
            <h2>TEAM</h2>

                <div>
                    <button className="btn upgrade-btn pull-right">Add New Team Member</button>
                </div>
                
                <div className="clear-both">

                    <div className="item-row">
            
                        <div>
                            <div className="profile-info pull-left">
                                
                                <div className="pull-left">
                                    <p className="profile-name">Test Name <span className="profile-username">test@email.com</span></p>
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

            </div>
        );
    }
}

export default Team;
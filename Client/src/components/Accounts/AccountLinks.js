import React from 'react';
import {NavLink} from "react-router-dom";

class AccountLinks extends React.Component {

    render(){
        return (
            <div className="accounts-container">
                <div className="flex_container-center">
                    <NavLink to="/accounts/twitter" activeClassName="active">Twitter</NavLink> 
                    <NavLink to="/accounts/facebook" activeClassName="active">Facebook</NavLink>
                </div>
            </div>
        );
    };
} 

export default AccountLinks;
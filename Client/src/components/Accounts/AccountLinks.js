import React from 'react';
import {NavLink} from "react-router-dom";

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
                                <p>Add Twitter Accounts</p>
                            </div>
                        </div>
                    </NavLink> 
                    <NavLink to="/accounts/facebook" >
                        <div className="account_box facebook_bg col-xs-12">
                            <div>
                                <div className="center-inline"><i className="fa fa-facebook xl_font"></i></div>
                                <p>Add Facebook Accounts</p>
                            </div>
                        </div>
                    </NavLink>
                    
                </div>
            </div>
        );
    };
} 

export default AccountLinks;
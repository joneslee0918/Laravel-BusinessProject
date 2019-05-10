import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {backendUrl} from "../../config/api";
import {setComposerModal} from "../../actions/composer";

const TopMenu = ({setComposerModal}) => (
    <div className="navbar-uniclix">
        <a href={backendUrl} className="brand"><img src="/images/uniclix.png"/></a>

        <ul className="top-menu">
            <li><NavLink to="/home" activeClassName="active">HOME</NavLink></li> 
            <li><NavLink to="/manage" activeClassName="active">MANAGE</NavLink></li> 
            <li><NavLink to="/scheduled" activeClassName="active">SCHEDULED</NavLink></li>  
            <li><NavLink to="/streams" activeClassName="active">STREAMS</NavLink></li>  
            <li><NavLink to="/accounts" activeClassName="active">ACCOUNTS</NavLink></li>
            <li><NavLink to="/analytics" activeClassName="active">ANALYTICS</NavLink></li> 
        </ul>

        <ul className="nav-buttons">
            <li><NavLink to="/settings/billing" className="upgrade-btn">Upgrade for more features</NavLink></li> 
            <li><NavLink to="/settings" activeClassName="active" className="top-icons"><i className="fa fa-gear"></i></NavLink></li>
            <li>
                <a onClick={() => setComposerModal(true)} className="compose-btn">Compose</a>
            </li>  
        </ul>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    setComposerModal: (isOpen) => dispatch(setComposerModal(isOpen))
});

export default connect(undefined, mapDispatchToProps)(TopMenu);
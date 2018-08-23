import React from 'react';
import {NavLink} from "react-router-dom";

const TopMenu = () => (
    <div className="navbar-uniclix">
        <a href="#" className="brand"><img src="/images/uniclix.png"/></a>

        <ul className="top-menu">
            <li><NavLink to="/manage/dashboard" activeClassName="is-active">Manage</NavLink></li> 
            <li><NavLink to="/scheduled" activeClassName="is-active">Scheduled</NavLink></li>  
            <li><NavLink to="/accounts" activeClassName="is-active">Accounts</NavLink></li>  
        </ul>

        <ul className="nav-buttons">
            <li><button className="upgrade-btn">Upgrade for more features</button></li> 
            <li><span className="top-icons"><i className="fa fa-bell"></i></span></li>  
            <li><span className="top-icons"><i className="fa fa-bell"></i></span></li>
            <li>
                <button className="compose-btn">Compose</button>
            </li>  
        </ul>
    </div>
);

export default TopMenu;
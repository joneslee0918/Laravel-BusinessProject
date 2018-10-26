import React from 'react';
import {NavLink} from "react-router-dom";
import {backendUrl} from "../../config/api";

const TopMenu = () => (
    <div className="navbar-uniclix">
        <a href={backendUrl} className="brand"><img src="/images/uniclix.png"/></a>

        <ul className="top-menu">
            <li><NavLink to="/home" activeClassName="active">HOME</NavLink></li> 
            <li><NavLink to="/manage" activeClassName="active">MANAGE</NavLink></li> 
            <li><NavLink to="/scheduled" activeClassName="active">SCHEDULED</NavLink></li>  
            <li><NavLink to="/accounts" activeClassName="active">ACCOUNTS</NavLink></li> 
        </ul>

        <ul className="nav-buttons">
            <li><a href="#" className="upgrade-btn">Upgrade for more features</a></li> 
            <li><NavLink to="/settings" activeClassName="active" className="top-icons"><i className="fa fa-gear"></i></NavLink></li>
            <li>
                <a data-toggle="modal" data-target="#compose" className="compose-btn">Compose</a>
            </li>  
        </ul>
    </div>
);

export default TopMenu;
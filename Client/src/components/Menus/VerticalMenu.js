import React from 'react';
import {NavLink} from "react-router-dom";

const VerticalMenu = ({ menuItems }) => {
    return (
        <div>
            <div>This is the profile info</div>
            <div>
                {menuItems.map((item) => (
                    <NavLink key={item.id} to={item.uri}>{item.displayName}</NavLink>
                ))}
            </div>
        </div>
    );
};

export default VerticalMenu;
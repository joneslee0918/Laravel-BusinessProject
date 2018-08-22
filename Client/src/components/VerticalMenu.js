import React from 'react';
import {NavLink} from "react-router-dom";

const VerticalMenu = ({ menuItems }) => (
    <div>
        <div>This is the profile info</div>
        <div>
            {menuItems.map((item) => {
                <NavLink to={item}>item</NavLink>
            })}
        </div>
    </div>
);

export default VerticalMenu;
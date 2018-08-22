import React from 'react';
import VerticalMenu from "./VerticalMenu";

const menuItems = [
    {   
        id: "manage_dashboard",
        displayName: "Dashboard",
        uri: "/manage/dashboard" 
    },
    {   
        id: "manage_follows",
        displayName: "Follows",
        uri: "/manage/follows" 
    },
    {   
        id: "manage_unfollows",
        displayName: "Unfollows",
        uri: "/manage/unfollows" 
    }
];

const Manage = () => { 
    return (
        <div>This is the manage page.
            <VerticalMenu menuItems={menuItems}/>
        </div>  
    );
};

export default Manage;
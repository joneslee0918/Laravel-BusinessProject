import React from 'react';
import VerticalMenu from "./VerticalMenu";

const menuItems = [
    {   
        id: "scheduled_posts",
        displayName: "Scheduled Posts",
        uri: "/scheduled/posts" 
    },
    {   
        id: "scheduled_past",
        displayName: "Past Scheduled",
        uri: "/scheduled/past" 
    }
];

const Scheduled = () => (
    <div>This is the Scheduled page.
        <VerticalMenu menuItems={menuItems}/>
    </div>
);

export default Scheduled;
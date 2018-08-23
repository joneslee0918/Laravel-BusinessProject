import React from 'react';
import UserList from "../../UserList";

const userItems = [
    {   
        id: 1,
        name: "Albert Feka",
        username: "@anime.masters89",
        title: "Veteran i luftes",
        tweets: 200,
        followers: 380,
        following: 450
    },
    {   
        id: 2,
        name: "Albert Feka",
        username: "@anime.masters89",
        title: "Veteran i luftes",
        tweets: 200,
        followers: 380,
        following: 450
    },
    {  
        id: 3,
        name: "Albert Feka",
        username: "@anime.masters89",
        title: "Veteran i luftes",
        tweets: 200,
        followers: 380,
        following: 450
    }
];
const AccountTargets = () => (
    <div>
        <h2>ACCOUNT TARGETS</h2>
        <UserList 
            userItems={ userItems }
            actionType="follow"
            showTargetLink={true}
            targetType="account"
        />
    </div>
);

export default AccountTargets;
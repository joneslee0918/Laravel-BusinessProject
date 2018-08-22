import React from 'react';
import VerticalMenu from "./VerticalMenu";
import {Route} from "react-router-dom";

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

const Manage = (props) => { 
    return (
        <div>This is the manage page.
            <VerticalMenu menuItems={menuItems}/>
            <Route path={`/manage/dashboard`} component={Dashboard} />
            <Route path={`/manage/follows`} component={Follows} />
            <Route path={`/manage/unfollows`} component={Unfollows} />
        </div>  
    );
};

const Dashboard = ({ match }) => (
    <div>
      <h3>Dashboard</h3>
    </div>
  );

  const Follows = ({ match }) => (
    <div>
      <h3>Follows</h3>
    </div>
  );

  const Unfollows = ({ match }) => (
    <div>
      <h3>Unfollows</h3>
    </div>
  );

export default Manage;
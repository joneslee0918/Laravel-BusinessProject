import React from 'react';
import {NavLink} from "react-router-dom";
import AccountsRouter from "../../routes/AccountsRouter";

class Accounts extends React.Component {

    render(){
        return (
            <AccountsRouter />
        );
    };
} 

export default Accounts;
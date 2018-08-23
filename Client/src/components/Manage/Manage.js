import React from 'react';
import VerticalMenu from "../Menus/VerticalMenu";
import MenuItems from "./Fixtures/MenuItems";
import ManageRouter from "../../routes/ManageRouter";

const Manage = () => { 
    return (
        <div>This is the manage page.
            <VerticalMenu menuItems={MenuItems}/>
            <div className="body-container">
                <div className="main-section">
                    <ManageRouter />
                </div>
            </div>
        </div>  
    );
};

export default Manage;
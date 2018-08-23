import React from 'react';

const UserList = (
        {   
            userItems = [],
            showTargetLink = false,
            targetType = "account", 
            showSortOption = false,
            actionType = "follow"
        }
    ) => { 
    
    const actionButton = actionType === "follow" ? "add" : "sub";

    return (
        <div>

            <ListActions actionType={ actionType }/>

            {
                userItems.length < 1 ? 
                            
                <div class="no-data">
                    Nothing to do. <br/>Please check back later! <br /> :)
                </div> :

                <div className="row">
                    <div className="col-xs-12">
                        <div className="item-list shadow-box">
                            <div className="item-header">
                                { showTargetLink &&  <TargetsLink targetType={ targetType }/> }
                                { showSortOption && <SortOption /> }
                            </div>

                            {userItems.map((item) => (
                                <UserItem key={item.id} userItem={ item } actionButton={ actionButton } />
                            ))}
                            
                        </div>
                    </div>
                </div> 
            }

        </div>
    );
}

const ListActions = ({ actionType }) => (
    <div className="action-count pull-right">
        <p><span className="action-count-title">{ actionType }s</span> : <span className={`${actionType}-count daily-actions`}>23</span></p>
    </div>
);

const TargetsLink = ({ targetType }) => (
    <div className="pull-left">
        Showing list of accounts based on your <a href="#" >{ targetType } targets <i className="fa fa-pencil"></i></a>
    </div>
);

const SortOption = () => (
    <div className="pull-right form-inline sort-options">
    <label className="sortLabel" htmlFor="sort">Sort by: </label>

        <form action="#" className="form-group" id="order_form">
            <select name="order" id="order">
                <option value="desc" defaultValue >Newest First</option>
                <option value="asc">Oldest First</option>
            </select>
        </form>

    </div>
);

const UserItem = ({ userItem, actionButton }) => (
    <div className="item-row">
        <div className="profile-info pull-left">
            <img className="pull-left" src="" />
            <div className="pull-left">
                <input type="hidden" className="user_id" value=""/>
                <p className="profile-name">{ userItem.name } <span className="profile-username">{ userItem.username }</span></p>
                <p className="profile-title">{ userItem.title }</p>
                <ul className="bottom-info">
                    <li><p>{ userItem.tweets }</p></li>
                    <li><p>{ userItem.followers }</p></li>
                    <li><p>{ userItem.following }</p></li>
                </ul>
            </div>
        </div>

        <UserActionButtons actionButton={ actionButton } />
    </div>
);

const UserActionButtons = ({ actionButton }) => {

    const actionSymbol = actionButton === "add" ? "plus" : "minus";

    return (
        <div className="item-actions pull-right">
            <ul>
                <li className="text-links"><a href="#">Reply</a></li>
                <li className="text-links"><a href="#">Whitelist</a></li>
                <li className="btn-links"><div data-user-id="" className={`${actionButton}-btn action-btn`}><i className={`fa fa-${actionSymbol}-circle`}></i></div></li>
            </ul>
        </div>
    );
}

export default UserList;
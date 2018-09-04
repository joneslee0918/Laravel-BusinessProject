import React from 'react';
import Loader from '../components/Loader';
import AccountTargetSearchList from './Manage/AccountTargetSearchList';
import KeywordTargetSearchList from './Manage/KeywordTargetSearchList';

const UserList = (
        {   
            userItems = [],
            loading = false,
            showTargetLink = false,
            searchView = false,
            showSearchView = (searchView = false) => {},
            reloadTargets = () => {},
            targetType = "account", 
            targets = [],
            showSortOption = false,
            actionType = "follow",
            actions = 0,
            fetchData = (order = 'desc') => {},
            perform = (userId) => {}
        }
    ) => { 
    
    const actionButton = actionType === "follow" ? "add" : "sub";

    const targetSearchView = (
        (targetType == "account" ? 
        <AccountTargetSearchList 
        targets={targets} 
        showSearchView={showSearchView} 
        reloadTargets={reloadTargets}    
        /> 
        : 
        <KeywordTargetSearchList 
            targets={targets} 
            showSearchView={showSearchView}
            reloadTargets={reloadTargets}
            />
        )
    );

    return (
        <div>
            {userItems.length < 1 ? 
                            
                (loading ? <Loader />
                    : 
                    (showTargetLink ? 

                     targetSearchView

                    :

                    <div className="no-data">
                        No data, nothing to do... :(
                    </div>
                    )
                ) :
                
                (  searchView ? 
                        targetSearchView
                    :
                    <div>
                        <ListActions actionType={ actionType } actions={ actions } />
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="item-list shadow-box">
                                    <div className="item-header">
                                        { showTargetLink &&  <TargetsLink targetType={ targetType } showSearchView={showSearchView} /> }
                                        { showSortOption && <SortOption sortBy={fetchData} /> }
                                    </div>

                                    {userItems.map((item) => (
                                        <UserItem key={item.id} 
                                        userItem={ item } 
                                        actionButton={ actionButton }
                                        perform={perform}
                                     />
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>     
        
    );
}

const ListActions = ({ actionType, actions }) => (
    <div className="action-count pull-right">
        <p><span className="action-count-title">{ actionType }s</span> : <span className={`${actionType}-count daily-actions`}>{actions}</span></p>
    </div>
);

const TargetsLink = ({ targetType, showSearchView }) => (
    <div className="pull-left">
        Showing list of accounts based on your <button className="btn btn-link zero-padding" onClick={() => showSearchView(true) }>{ targetType } targets <i className="fa fa-pencil"></i></button>
    </div>
);


const SortOption = ({ sortBy }) => (
    <div className="pull-right form-inline sort-options">
    <label className="sortLabel" htmlFor="sort">Sort by: </label>

        <form className="form-group" id="order_form">
            <select onChange={(e) => sortBy(e.target.value) } name="order" id="order">
                <option value="desc" defaultValue >Newest First</option>
                <option value="asc">Oldest First</option>
            </select>
        </form>

    </div>
);

const UserItem = ({ userItem, actionButton, perform }) => (
    <div className="item-row">
        <div className="profile-info pull-left">
            <img className="pull-left" src={userItem.profile_image_url} />
            <div className="pull-left">
                <p className="profile-name">{ userItem.name } <span className="profile-username">{ userItem.screen_name }</span></p>
                <p className="profile-title">{ userItem.description }</p>
                <ul className="bottom-info">
                    <li><p>{ userItem.statuses_count }</p></li>
                    <li><p>{ userItem.followers_count }</p></li>
                    <li><p>{ userItem.friends_count }</p></li>
                </ul>
            </div>
        </div>

        <UserActionButtons actionButton={ actionButton } perform={perform} userItem={userItem} />
    </div>
);

class UserActionButtons extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        actionSymbol: this.props.actionButton === "add" ? "fa-plus-circle" : "fa-minus-circle",
        disabled: false
    };

    perform = () => {
        const prevActionSymbol = this.state.actionSymbol;
        if(!this.state.disabled){
            this.setState(() => ({
                actionSymbol: "fa-ban",
                disabled: true
            }));

            this.props.perform(this.props.userItem.id)
            .then((response) => console.log(response))
            .catch(() => {
                this.setState(() => ({
                    actionSymbol: prevActionSymbol,
                    disabled: false
                }));
            });  
        }
    };

    render(){
        return (
            <div className="item-actions pull-right">
                <ul>
                    <li className="text-links"><a href="#">Reply</a></li>
                    <li className="text-links"><a href="#">Whitelist</a></li>
                    <li className="btn-links"><div onClick={this.perform} className={`${this.props.actionButton}-btn action-btn`}><i className={`fa ${this.state.actionSymbol}`}></i></div></li>
                </ul>
            </div>
        ); 
    }
} 

export default UserList;
import React from 'react';
import Loader from '../components/Loader';
import AccountTargetSearchList from './Manage/AccountTargetSearchList';
import KeywordTargetSearchList from './Manage/KeywordTargetSearchList';
import SweetAlert from 'sweetalert2-react';


class UserList extends React.Component{

    constructor(props){
        super(props);    
        
        this.state = {
            buttons: this.createButtons(),
            error: {
                statusText: "",
                message: ""
            }
        };
    }

    actionButton = this.props.actionType === "follow" ? "add" : "sub";
    defaultActionSymbol = this.actionButton === "add" ? "fa-plus-circle" : "fa-minus-circle";
    successActionSymbol = "fa-check";
    loadingActionSymbol = "fa-circle-o-notch fa-spin";

    componentDidUpdate(prevProps){

        if(this.props.userItems !== prevProps.userItems){
            this.setState(() => ({
                buttons: this.createButtons()
            })); 
        }
    }

    createButtons = () => {
        return this.props.userItems.map((userItem) => (
            {   
                id: userItem.id,
                name: userItem.username,
                actionSymbol: this.defaultActionSymbol,
                action: this.actionButton,
                disabled: false
            }
        ));
    };

    perform = (index) => {
        
        if(!this.state.buttons[index].disabled){

            let buttons = this.state.buttons;
            buttons[index].disabled = true;
            buttons[index].actionSymbol = this.loadingActionSymbol;

            this.setState(() => ({
                buttons
            }));

            this.props.perform(this.state.buttons[index].name)
            .then((response) => {
                buttons[index].disabled = true;
                buttons[index].actionSymbol = this.successActionSymbol;

                this.setState(() => ({
                    buttons
                }));
            })
            .catch((error) => {
                buttons[index].disabled = false;
                buttons[index].actionSymbol = this.defaultActionSymbol;

                this.setState(() => ({
                    buttons,
                    error: {
                        statusText:error.response.statusText,
                        message: error.response.data.message
                    }
                }));
            });  
        }
    };

    render(){
        const {   
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
            fetchData = (order = 'desc') => {}           
        } = this.props;

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
            
            <SweetAlert
                show={!!this.state.error.message}
                title={this.state.error.statusText}
                text={this.state.error.message}
                onConfirm={() => this.setState({ error: {statusText: "", message: ""} })}
            />

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
    
                                        {userItems.map((item, index) => (
                                            <UserItem key={index} 
                                            indexValue={index}
                                            userItem={ item } 
                                            actionButton={ this.state.buttons[index] }
                                            perform={this.perform}
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

const UserItem = ({ userItem, actionButton, perform, indexValue }) => (
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

        <UserActionButtons indexValue={indexValue} actionButton={ actionButton } perform={perform} userItem={userItem} />
    </div>
);

const UserActionButtons = ({indexValue, actionButton, perform }) => (
        <div className="item-actions pull-right">
            <ul>
                <li className="text-links"><a href="#">Reply</a></li>
                <li className="text-links"><a href="#">Whitelist</a></li>
                <li className="btn-links">
                    {!!actionButton && 
                    <div onClick={() => perform(indexValue)} className={`${actionButton.action}-btn action-btn`}>
                        <i className={`fa ${actionButton.actionSymbol} ${actionButton.disabled ? 'grey-txt' : ''}`}></i>
                    </div>}
                </li>
            </ul>
        </div>
); 

export default UserList;
import React from 'react';
import SweetAlert from 'sweetalert2-react';
import Loader from '../components/Loader';
import AccountTargetSearchList from './Manage/AccountTargetSearchList';
import KeywordTargetSearchList from './Manage/KeywordTargetSearchList';
import {abbrNum} from "../utils/numberFormatter";
import {tweet} from "../requests/twitter/channels";

class UserList extends React.Component{

    constructor(props){
        super(props);    
        
        this.state = {
            error: {
                statusText: "",
                message: ""
            }
        };
    }

    perform = (username) => { 
        return this.props.perform(username)
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((error) => {
                this.setState(() => ({
                    error: {
                        statusText:error.response.statusText,
                        message: error.response.data.message
                    }
                }));

                return Promise.reject(error);
            });  
    };

    reply = (content) => {
        return tweet(content)
        .then((response) => Promise.resolve(response))
        .catch((error) => {
            this.setState(() => ({
                error: {
                    statusText:error.response.statusText,
                    message: error.response.data.message
                }
            }));
            Promise.reject(error);
        });
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
                                            userItem={ item } 
                                            perform={this.perform}
                                            reply={this.reply}
                                            actionType={this.props.actionType}
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

class UserItem extends React.Component{

    actionButton = this.props.actionType === "follow" ? "add" : "sub";
    defaultActionSymbol = this.actionButton === "add" ? "fa-plus-circle" : "fa-minus-circle";
    successActionSymbol = "fa-check";
    loadingActionSymbol = "fa-circle-o-notch fa-spin";

    state = { 
        buttonState: {
            actionSymbol: this.defaultActionSymbol,
            action: this.actionButton,
            disabled: false
        },
        replyState: {
            content: '',
            disabled: true,
            letterCount: 280 - (this.props.userItem.screen_name.length + 2),
            loading: false
        }
    }

    perform = () => {
        
        if(!this.state.buttonState.disabled){

            let buttonState = Object.assign({}, this.state.buttonState);
            buttonState.disabled = true;
            buttonState.actionSymbol = this.loadingActionSymbol;

            this.setState(() => ({
                ...this.state,
                buttonState
            }));

            this.props.perform(this.props.userItem.screen_name)
            .then((response) => {
                buttonState.disabled = true;
                buttonState.actionSymbol = this.successActionSymbol;

                this.setState(() => ({
                    buttonState
                }));

                return Promise.resolve(response);
            })
            .catch((error) => {
                buttonState.disabled = false;
                buttonState.actionSymbol = this.defaultActionSymbol;

                this.setState(() => ({
                    buttonState,
                }));

                return Promise.reject(error);
            });  
        }
    };

    reply = () => {
        this.setReplyState({loading: true});
        this.props.reply(this.state.replyState.content)
        .then((response) => {
            this.setReplyState({disabled: true, loading:false});
            return Promise.resolve(response);
        })
        .catch((error) => {
            this.setReplyState({loading: false});
            return Promise.reject(error);
        });
    };

    setReplyState = (replyState) => {
        this.setState((prevState) => ({
            ...this.state,
            replyState: {
                ...this.state.replyState,
                letterCount: prevState.replyState.disabled ? 280 - (this.props.userItem.screen_name.length + 2) : replyState.letterCount,
                ...replyState
            }
        }));
    };

    render(){
        const { userItem } = this.props;
        return (
            
            <div>    
                <div className="item-row">
        
                    <div>
                        <div className="profile-info pull-left">
                            <img className="pull-left" src={userItem.profile_image_url} />
                            <div className="pull-left">
                                <p className="profile-name">{ userItem.name } <span className="profile-username">{ userItem.screen_name }</span></p>
                                <p className="profile-title">{ userItem.description }</p>
                                <ul className="bottom-info">
                                    <li><p>{ abbrNum(userItem.statuses_count, 1) } tweets</p></li>
                                    <li><p>{ abbrNum(userItem.followers_count, 1) } followers</p></li>
                                    <li><p>{ abbrNum(userItem.friends_count, 1) } following</p></li>
                                </ul>
                            </div>
                        </div>
        
                        <UserActionButtons actionButton={ this.state.buttonState } perform={this.perform} userItem={userItem} replyState={this.state.replyState} setReplyState={this.setReplyState}/>
                    </div>
                    
                    { !this.state.replyState.disabled && 
                        <div className="reply-box">
                            <span className="reply__arrow"></span>
                            <textarea spellCheck="false" value={this.state.replyState.content} onChange={(e) => this.setReplyState({letterCount: 280 - e.target.value.length, content: e.target.value})}></textarea>
                            <span className="grey-txt">{this.state.replyState.letterCount}</span>
                            {   
                                this.state.replyState.letterCount >= 0 ?
                                <button onClick={this.reply} className="btn compose-btn pull-right mg10"> 
                                { this.state.replyState.loading && <i className="fa fa-circle-o-notch fa-spin"></i> }   
                                Tweet</button>
                                :
                                <button className="btn compose-btn pull-right mg10 disabled" disabled>
                                { this.state.replyState.loading && <i className="fa fa-circle-o-notch fa-spin"></i> }
                                Tweet</button>
                            }
                        </div>
                    }
                </div>
            </div>
        
        );
    }
}

const UserActionButtons = ({actionButton, perform, replyState, setReplyState, userItem }) => (
        <div className="item-actions pull-right">
            <ul className="v-center-align">
                <li className="text-links">
                    <a onClick={() => setReplyState({disabled: !replyState.disabled, content: `@${userItem.screen_name} `})} className="link-cursor">Reply</a>
                </li>
                <li className="btn-links">
                    {!!actionButton && 
                    <div onClick={perform} className={`${actionButton.action}-btn action-btn`}>
                        <i className={`fa ${actionButton.actionSymbol} ${actionButton.disabled ? 'grey-txt' : ''}`}></i>
                    </div>}
                </li>
            </ul>
        </div>
); 

export default UserList;
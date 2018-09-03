import React from 'react';

export default class AccountTargetSearchList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="item-list shadow-box">
                        <div className="item-header">
                            <button onClick={() => this.props.showSearchView(false)} className="gradient-background-teal-blue default-button">Done</button>
                        </div>
                        <div className="search-bar mt20">
                            <div className="form-row">
                                <div className="col-md-11 mb-3 p10-5">
                                    <input type="text" className="form-control p20 full-radius" id="username" name="username" placeholder="@ Enter Channel" />
                                </div>
                                <div className="col-md-1 mb-3 p10-5">
                                    <a className="gradient-background-teal-blue white-button add-target">ADD</a>
                                </div>
                            </div>
                        </div>
        
                        <div className="added">

                                {!!this.props.targets.length && 
                                    <div>
                                        <div className="list-header">Saved Accounts</div>
                                        <div className="added-items">
                                        
                                            {this.props.targets.map((target) => <TargetItem key={target.id} target={target} />)}
                    
                                        </div>
                                    </div>
                                }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

const TargetItem = ({target}) => (
    <div className="item-row">
        <div className="profile-info pull-left">
            <img className="pull-left" src={target.profile_image_url} />
            <div className="pull-left">
                <input type="hidden" className="user_id" value=""/>
                <p className="profile-name mt15">{target.name} <span className="profile-username">@{target.screen_name}</span></p>
            </div>
        </div>
        <div className="item-actions pull-right">
            <ul>
                <li className="btn-links"><div className="trash-btn"><i className="fa fa-trash"></i> <span className="delete-text"> Delete</span></div></li>
            </ul>
        </div>
    </div>
);
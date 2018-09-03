import React from 'react';

export default class KeywordTargetSearchList extends React.Component{
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
                                <div className="col-md-9 mb-3 p10-5">
                                    <input type="text" className="form-control p20 left-radius" id="keyword" name="keyword" placeholder="Enter keywords" />
                                </div>
                                <div className="col-md-2 mb-3 p10-5">
                                    <div className="">
                                        <input type="text" className="form-control p20 right-radius location-search" autoComplete="off" id="location" placeholder="&#xf041; Chose Location" />
                                    </div>

                                </div>
                                <div className="col-md-1 mb-3 p10-5">
                                    <a className="gradient-background-teal-blue white-button add-target">ADD</a>
                                </div>
                        </div>
                    </div>

                        <div className="added">
                
                            <div className="list-header">
                                <div className="col-sm-4 col-md-5 col-5"> Keyword </div>
                                <div className="col-sm-4 col-md-5 col-5"> Location </div>
                            </div>

                            <div className="added-items">
                        

                                <div className="item-row ptb20 keyword-item">
                                    <div className="col-sm-4 col-md-5 col-5"> anime </div>
                                    <div className="col-sm-4 col-md-5 col-5"> Worldwide </div>

                                    <div className="col-sm-1 col-md-1 col-1 pull-right txt-center">
                                        <div className="trash-btn"><i className="fa fa-trash"></i> <span className="delete-text"> Delete</span></div>
                                    </div>
                                </div>

                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 
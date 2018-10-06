import React from 'react';
import Geosuggest from 'react-geosuggest';
import {addKeywordTarget, destroyKeywordTarget} from '../../requests/twitter/channels';
import Loader from '../../components/Loader';

export default class KeywordTargetSearchList extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        target: "",
        loading: false
    };

    onChange = (e) => {
        const target = e.target.value;
        this.setState(() => ({
            target
        }));
    };

    onSubmit = (e) => {
        this.setLoading(true);
        e.preventDefault();
        const target = this.state.target;
        if(target.length){
          addKeywordTarget(target)
          .then((response) => {
              this.props.reloadTargets(response);
              this.setLoading(false);
            }).catch((error) => {
                this.setLoading(false);
            });  
        }
    };

    setLoading = (loading = false) => {
        this.setState(() => ({
            loading
        }));
    }

    removeTarget = (target) => {
        this.setLoading(true);
        destroyKeywordTarget(target)
        .then((response) => {
            this.props.reloadTargets(response);
            this.setLoading(false);
        }).catch((error) => {
            this.setLoading(false);
        });
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
                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    <div className="col-md-9 mb-3 p10-5">
                                        <input type="text" className="form-control p20 left-radius" onChange={this.onChange} id="keyword" name="keyword" placeholder="Enter keywords" />
                                    </div>
                                    <div className="col-md-2 mb-3 p10-5 pstatic">
                                        <div className="">
                                            <Geosuggest inputClassName="form-control p20 right-radius location-search" autoComplete="off" id="location" placeholder="&#xf041; Worldwide"/>
                                        </div>
                                    </div>
                                    <div className="col-md-1 mb-3 p10-5">
                                        {
                                            this.state.target ?
                                            <button className="gradient-background-teal-blue white-button add-target">ADD</button>
                                            :
                                            <button className="gradient-background-teal-blue white-button add-target disabled" disabled>ADD</button>
                                        }
                                        
                                    </div>
                                </div> 
                            </form>
                    </div>

                        <div className="added">

                            {!!this.props.targets.length && 
                                <div>                                
                                    <div className="list-header">
                                        <div className="col-sm-4 col-md-5 col-5"> Keyword </div>
                                        <div className="col-sm-4 col-md-5 col-5"> Location </div>
                                    </div>

                                    <div className="added-items">
                                        {this.props.targets.map((target) => <KeywordItem key={target.id} target={target} removeTarget={this.removeTarget} />)}
                                    </div>
                                </div>
                            }
                            {this.state.loading && <Loader />}
 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

const KeywordItem = ({target, removeTarget}) => (
    <div className="item-row ptb20 keyword-item">
        <div className="col-sm-4 col-md-5 col-5"> #{target.keyword} </div>
        <div className="col-sm-4 col-md-5 col-5"> Worldwide </div>

        <div className="col-sm-1 col-md-1 col-1 pull-right txt-center">
            <div onClick={() => removeTarget(target.id)} className="trash-btn"><i className="fa fa-trash"></i> <span className="delete-text"> Delete</span></div>
        </div>
    </div>
);
import React from 'react';
import Loader from 'react-loader-spinner';

class TwitterOverviewCard extends React.Component{
    state = {
        count: null,
        loading: false
    };

    componentDidMount(){

    };

    componentDidUpdate(prevProps){
        
    }

    render(){
        const {name, description} = this.props;
        return (
            <div className="overview-card analytics-card">
                <div className="card-header">
                    <img className="card-img" src="/images/twitter.png"></img> {name}
                    <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
                </div>
                <div className="card-analytics-body">
                    <div className="card-number">
                        {this.state.loading ?  <Loader type="Bars" color="#46a5d1" height={60} width={60} /> : this.state.count !=null && this.state.count}
                    </div>
                    <div className="card-description">{description}</div>
                </div>
                <div className="card-footer">
                </div>
            </div>
            );
    }
}

export default TwitterOverviewCard;
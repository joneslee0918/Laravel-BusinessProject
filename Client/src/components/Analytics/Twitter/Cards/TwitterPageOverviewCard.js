import React from 'react';
import Loader from 'react-loader-spinner';

class TwitterPageOverviewCard extends React.Component{
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
                <div className="card-analytics-body anl-post-page">
                    <span className="anl-desc card-description">{description}</span><span className="anl-count">
                        {this.state.loading ? <Loader type="Bars" color="#ffffff" height={15} width={15} /> : this.state.count !=null && this.state.count}
                    </span>
                </div>
            </div>
            );
    }
}

export default TwitterPageOverviewCard;
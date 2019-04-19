import React from 'react';
import Loader from 'react-loader-spinner';

class EngagementCard extends React.Component{
    state = {
        data: null,
        loading: false
    };

    componentDidMount(){      
    };

    componentDidUpdate(prevProps){
        
    }

    render(){
        const {name} = this.props;
        return (
            <div className="overview-card analytics-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="eng-card-section">
                <span className="anl-desc card-description">Likes</span>
                <span className="anl-count">
                    {this.state.loading ? <Loader type="Bars" color="#ffffff" height={15} width={15} /> : this.state.data !=null && this.state.data.reactions}                
                </span>         
            </div>
            <div className="eng-card-section eng-card-section-middle">
                <span className="anl-desc card-description">Retweets</span>
                <span className="anl-count">
                    {this.state.loading ? <Loader type="Bars" color="#ffffff" height={15} width={15} /> : this.state.data !=null && this.state.data.comments}
                </span>
            </div>
        </div>
            );
    }
}

export default EngagementCard;
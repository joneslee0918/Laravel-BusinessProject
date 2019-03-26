import React from 'react';
import { pageInsightsByType } from "../../../../requests/facebook/channels";

class OverviewCard extends React.Component{
    state = {
        count: 0,
        loading: false
    };

    componentDidMount(){
        this.fetchAnalytics();
    };

    componentDidUpdate(prevProps){
        if(prevProps.selectedAccount != this.props.selectedAccount || prevProps.calendarChange != this.props.calendarChange)
        {
            this.fetchAnalytics();
        }
        
    }

    fetchAnalytics = () => {
        this.setState(() => ({
            loading: true
        }));
        try {
            pageInsightsByType(this.props.selectedAccount, this.props.startDate, this.props.endDate, this.props.type)            
            .then((response) => {
                this.setState(() => ({
                    count: response,
                    loading: false
                }));
            }).catch(error => {
                this.setState(() => ({
                    loading: false
                }));
                return Promise.reject(error);
            }); 
        } catch (error) {
            
        }
        
    };

    render(){
        const {name, description} = this.props;
        return (
            <div className="overview-card analytics-card">
                <div className="card-header">
                    <img className="card-img" src="/images/facebook.png"></img> {name}
                    <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
                </div>
                <div className="card-analytics-body">
                    <div className="card-number">{this.state.count}</div>
                    <div className="card-description">{description}</div>
                </div>
                <div className="card-footer">
                </div>
            </div>
            );
    }
}

export default OverviewCard;
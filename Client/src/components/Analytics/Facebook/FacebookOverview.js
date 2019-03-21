import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import OverviewCard from './Cards/OverviewCard';
import PageOverviewCard from './Cards/PageOverviewCard';
import PostsChart from './Cards/PostsChart';
import FansChart from './Cards/FansChart';
import EngagementCard from './Cards/EngagementCard';
import EngagementChart from './Cards/EngagementChart';
import PostsTable from './Cards/PostsTable';
import VideoViewsTable from './Cards/VideoViewsTable';
import { pageInsights } from "../../../requests/facebook/channels";
import { DateRangePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';

class FacebookOverview extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false,
        startDate: moment().subtract(30, 'days'),
        endDate: moment().add(1, 'days')
    }

    componentDidMount() {      
        this.fetchAnalytics();
    }

    componentDidUpdate() {

    }

    onCalendarClose() {
        this.fetchAnalytics();
    }

    fetchAnalytics = () => {
        this.setState(() => ({
            loading: true
        }));
        try {
            pageInsights(16, this.state.startDate, this.state.endDate)            
            .then((response) => {
                this.setState(() => ({
                    data: response,
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
        const data = this.state.data;
        return (
            <div>
            {this.state.data && 
            <div>
                <div className="row">            
                    <div className="col-xs-12">
                        <div className="analytics-head">
                            <div className="analytics-head-left">
                                Facebook Overview
                            </div>         
                            <div className="analytics-head-right">
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                                    onDatesChange={({startDate, endDate}) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    showDefaultInputIcon={true}
                                    onClose={({})=> this.onCalendarClose()}
                                />
                            </div>                   
                        </div>                        
                    </div>
                </div>
                <div className="row overview-cards-container mb20">
                    <div className="col-md-3 col-xs-12"><OverviewCard name='Posts' count={this.state.data.posts} description='posts' growth='10 from 0' /></div>
                    <div className="col-md-3 col-xs-12"><OverviewCard name='Fans' count={this.state.data.fans} description='fans' growth='1 from 601' /></div>
                    <div className="col-md-3 col-xs-12"><OverviewCard name='Engagement' count={this.state.data.engagement} description='engagements' growth='6 from 0' /></div>
                    <div className="col-md-3 col-xs-12"><OverviewCard name='Traffic' count='0' description='clicks' growth='0 from 0' /></div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12"><PageOverviewCard name="Posts by Page" count={this.state.data.posts} description="Uniclix"/></div>
                    <div className="col-md-9 col-xs-12"><PostsChart name="Posts" data={this.state.data.postsChartData}/></div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12"><PageOverviewCard name="Fans by Page" count={this.state.data.fans} description="Uniclix"/></div>
                    <div className="col-md-9 col-xs-12"><FansChart name="Fans" data={this.state.data.fansChartData}/></div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12"><EngagementCard name="Engagement by Type" count="599" description="Uniclix"/></div>
                    <div className="col-md-9 col-xs-12"><EngagementChart name="Fans"/></div>
                </div>
                <div className="row mb20">
                    <div className="col-xs-12"><PostsTable name="Posts Table" count="0" data={this.state.data.postsData}/></div>
                </div>
                {/* <div className="row mb20">
                    <div className="col-xs-12"><VideoViewsTable name="Posts Views Table" /></div>
                </div> */}
            </div> }
            </div>
        );
    }
}

export default FacebookOverview;
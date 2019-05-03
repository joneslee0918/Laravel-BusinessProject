import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';
import channelSelector, {linkedinPages} from '../../../selectors/channels';
import Select from 'react-select';
import LinkedinOverviewCard from '../Linkedin/Cards/LinkedinOverviewCard';
import LinkedinPageOverviewCard from '../Linkedin/Cards/LinkedinPageOverviewCard';
import PostsChart from '../Linkedin/Cards/PostsChart';
import EngagementCard from '../Linkedin/Cards/EngagementCard';
import EngagementChart from '../Linkedin/Cards/EngagementChart';
import PostsTable from '../Linkedin/Cards/PostsTable';

class LinkedinOverview extends React.Component {

    state = {
        startDate: moment().subtract(30, 'days'),
        endDate: moment().add(1, 'days'),
        selectedAccount: Object.entries(this.props.selectedChannel).length ? 
        {label: <ProfileChannel channel={this.props.selectedChannel} />, value: this.props.selectedChannel.id, type: this.props.selectedChannel.type} : 
        (this.props.channels.length ? 
          {label: <ProfileChannel channel={this.props.channels[0]} />, value: this.props.channels[0].id, type: this.props.channels[0].type} : {}),
        loading: false,
        calendarChange: false
    }

    handleAccountChange = (selectedAccount) => {
        this.setState(() => ({
            selectedAccount
        }));
    };

    onCalendarClose() {
        this.setState(() => ({
            calendarChange : !this.state.calendarChange
        }));
    }

    render(){
        const propData = {
            startDate: this.state.startDate,
            endDate: this.state.endDate, 
            selectedAccount: this.state.selectedAccount.value,
            calendarChange: this.state.calendarChange,
        }
        return (
            <div>
            <div>
                <div className="row">            
                    <div className="col-xs-12">
                        <div className="analytics-head">
                            <div className="analytics-head-left">
                                Linkedin Overview
                            </div>
                            <div className="streams-default-container">
                                <div className="account-selection">
                                    <Select
                                        value={this.state.selectedAccount}
                                        onChange={this.handleAccountChange}
                                        options={this.props.channels.map(channel => {
                                            return {label: <ProfileChannel channel={channel} />, value: channel.id, type: channel.type}
                                        })}
                                    />
                                </div>        
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
                    <div className="col-md-3 col-xs-12">
                        <LinkedinOverviewCard 
                            name='Posts' 
                            type="postsCount" 
                            description='posts' 
                            {...propData}/>               
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <LinkedinOverviewCard 
                            name='Followers' 
                            type="followersCount" 
                            description='followers' 
                            {...propData}/>
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <LinkedinOverviewCard 
                            name='Engagement' 
                            type="" 
                            description='engagement' 
                            {...propData}/>
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <LinkedinOverviewCard 
                            name='Traffic' 
                            type="" 
                            description='click' 
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <LinkedinPageOverviewCard 
                            name="Posts by Page"  
                            type=''
                            description="Uniclix"
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <PostsChart 
                            name="Posts" 
                            type=''
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <LinkedinPageOverviewCard 
                            name="Followers by Page"  
                            type=''
                            description="Uniclix"
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <PostsChart 
                            name="Followers" 
                            type=''
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <EngagementCard 
                            name="Engagement by Type" 
                            type=''
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <EngagementChart 
                            name="Engagement by Type" 
                            type=''
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-xs-12">
                        <PostsTable 
                            name="Posts Table" 
                            type=''
                            {...propData}/>
                    </div>
                </div>
            </div> 
            </div>
        );
    }
}

const ProfileChannel = ({channel}) => (
    <div className="channel-container">
        <div className="profile-info pull-right">
            <span className="pull-left profile-img-container">
                <img src={channel.avatar}/>
                <i className={`fa fa-${channel.type} ${channel.type}_bg smallIcon`}></i>
            </span>
            <div className="pull-left"><p className="profile-name" title={channel.name}>{channel.name}</p>
            <p className="profile-username">{channel.username !== null ? "@"+channel.username : ""}</p>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {

    const channels = linkedinPages(state.channels.list);
    let selectedChannel = channelSelector(channels, {selected: 1, provider: "linkedin", publishable: true});
    selectedChannel = selectedChannel.lenght ? selectedChannel[0] : {};

    return {
        channels,
        selectedChannel
    };
};

export default connect(mapStateToProps)(LinkedinOverview);
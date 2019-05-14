import React from 'react';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { isInclusivelyBeforeDay } from 'react-dates';
import channelSelector from '../../../selectors/channels';
import Select from 'react-select';
import TwitterOverviewCard from '../Twitter/Cards/TwitterOverviewCard';
import TwiterPageOverviewCard from '../Twitter/Cards/TwitterPageOverviewCard';
import TweetsChart from '../Twitter/Cards/TweetsChart';
import TwitterEngagementCard from '../Twitter/Cards/TwitterEngagementCard';
import TwitterEngagementChart from '../Twitter/Cards/TwitterEngagementChart';
import TweetsTable from '../Twitter/Cards/TweetsTable';
import UpgradeAlert from '../../UpgradeAlert';

class TwitterOverview extends React.Component {

    state = {
        startDate: moment().subtract(30, 'days'),
        endDate: moment().add(1, 'days'),
        selectedAccount: Object.entries(this.props.selectedChannel).length ? 
        {label: <ProfileChannel channel={this.props.selectedChannel} />, value: this.props.selectedChannel.id, type: this.props.selectedChannel.type} : 
        (this.props.channels.length ? 
          {label: <ProfileChannel channel={this.props.channels[0]} />, value: this.props.channels[0].id, type: this.props.channels[0].type} : {}),
        loading: false,
        forbidden: false,
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

    setForbidden = (forbidden = false) => {
        this.setState(() => ({
            forbidden
        }));
    }

    render(){
        const propData = {
            startDate: this.state.startDate,
            endDate: this.state.endDate, 
            selectedAccount: this.state.selectedAccount.value,
            calendarChange: this.state.calendarChange,
            setForbidden: this.setForbidden
        }
        return (
            <div>
            <UpgradeAlert isOpen={this.state.forbidden && !this.state.loading} goBack={true} setForbidden={this.setForbidden}/>
            {!this.state.forbidden && <div>
                <div className="row">            
                    <div className="col-xs-12">
                        <div className="analytics-head">
                            <div className="analytics-head-left">
                                Facebook Overview
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
                        <TwitterOverviewCard 
                            name='Tweets' 
                            type="tweetsCount" 
                            description='tweets' 
                            {...propData}/>               
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <TwitterOverviewCard 
                            name='Followers' 
                            type="followersCount" 
                            description='followers' 
                            {...propData}/>
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <TwitterOverviewCard 
                            name='Engagement' 
                            type="tweetsCount" 
                            description='engagement' 
                            {...propData}/>
                    </div>
                    <div className="col-md-3 col-xs-12">
                        <TwitterOverviewCard 
                            name='Traffic' 
                            type="tweetsCount" 
                            description='click' 
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <TwiterPageOverviewCard 
                            name="Tweets by Account"  
                            type='tweetsCount'
                            description="Uniclix"
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <TweetsChart 
                            name="Tweets" 
                            type='tweetsChartData'
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <TwiterPageOverviewCard 
                            name="Followers by Account"  
                            type='followersCount'
                            description="Uniclix"
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <TweetsChart 
                            name="Followers" 
                            type='followersChartData'
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-md-3 col-xs-12">
                        <TwitterEngagementCard 
                            name="Engagement by Type" 
                            type='engagementsByType'
                            {...propData}/>
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <TwitterEngagementChart 
                            name="Engagement by Type" 
                            type='engagementByTypeData'
                            {...propData}/>
                    </div>
                </div>
                <div className="row mb20">
                    <div className="col-xs-12">
                        <TweetsTable 
                            name="Tweets Table" 
                            type='tweetsTableData'
                            {...propData}/>
                    </div>
                </div>
            </div> }
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

    const twitterChannelsFilter = {selected: undefined, provider: "twitter", publishable: true};
    const channels = channelSelector(state.channels.list, twitterChannelsFilter);
    let selectedChannel = channelSelector(state.channels.list, {selected: 1, provider: "twitter", publishable: true});
    selectedChannel = selectedChannel.lenght ? selectedChannel[0] : {};

    return {
        channels,
        selectedChannel
    };
};

export default connect(mapStateToProps)(TwitterOverview);
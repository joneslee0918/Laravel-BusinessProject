import React from 'react';
import { connect } from "react-redux";
import UpgradeAlert from '../../UpgradeAlert';
import channelSelector from "../../../selectors/channels";
import {startSetChannels} from "../../../actions/channels";
import { getDashboard } from "../../../requests/twitter/channels";
import {abbrNum} from "../../../utils/numberFormatter";
import Loader from "../../Loader";
import { DateRangePicker } from 'react-dates';
import Select from 'react-select';
import 'react-dates/initialize';
import moment from 'moment';
import TwitterOverviewCard from '../../Analytics/Twitter/Cards/TwitterOverviewCard';
import TweetsTable from '../../Analytics/Twitter/Cards/TweetsTable';

class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false,
        loading: false,
        forbidden: false,
        startDate: moment().subtract(30, 'days'),
        endDate: moment().add(1, 'days'),
        selectedAccount: Object.entries(this.props.selectedChannel).length ?
            { label: <ProfileChannel channel={this.props.selectedChannel} />, value: this.props.selectedChannel.id, type: this.props.selectedChannel.type } :
            (this.props.channels.length ?
                { label: <ProfileChannel channel={this.props.channels[0]} />, value: this.props.channels[0].id, type: this.props.channels[0].type } : {}),
        loading: false,
        forbidden: false,
        calendarChange: false
    }
    
    componentDidMount() {
        
        if(!this.props.channelsLoading){
            this.fetchDashboard();
        }
    }

    componentDidUpdate(prevProps) {
    
        if(this.props.selectedChannel !== prevProps.selectedChannel){
            this.fetchDashboard();
        }
    }

    setLoading = (loading = false) => {
        this.setState(() => ({
            loading
        }));
    };

    setForbidden = (forbidden = false) => {
        this.setState(() => ({
            forbidden
        }));
    };
    
    fetchDashboard = () => {
        this.setLoading(true);
        getDashboard()
        .then((response) => {
            this.setState(() => ({
                data: response,
                loading: false,
                forbidden: false
            }));
        }).catch(error => {
            this.setLoading(false);
            if(error.response.status === 401){
                    
                if(this.props.selectedChannel.active){
                   this.props.startSetChannels();
                }
            }

            if(error.response.status === 403){
                this.setForbidden(true);
            }

            return Promise.reject(error);
        });
    };

    render(){
        const propData = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            selectedAccount: this.state.selectedAccount.value,
            calendarChange: this.state.calendarChange,
            setForbidden: this.setForbidden
        }

        const data = this.state.data;
        return (
            <div>
                <h2>DASHBOARD</h2>

                <UpgradeAlert isOpen={this.state.forbidden && !this.state.loading} goBack={true} setForbidden={this.setForbidden}/>

                {this.state.data ? 
                <div>
                    {/* <div className="row">
                        <div className="col-xs-12">

                            <ul className="dashboard-info shadow-box">
                                <li>
                                    <p className="title">Followers</p>
                                    <p className="count">{abbrNum(data.followers_count, 1)}</p>
                                    <p className="description">People who follow you</p>
                                </li>
                                <li>
                                    <p className="title">You follow</p>
                                    <p className="count">{abbrNum(data.friends_count, 1)}</p>
                                    <p className="description">People you follow</p>
                                </li>
                                <li>
                                    <p className="title">Tweets</p>
                                    <p className="count">{abbrNum(data.statuses_count, 1)}</p>
                                    <p className="description">The tweets you posted</p>
                                </li>
                                <li>
                                    <p className="title">Info</p>
                                    <p className="description text-only">Lorem ipsum dolor sit amet, lor ipsum dolor sit amet</p>
                                </li>

                            </ul>
                        </div>
                    </div>  */}

                    
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="analytics-head">
                                <div className="analytics-head-left">
                                    Twitter Overview
                                </div>
                                <div className="streams-default-container">
                                    <div className="account-selection">
                                        <Select
                                            value={this.state.selectedAccount}
                                            onChange={this.handleAccountChange}
                                            options={this.props.channels.map(channel => {
                                                return { label: <ProfileChannel channel={channel} />, value: channel.id, type: channel.type }
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
                                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                        showDefaultInputIcon={true}
                                        onClose={({ }) => this.onCalendarClose()}
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
                                tooltipDesc='The number of tweets published from your Twitter account'
                                {...propData} />
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <TwitterOverviewCard
                                name='Followers'
                                type="followersCount"
                                description='followers'
                                tooltipDesc='The number of people who are following your Twitter account'
                                {...propData} />
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <TwitterOverviewCard
                                name='Engagement'
                                type="tweetsCount"
                                description='engagement'
                                tooltipDesc='The sum of interactions received for the tweets published in the selected timeframe: retweets, replies and likes'
                                {...propData} />
                        </div>
                        <div className="col-md-3 col-xs-12">
                            <TwitterOverviewCard
                                name='Traffic'
                                type="tweetsCount"
                                description='click'
                                tooltipDesc='Clicks'
                                {...propData} />
                        </div>
                    </div>

                    <div className="row mb20">
                        <div className="col-xs-12">
                            <TweetsTable
                                name="Tweets Table"
                                type='tweetsTableData'
                                tooltipDesc='The list of tweets published by your Twitter account, with their engagement stats: retweets, replies and likes'
                                {...propData} />
                        </div>
                    </div>

                </div>: this.state.loading && <Loader />}
                
            </div>
        );
    }
}
const ProfileChannel = ({ channel }) => (
    <div className="channel-container">
        <div className="profile-info pull-right">
            <span className="pull-left profile-img-container">
                <img src={channel.avatar} />
                <i className={`fa fa-${channel.type} ${channel.type}_bg smallIcon`}></i>
            </span>
            <div className="pull-left"><p className="profile-name" title={channel.name}>{channel.name}</p>
                <p className="profile-username">{channel.username !== null ? "@" + channel.username : ""}</p>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    const twitterChannelsFilter = { selected: undefined, provider: "twitter", publishable: true };
    const channels = channelSelector(state.channels.list, twitterChannelsFilter);
    let selectedChannel = channelSelector(state.channels.list, { selected: 1, provider: "twitter", publishable: true });
    selectedChannel = selectedChannel.lenght ? selectedChannel[0] : {};

    return {
        channelsLoading: state.channels.loading,
        channels,
        selectedChannel
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

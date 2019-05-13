import React from 'react';
import { connect } from 'react-redux';
import TwitterAnalytics from '../TwitterAnalytics';
import FacebookAnalytics from '../FacebookAnalytics';
import UpgradeModal from '../../UpgradeModal';
import channelSelector from '../../../selectors/channels';

class Overview extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false,
        forbidden: false,
        days: 1
    }

    onDaysChange = (days) => {
        this.setState(()=> ({
            days
        }));
    };
    
    setForbidden = (forbidden = false) => {
        this.setState(() => ({
            forbidden
        }));
    };

    render(){
        const {channels} = this.props;
        const Analytics = ({channel}) => {
            if(channel.type == "twitter") {
                return <TwitterAnalytics days={this.state.days} channel={channel} setForbidden={this.setForbidden}/>
            }

            if(channel.type == "facebook") {
                return <FacebookAnalytics days={this.state.days} channel={channel} setForbidden={this.setForbidden}/>
            }

            return <div></div>
        }
        return (
            <div>
                <h2>ANALYTICS OVERVIEW</h2>  
                <UpgradeModal isOpen={this.state.forbidden && !this.state.loading} />
                {!this.state.forbidden && <div>
                    <ul className="analytics-filter">
                        <li className="analytics-filter-li" onClick={() => this.onDaysChange(1)}><a>Today</a></li>
                        <li className="analytics-filter-li" onClick={() => this.onDaysChange(7)}><a>Last 7 Days</a></li>
                        <li className="analytics-filter-li" onClick={() => this.onDaysChange(30)}><a>Last 30 Days</a></li>
                    </ul>

                    {channels.map((channel, index) => {
                        return <Analytics key={index} channel={channel}/>
                    })}           
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider: undefined, publishable: true});
    return {
        channels
    }
}

export default connect(mapStateToProps)(Overview);

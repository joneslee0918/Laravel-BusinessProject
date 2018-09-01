import React from 'react';
import { connect } from "react-redux";
import channelSelector from "../../../selectors/channels";
import { getDashboard } from "../../../requests/channels";

class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false
    }
    
    componentDidMount() {
        
        if(!this.props.channelsLoading){
            getDashboard()
                .then((response) => {
                    this.setState(() => ({
                        data: response
                    }));
                });
        }
    }

    componentDidUpdate(prevProps) {
    
        if(this.props.selectedChannel !== prevProps.selectedChannel){
            getDashboard()
                .then((response) => {
                    this.setState(() => ({
                        data: response
                    }));
                });
        }
    }

    render(){
        const data = this.state.data;
        return (
            <div>
                <h2>DASHBOARD</h2>

                {this.state.data ? <div className="row">
                    <div className="col-xs-12">

                        <ul className="dashboard-info shadow-box">
                            <li>
                                <p className="title">Followers</p>
                                <p className="count">{data.followers_count}</p>
                                <p className="description">People who follow you</p>
                            </li>
                            <li>
                                <p className="title">You follow</p>
                                <p className="count">{data.friends_count}</p>
                                <p className="description">People you follow</p>
                            </li>
                            <li>
                                <p className="title">Tweets</p>
                                <p className="count">{data.statuses_count}</p>
                                <p className="description">The tweets you posted</p>
                            </li>
                            <li>
                                <p className="title">Info</p>
                                <p className="description text-only">Lorem ipsum dolor sit amet, lor ipsum dolor sit amet</p>
                            </li>

                        </ul>
                    </div>
                </div>: "Loading..."}

                <div className="row">
                    <div className="col-xs-12">
                        <div className="col-xs-12 col-md-8 shadow-box">
                            Chart coming soon...
                        </div>
                        <div className="col-xs-12 col-md-4 shadow-box">
                            Chart coming soon...
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTwitterChannel = {selected: 1, provider: "twitter"};
    const selectedChannel = channelSelector(state.channels.list, selectedTwitterChannel);

    return {
        channelsLoading: state.channels.loading,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(Dashboard);

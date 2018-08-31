import React from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { apiUrl } from "../../../config/api";
import channelSelector from "../../../selectors/channels";

class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false
    }
    
    componentDidMount() {
        axios.get(`${apiUrl}/twitter/dashboard`)
            .then((response) => {
                this.setState(() => ({
                    data: response.data
                }));
            });
    }

    componentDidUpdate(prevProps) {

        if(this.props.selectedChannel !== prevProps.selectedChannel){
            axios.get(`${apiUrl}/twitter/dashboard`)
                .then((response) => {
                    this.setState(() => ({
                        data: response.data
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
    const selectedChannel = channelSelector(state.channels, selectedTwitterChannel);

    return {
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(Dashboard);

import React from 'react';
import { connect } from "react-redux";
import UpgradeModal from '../../UpgradeModal';
import channelSelector from "../../../selectors/channels";
import {startSetChannels} from "../../../actions/channels";
import { getDashboard } from "../../../requests/twitter/channels";
import {abbrNum} from "../../../utils/numberFormatter";
import Loader from "../../Loader";

class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false,
        loading: false,
        forbidden: false
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
        const data = this.state.data;
        return (
            <div>
                <h2>DASHBOARD</h2>

                <UpgradeModal isOpen={this.state.forbidden && !this.state.loading} />

                {this.state.data ? 
                <div>
                    <div className="row">
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
                    </div> 

                    
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
                </div>: this.state.loading && <Loader />}
                
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

const mapDispatchToProps = (dispatch) => ({
    startSetChannels: () => dispatch(startSetChannels())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

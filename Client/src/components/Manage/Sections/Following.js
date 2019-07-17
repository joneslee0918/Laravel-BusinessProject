import React from 'react';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import UpgradeAlert from '../../UpgradeAlert';
import UserList from "../../UserList";
import {startSetChannels} from "../../../actions/channels";
import { getFollowing, unfollow } from '../../../requests/twitter/channels';
import channelSelector from '../../../selectors/channels';
import Loader from '../../Loader';

class Following extends React.Component{
    state = {
        userItems: [],
        actions: 0,
        loading: this.props.channelsLoading,
        page: 1,
        order: "desc"
    }

    componentDidMount() {
        
        if(!this.props.channelsLoading){
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if((this.props.selectedChannel !== prevProps.selectedChannel)){
            this.fetchData();
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

    perform = (userId) => {
        this.setState((prevState) => ({
            actions: prevState.actions + 1
        }));

        return unfollow(userId)
            .then((response) => response)
            .catch((error) => {
                this.setState((prevState) => ({
                    actions: prevState.actions - 1
                }));

                if(error.response.status === 401){
                    
                    if(this.props.selectedChannel.active){
                       this.props.startSetChannels();
                    }
                }

                return Promise.reject(error);
            });
    };

    fetchData = (order = 'desc') => {
        this.setLoading(true);
        getFollowing(order)
            .then((response) => {
                this.setState(() => ({
                    userItems: response.items,
                    actions: response.actions,
                    loading: false,
                    forbidden: false,
                    page: 1,
                    order
                }));
            }).catch((error) => {
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

    loadMore = () => {
        this.setLoading(true);
        let page = this.state.page + 1;
        const order = this.state.order;
        getFollowing(order, page)
            .then((response) => {
                this.setState((prevState) => ({
                    userItems: prevState.userItems.concat(response.items),
                    actions: response.actions,
                    page,
                    loading: false
                }));
            }).catch((error) => {

                if(error.response.status === 401){
                    
                    if(this.props.selectedChannel.active){
                       this.props.startSetChannels();
                    }
                }

                this.setLoading(false);
            });
    };

    render(){
        return (
            <div>
                <h2>FOLLOWING</h2>
                <UpgradeAlert isOpen={this.state.forbidden && !this.state.loading} goBack={true} setForbidden={this.setForbidden}/>

                <UserList 
                    userItems={ this.state.userItems }
                    actionType="unfollow"
                    actions={this.state.actions}
                    loading={this.state.loading}
                    showSortOption={true}
                    fetchData={this.fetchData}
                    perform={this.perform}
                    page="following"
                />
                <BottomScrollListener onBottom={this.loadMore} />
                {this.state.loading && <Loader />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Following);
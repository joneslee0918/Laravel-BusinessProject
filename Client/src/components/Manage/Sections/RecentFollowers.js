import React from 'react';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import UserList from "../../UserList";
import { getRecentFollowers } from '../../../requests/twitter/channels';
import channelSelector from '../../../selectors/channels';
import Loader from '../../Loader';

class RecentFollowers extends React.Component{
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

    fetchData = (order = 'desc') => {
        this.setLoading(true);
        getRecentFollowers(order)
            .then((response) => {
                this.setState(() => ({
                    userItems: response.items,
                    actions: response.actions,
                    loading: false,
                    page: 1,
                    order
                }));
            }).catch((error) => {
                this.setLoading(false);
            });
    };

    loadMore = () => {
        this.setLoading(true);
        let page = this.state.page + 1;
        const order = this.state.order;
        getRecentFollowers(order, page)
            .then((response) => {
                this.setState((prevState) => ({
                    userItems: prevState.userItems.concat(response.items),
                    actions: response.actions,
                    page,
                    loading: false
                }));
            }).catch((error) => {
                this.setLoading(false);
            });
    };

    render(){
        return (
            <div>
                <h2>RECENT FOLLOWERS</h2>
                <UserList 
                    userItems={ this.state.userItems }
                    actionType="follow"
                    actions={this.state.actions}
                    loading={this.state.loading}
                    showSortOption={true}
                    fetchData={this.fetchData}
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

export default connect(mapStateToProps)(RecentFollowers);
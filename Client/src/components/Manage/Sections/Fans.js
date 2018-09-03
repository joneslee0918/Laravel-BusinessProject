import React from 'react';
import { connect } from 'react-redux';
import UserList from "../../UserList";
import { getFans } from '../../../requests/twitter/channels';
import channelSelector from '../../../selectors/channels';
import Loader from '../../Loader';

class Fans extends React.Component{
    state = {
        userItems: [],
        actions: 0,
        loading: this.props.channelsLoading
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
        getFans(order)
            .then((response) => {
                this.setState(() => ({
                    userItems: response.items,
                    actions: response.actions,
                    loading: false
                }));
            }).catch((error) => {
                this.setLoading(false);
            });
    };

    render(){
        return (
            <div>
                <h2>FANS</h2>
                <UserList 
                    userItems={ this.state.userItems }
                    actionType="follow"
                    actions={this.state.actions}
                    loading={this.state.loading}
                    showSortOption={true}
                    fetchData={this.fetchData}
                />
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

export default connect(mapStateToProps)(Fans);
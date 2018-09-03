import React from 'react';
import { connect } from 'react-redux';
import UserList from "../../UserList";
import { getAccountTargets } from '../../../requests/twitter/channels';
import channelSelector from '../../../selectors/channels';

class AccountTargets extends React.Component{
    state = {
        userItems: [],
        actions: 0,
        loading: this.props.channelsLoading,
        searchView: false
    }

    componentDidMount() {
        
        if(!this.props.channelsLoading){
            this.setLoading(true);
            getAccountTargets()
                .then((response) => {
                    this.setState(() => ({
                        userItems: response.items,
                        actions: response.actions,
                        loading: false
                    }));
                });
        }
    }

    componentDidUpdate(prevProps) {
    
        if(this.props.selectedChannel !== prevProps.selectedChannel){
            this.setLoading(true);
            getAccountTargets()
                .then((response) => {
                    this.setState(() => ({
                        userItems: response.items,
                        actions: response.actions,
                        loading: false
                    }));
                });
        }
    }

    showSearchView = (searchView = false) => {
        this.setState(() => ({
            searchView
        }));
    }

    setLoading = (loading = false) => {
        this.setState(() => ({
            loading
        }));
    }

    render(){
        return (
            <div>
                <h2>ACCOUNT TARGETS</h2>
                <UserList 
                    userItems={ this.state.userItems }
                    actionType="follow"
                    showTargetLink={true}
                    searchView={this.state.searchView}
                    showSearchView={this.showSearchView}
                    targetType="account"
                    actions={this.state.actions}
                    loading={this.state.loading}
                />
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

export default connect(mapStateToProps)(AccountTargets);
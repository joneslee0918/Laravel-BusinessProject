import React from 'react';
import { connect } from 'react-redux';
import channelSelector from '../../../selectors/channels';
import {scheduledPosts, destroy, postNow} from '../../../requests/channels';
import PostList from '../../PostList';

export class ScheduledPosts extends React.Component{

    defaultAction = {
        type: '',
        id: ''
    };

    state = {
        posts: [],
        page: 1,
        loading: this.props.channelsLoading,
        action: this.defaultAction,
        error: false
    }

    componentDidMount() {
        
        if(!this.props.channelsLoading){
            this.fetchPosts();
        }
    }

    componentDidUpdate(prevProps) {
        if((this.props.selectedChannel !== prevProps.selectedChannel)){
            this.fetchPosts();
        }
    }

    setLoading = (loading = false) => {
        this.setState(() => ({
            loading
        }));
    };

    setAction = (action = this.defaultAction) => {
        this.setState(() => ({
            action
        }));
    };

    setError = (error = true) => {
        this.setState(() => ({
            error
        }));
    };

    publishPost = (postId) => {
        this.setLoading(true);
        return postNow(postId)
        .then((response) => {
            this.fetchPosts();
            this.setLoading(false);
        }).catch((error) => {
            
            if(typeof error.response.data.message != 'undefined'){
                this.setState(() => ({
                    error: error.response.data.message
                }));
            }

            this.setLoading(false);
        });
    };

    destroyPost = (postId) => {
        this.setLoading(true);
        return destroy(postId)
        .then((response) => {
            this.fetchPosts();
            this.setLoading(false);
        }).catch((error) => {

            if(typeof error.response.data.message != 'undefined'){
                this.setState(() => ({
                    error: error.response.data.message
                }));
            }

            this.setLoading(false);
        });
    };

    fetchPosts = () => {
        this.setLoading(true);
        scheduledPosts()
            .then((response) => {
                this.setState(() => ({
                    posts: response.items,
                    loading: false,
                    page: 1
                }));
            }).catch((error) => {

                if(typeof error.response.data.message != 'undefined'){
                    this.setState(() => ({
                        error: error.response.data.message
                    }));
                }

                this.setLoading(false);
            });
    };

    render(){
        return(
            <div>

                <PostList 
                    action={this.state.action}
                    setAction={this.setAction}
                    destroyPost={this.destroyPost}
                    publishPost={this.publishPost}
                    error={this.state.error}
                    setError={this.setError}
                    posts={this.state.posts}
                    loading={this.state.loading}
                    title="SCHEDULED POSTS"
                    type="scheduled-posts"
                />
            </div>
            
        );
    }
}

//TODO refresh schedule page when publishing, fetch past scheduled posts
const mapStateToProps = (state) => {
    const selectedGlobalChannel = {selected: 1, provider: undefined};
    const selectedChannel = channelSelector(state.channels.list, selectedGlobalChannel);

    return {
        channelsLoading: state.channels.loading,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(ScheduledPosts);
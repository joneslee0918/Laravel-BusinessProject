import React from 'react';
import { connect } from 'react-redux';
import channelSelector from '../../../selectors/channels';
import {scheduledPosts} from '../../../requests/channels';
import Loader from '../../Loader';

export class ScheduledPosts extends React.Component{

    state = {
        posts: [],
        page: 1,
        loading: this.props.channelsLoading
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

    fetchPosts = () => {
        this.setLoading(true);
        scheduledPosts()
            .then((response) => {
                console.log(response.items);
                this.setState(() => ({
                    posts: [],
                    loading: false,
                    page: 1
                }));
            }).catch((error) => {
                this.setLoading(false);
            });
    };

    render(){
        return(
            <div>

                <h2>SCHEDULED POSTS</h2>

                {this.state.loading && <Loader />}

                <div className="row">
                    <div className="col-xs-12">

                    {this.state.posts.map((postGroup, index) => (
                        
                        <div className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>{index}</h4>
                            </div>

                            {postGroup.map((post) => (
                                <div className="item-row schedule-row">
                                    <div className="profile-info pull-left">
                                        {post.content}
            
                                        <img src="https://www.google.org/assets/static/images/grantees/storyweaver/pratham-books-hero-2x-cf1bc4ec02580dbb7ca256ae3347c63d.jpg" />
                                    </div>
                                    <div className="item-actions pull-right">
                                        <ul>
                                            <li className="text-links link-inactive"><a href="#">Edit</a></li>
                                            <li className="text-links link-inactive"><a href="#">Delete</a></li>
                                            <li className="text-links"><a href="#">Post Now</a></li>
                                        </ul>
                                    </div>
                                </div>
                            ))}

        
                        </div>

                    ))}

        
                        <div className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>Yesterday</h4>
                            </div>
        
                            <div className="item-row schedule-row">
                                <div className="profile-info pull-left">
                                    Another sample post
                                </div>
                                <div className="item-actions pull-right">
                                    <ul>
                                        <li className="text-links link-inactive"><a href="#">Edit</a></li>
                                        <li className="text-links link-inactive"><a href="#">Delete</a></li>
                                        <li className="text-links"><a href="#">Post Now</a></li>
                                    </ul>
                                </div>
                            </div>
        
                        </div>
        
                    </div>
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    const selectedGlobalChannel = {selected: 1, provider: undefined};
    const selectedChannel = channelSelector(state.channels.list, selectedGlobalChannel);

    return {
        channelsLoading: state.channels.loading,
        selectedChannel: selectedChannel.length ? selectedChannel[0] : {}
    };
};

export default connect(mapStateToProps)(ScheduledPosts);
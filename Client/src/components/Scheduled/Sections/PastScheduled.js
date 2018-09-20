import React from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import channelSelector from '../../../selectors/channels';
import {scheduledPosts} from '../../../requests/channels';
import Loader from '../../Loader';

export class PastScheduled extends React.Component{

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
                this.setState(() => ({
                    posts: response.items,
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

                <h2>PAST SCHEDULED</h2>
                {(this.state.posts.length < 1 && !this.state.loading) && 
                <div className="no-data">No posts have been scheduled yet.</div>}

                {this.state.loading && <Loader />}

                <div className="row">
                    <div className="col-xs-12">

                    {this.state.posts.map((postGroup, index) => (
                        
                        <div key={index} className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>{   
                                    moment(postGroup[0].scheduled_at_original).calendar(null, {
                                        sameDay: '[Today]',
                                        nextDay: '[Tomorrow]',
                                        nextWeek: 'dddd',
                                        lastDay: '[Yesterday]',
                                        lastWeek: '[Last] dddd',
                                        sameElse: 'DD/MM/YYYY'
                                    })
                                }</h4>
                            </div>

                            {postGroup.map((post) => (
                                <div key={post.id} className="item-row schedule-row">
                                    <div className="profile-info pull-left">
                                        {post.content}

                                        {post.payload.images.map((image, index) => (
                                            <img key={index} src={image.absolutePath} />
                                        ))}
                                        
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
        
                    </div>
                </div>
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

export default connect(mapStateToProps)(PastScheduled);
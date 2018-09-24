import React from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import SweetAlert from "sweetalert2-react";
import channelSelector from '../../../selectors/channels';
import {pastScheduled, destroy, postNow} from '../../../requests/channels';
import Loader from '../../Loader';

export class PastScheduled extends React.Component{

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
        })
    }

    fetchPosts = () => {
        this.setLoading(true);
        pastScheduled()
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

                <SweetAlert
                    show={!!this.state.action.id}
                    title={`Do you wish to ${this.state.action.type} this item?`}
                    text="To confirm your decision, please click one of the buttons below."
                    showCancelButton
                    type="warning"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    onConfirm={() => {
                        if(this.state.action.type === 'delete'){
                            this.destroyPost(this.state.action.id);
                        }else if(this.state.action.type === 'post'){
                            this.publishPost(this.state.action.id);
                        }else{
                            console.log('something went wrong');
                        }
                        this.setAction();
                    }}
                    onCancel={() => {
                        this.setAction();
                    }}
                    onClose={() => this.setAction()}
                />

                <SweetAlert
                    show={!!this.state.error}
                    title={`Error`}
                    text={`${this.state.error}`}
                    type="error"
                    confirmButtonText="Ok"
                    cancelButtonText="No"
                    onConfirm={() => {
                        this.setState(() => ({ error: false}));
                    }}
                />

                <h2>PAST SCHEDULED</h2>
                {(this.state.posts.length < 1 && !this.state.loading) && 
                <div className="no-data">No posts have been published yet.</div>}

                {this.state.loading && <Loader />}

                <div className="row">
                    <div className="col-xs-12">

                    {this.state.posts.map((postGroup, index) => (
                        
                        <div key={index} className="item-list shadow-box past-scheduled">
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
                                        <h4>{moment(post.scheduled_at_original).format("h:mm A")}</h4>
                                        <span>{post.content}</span>

                                        {post.payload.images.map((image, index) => (
                                            <img key={index} src={image.absolutePath} />
                                        ))}
                                        
                                    </div>
                                    <div className="item-actions pull-right">
                                        <ul>
                                            <li className="text-links link-inactive"><a href="#">Reschedule</a></li>
                                            <li className="text-links link-inactive"><a className="link-cursor danger-btn" onClick={() => this.setAction({type: 'delete', id: post.id})}>Delete</a></li>
                                            <li className="text-links"><a className="link-cursor" onClick={() => this.setAction({type: 'post', id: post.id})}>Post Now</a></li>
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
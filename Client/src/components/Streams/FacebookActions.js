import React from 'react';
import {abbrNum} from '../../utils/numberFormatter';
import {like, unlike} from '../../requests/facebook/channels';

class FacebookActions extends React.Component{

    state = {
        liked: false
    }

    componentDidMount(){
        const {feedItem} = this.props;
        try{
            this.setState(() => ({
                liked: feedItem.likes.summary.has_liked
            }));
        }catch(e){
            this.setState(() => ({
                liked: false
            }));
        }
    }

    likePost = () => {
        const {feedItem, channel, updateItem} = this.props;
        const {liked} = this.state;
        if(liked) return;
        this.setState(() => ({liked: true}));

        like(feedItem.id, channel.id).then((response) => {
            if(typeof response !== "undefined"){
                updateItem(feedItem, "facebookLike");
            }
        }).catch(e => {this.setState(() => ({liked: false}))});
    }

    unlikePost = () => {
        const {feedItem, channel, updateItem} = this.props;
        const {liked} = this.state;
        if(!liked) return;
        this.setState(() => ({liked: false}));

        unlike(feedItem.id, channel.id).then((response) => {
            if(typeof response !== "undefined"){
                updateItem(feedItem, "facebookUnlike");
            }
        }).catch(e => {this.setState(() => ({liked: true}))});
    }

    toggleLike = () => {
        const {liked} = this.state;

        if(!liked){
            this.likePost();
            return;
        }

        this.unlikePost();
        return
    }

    render(){
        const {liked} = this.state;
        const {feedItem} = this.props;
        const likedPost = liked ? 'acted' : '';
        const likesCount = feedItem.likes.summary.total_count > 0 ? abbrNum(feedItem.likes.summary.total_count) : '';

        return (
            <div className="fb-actions-container">
                <div className="stream-action-icons">
                    <span>
                        <i onClick={() => this.toggleLike()} className={`fa fa-thumbs-up ${likedPost}`}></i>
                        <span className={`status-counter ${likedPost} `}>{likesCount}</span>
                    </span>
                    
                    <i className="fa fa-comment"></i>
                    <i className="fa fa-share"></i>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default FacebookActions;
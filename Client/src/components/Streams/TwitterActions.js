import React from 'react';
import {like, unlike, retweet} from '../../requests/twitter/tweets';

class TwitterActions extends React.Component{

    state = {
        liked: false,
        retweeted: false
    }

    likePost = () => {

        this.setState(() => ({liked: true}));
        const {feedItem, channel, type, updateItem} = this.props;

        if(feedItem.favorited) return;

        like(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({liked: false}))});
    }

    unlikePost = () => {
        this.setState(() => ({liked: false}));
        const {feedItem, channel, type, updateItem} = this.props;

        if(!feedItem.favorited) return;
        
        unlike(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({liked: true}))});
    }

    retweetPost = () => {
        this.setState(() => ({retweeted: true}));
        const {feedItem, channel, type, updateItem} = this.props;

        if(!feedItem.favorited) return;
        
        retweet(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({retweeted: false}))});
    }

    toggleLike = () => {
        const {feedItem} = this.props;

        if(!feedItem.favorited){
            this.likePost();
            return;
        }

        this.unlikePost();
        return
    }

    render(){
        const {feedItem} = this.props;
        const {liked, retweeted} = this.state;
        feedItem.favorited = liked;
        feedItem.retweeted = retweeted;
        const likedPost = liked ? 'acted' : '';
        const retweetedPost = retweeted ? 'acted' : '';
        const likesCount = feedItem.favorite_count > 0 ? feedItem.favorite_count : '';
        const retweetCount = feedItem.retweet_count > 0 ? feedItem.retweet_count : '';

        return (
            <div className="stream-action-icons">
                <i className="fa fa-mail-forward"></i>
                <span>
                    <i onClick={() => this.retweetPost()} className={`fa fa-retweet ${retweetedPost}`}></i>
                    <span className={`status-counter ${retweetedPost} `}>{retweetCount}</span>
                </span>
                <span>
                    <i onClick={() => this.toggleLike()} className={`fa fa-heart ${likedPost}`}></i>
                    <span className={`status-counter ${likedPost} `}>{likesCount}</span>
                </span>
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </div>
            )
    }
}

export default TwitterActions;
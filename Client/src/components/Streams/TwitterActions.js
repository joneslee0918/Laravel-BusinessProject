import React from 'react';
import {like, unlike, retweet} from '../../requests/twitter/tweets';
import {abbrNum} from '../../utils/numberFormatter';

class TwitterActions extends React.Component{

    state = {
        liked: this.props.feedItem.favorited,
        retweeted: this.props.feedItem.retweeted
    }

    likePost = () => {
        const {feedItem, channel, type, updateItem} = this.props;
        const {liked} = this.state;
        if(liked) return;
        this.setState(() => ({liked: true}));

        like(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({liked: false}))});
    }

    unlikePost = () => {
        
        const {feedItem, channel, type, updateItem} = this.props;
        const {liked} = this.state;
        if(!liked) return;
        this.setState(() => ({liked: false}));
        
        unlike(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({liked: true}))});
    }

    retweetPost = () => {
        
        const {feedItem, channel, type, updateItem} = this.props;
        const {retweeted} = this.state;
        if(retweeted) return;
        this.setState(() => ({retweeted: true}));
        
        retweet(feedItem.id, channel.id).then((response) =>{
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({retweeted: false}))});
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
        const {feedItem} = this.props;
        const {liked, retweeted} = this.state;
        const likedPost = liked ? 'acted' : '';
        const retweetedPost = retweeted ? 'acted' : '';
        const likesCount = feedItem.favorite_count > 0 ? abbrNum(feedItem.favorite_count) : '';
        const retweetCount = feedItem.retweet_count > 0 ? abbrNum(feedItem.retweet_count) : '';

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
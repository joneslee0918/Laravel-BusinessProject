import React from 'react';
import Modal from 'react-modal';
import Popup from "reactjs-popup";
import {like, unlike, retweet, deleteTweet} from '../../requests/twitter/tweets';
import {abbrNum} from '../../utils/numberFormatter';
import TwitterReply from './TwitterReply';
import { ToastContainer } from "react-toastr";

let toastContainer;


class TwitterActions extends React.Component{

    state = {
        liked: this.props.feedItem.favorited,
        retweeted: this.props.feedItem.retweeted,
        replyBox: false
    }

    likePost = () => {
        const {feedItem, channel, type, updateItem} = this.props;
        const {liked} = this.state;
        if(liked) return;
        this.setState(() => ({liked: true}));

        like(feedItem.id_str, channel.id).then((response) => {
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
        
        unlike(feedItem.id_str, channel.id).then((response) => {
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
        
        retweet(feedItem.id_str, channel.id).then((response) => {
            if(typeof response.id !== "undefined"){
                updateItem(response, type);
            }
        }).catch(e => {this.setState(() => ({retweeted: false}))});
    }

    handlePostDelete = () => {
        const {feedItem, channel, updateItem} = this.props;

        this.setState(() => ({
            loading: true
        }));

        deleteTweet(feedItem.id_str, channel.id).then((response) => {
            if(typeof response !== "undefined"){
                updateItem(feedItem, "delete");
            }

            this.setState(() => ({
                loading: false
            }));
        }).catch(e => {
            this.setState(() => ({
                loading: false
            }));
        });
    };

    toggleLike = () => {
        const {liked} = this.state;

        if(!liked){
            this.likePost();
            return;
        }

        this.unlikePost();
        return
    }

    toggleReplyBox = (message = "") => {

        this.setState(() => ({
            replyBox: !this.state.replyBox
        }), () => {
            
            if(message == "success"){
                toastContainer.success("Message posted.", "Success", {closeButton: true});
            }

            if(message == "error"){
                toastContainer.error("Something went wrong.", "Error", {closeButton: true});
            }
        });
    };

    render(){
        const {feedItem, postData, channel} = this.props;
        const {liked, retweeted} = this.state;
        const likedPost = liked ? 'acted' : '';
        const retweetedPost = retweeted ? 'acted' : '';
        const likesCount = feedItem.favorite_count > 0 ? abbrNum(feedItem.favorite_count) : '';
        const retweetCount = feedItem.retweet_count > 0 ? abbrNum(feedItem.retweet_count) : '';

        return (
            <div>
                <ToastContainer
                    ref={ref => toastContainer = ref}
                    className="toast-top-right"
                />
                {this.state.replyBox &&
                <Modal
                    ariaHideApp={false}
                    className="t-reply-modal"
                    isOpen={this.state.replyBox}
                >
                    <TwitterReply close={this.toggleReplyBox} postData={postData} channel={channel}/>
                </Modal>
                }

                <div className="stream-action-icons">
                    <i onClick={this.toggleReplyBox} className="fa fa-mail-forward"></i>
                    <span>
                        <i onClick={() => this.retweetPost()} className={`fa fa-retweet ${retweetedPost}`}></i>
                        <span className={`status-counter ${retweetedPost} `}> {retweetCount}</span>
                    </span>
                    <span>
                        <i onClick={() => this.toggleLike()} className={`fa fa-heart ${likedPost}`}></i>
                        <span className={`status-counter ${likedPost} `}> {likesCount}</span>
                    </span>
                    <Popup
                    trigger={<i className="fa fa-ellipsis-v" aria-hidden="true"></i>}
                    on="click"
                    position="top center"
                    arrow={true}
                    closeOnDocumentClick={true}
                    >
                    {
                    close => ( 
                        <div className="t-action-menu menu-with-icons">
                            <a href={`mailto:?Subject=I'd like to share this story with you&Body=${feedItem.text}`}>
                                <i className={`fa fa-envelope`}></i>&nbsp;Email
                            </a>

                            {postData.username === channel.details.username &&
                                (
                                    this.state.loading  ? 
                                    <button className="disabled-btn">
                                        <i className={`fa fa-circle-o-notch fa-spin`}></i>Delete
                                    </button>
                                    :
                                    <button onClick={this.handlePostDelete}>
                                        <i className={`fa fa-trash`}></i>Delete
                                    </button>
                                )
                            }
                        </div>
                    )}
                    </Popup>
                </div>
            </div>
            )
    }
}

export default TwitterActions;
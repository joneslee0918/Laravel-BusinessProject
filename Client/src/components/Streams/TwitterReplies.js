import React from 'react';
import StreamPost from './StreamPost';
import {getStatusReplies} from '../../requests/twitter/channels';
import {AvatarWithText} from '../Loader';


class TwitterReplies extends React.Component{
    state = {
        replies: [],
        loading: false
    }

    componentDidMount(){
        const {postData, channel} = this.props;
        this.setState(() => ({
            loading: true
        }));

        getStatusReplies(channel.id, postData.username, postData.statusId)
        .then(response => {
            this.setState(() => ({
                replies: response,
                loading: false
            }));
        }).catch(error => {
            this.setState(() => ({
                loading: false
            }));
            console.log(error);
        });
    }

    render(){
        const {close, postData} = this.props;
        const {replies, loading} = this.state;

        return (
            <div className="t-reply-container">
                <div className="t-reply-heading">
                    <h3>Twitter Replies</h3>
                    <i onClick={close} className="fa fa-close link-cursor"></i>
                </div>
                <div className="t-reply-body">
                    <StreamPost {...postData} />
                </div>
                <div className="comments twitter-convo">
                    {loading && <AvatarWithText />}
                    {replies.map((reply, index) => {
                        return <TwitterStatusReply key={index} reply={reply} parentPostData={postData}/>
                    })}
                </div>
            </div>
        );
    }
}

const TwitterStatusReply = ({reply, parentPostData}) => {

    const text = reply.text ? reply.text : "";
    const profileImg = reply.user.profile_image_url_https;
    const sharedStatus = reply.retweeted_status;
    const username = reply.user.screen_name;
    const accountId = reply.user.id_str;
    const date = reply.created_at;
    const statusId = reply.id_str;
    const networkType = "twitter";
    let media = typeof reply.extended_entities !== "undefined" && typeof reply.extended_entities.media !== "undefined" ? reply.extended_entities.media : [];
    media = media.map(file => {
        const source = file.type === "video" && typeof file.video_info.variants !== "undefined" && file.video_info.variants.length ? file.video_info.variants[0].url : "";
        return {src: file.media_url_https, type: file.type, source}
    });

    const setImages = parentPostData.setImages;
    const channel = parentPostData.channel;

    const postData = {profileImg, username, text, date, media, setImages, statusId, sharedStatus, networkType, channel, accountId};
    return (
        <div>
            <StreamPost {...postData} />
        </div>
    )
}

export default TwitterReplies;
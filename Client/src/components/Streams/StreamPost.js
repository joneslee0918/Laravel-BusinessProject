import React from 'react';
import Modal from 'react-modal';
import StreamFeedMedia from './StreamFeedMedia';
import ReadMore from '../ReadMore';
import {truncate} from '../../utils/helpers';
import {toHumanTime} from '../../utils/helpers';
import TwitterInfoCard from './TwitterInfoCard';
import TwitterReplies from './TwitterReplies';
import FacebookInfoCard from './FacebookInfoCard';

class StreamPost extends React.Component{

    state = {
        hashStreamModal: false,
        keyword: false
    }

    thisRepl = this;

    toggleHashStreamModal = (args = false) => {
        this.setState(() => ({
            hashStreamModal: !this.hashStreamModal,
            keyword: args
        }));
    };

    render(){
        const {profileImg, username, date, text, media, setImages, children, statusId, attachmentData, sharedStatus, networkType, channel, accountId} = this.props;
        const postTime = date ? toHumanTime(date) : "";
        return (<div className="stream-feed-container">

                    <Modal
                        ariaHideApp={false}
                        className="t-reply-modal"
                        isOpen={this.state.hashStreamModal}
                    >
                        <TwitterReplies close={this.toggleHashStreamModal} postData={{profileImg, username, date, text, media, setImages, children, statusId, attachmentData, sharedStatus, networkType, channel, accountId}} keyword={this.state.keyword} channel={channel}/>
                    </Modal>

                    <div className="post-info">
                        <img src={profileImg} />
                        <div className="post-info-item">
                            {networkType == "twitter" && <TwitterInfoCard username={username} channelId={channel.id}/>}
                            {networkType == "facebook" && <FacebookInfoCard username={username} channelId={channel.id} accountId={accountId}/>}
                            <div className="post-date">{postTime}</div>
                        </div>
                    </div>
                    <div className="post-content">
                        {
                            typeof(sharedStatus) !== "undefined" ? (
                                
                                <div className="shared-status">
                                    <span className="status-type"><i className="fa fa-retweet"></i> Retweeted </span>
                                    <div className="post-info">
                                        <img src={sharedStatus.user.profile_image_url_https} />
                                        <div className="post-info-item">
                                            <TwitterInfoCard username={sharedStatus.user.screen_name} channelId={channel.id}/>
                                            <div className="post-date">{sharedStatus.created_at ? toHumanTime(sharedStatus.created_at) : ""}</div>
                                        </div>
                                    </div>
                                    
                                    <ReadMore>{sharedStatus.text}</ReadMore>

                                    <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>
                                </div>
                            )
                            :
                            (   !text && networkType === "facebook" ?
                                
                                <div>{username} shared a <a href={`https://www.facebook.com/${statusId.split('_')[0]}/posts/${statusId.split('_')[1]}`} target="_blank">post</a></div>
                                :
                                <ReadMore>{text}</ReadMore>
                            )
                        }
                        
                    </div>
                    {  
                        typeof(attachmentData) !== "undefined" && attachmentData.attachmentType === "share" ?
                        <a target="_blank" href={attachmentData.targetUrl}>
                            <div className="link-preview">
                                {
                                    attachmentData.media.length ?
                                    <div className="link-img">
                                        <img src={media[0].src} /> 
                                    </div> 
                                    :
                                    <div></div>
                                }
                                <div className="link-info">
                                    <h4>{attachmentData.title}</h4>
                                    <p>{truncate(attachmentData.description, 150)}</p>
                                </div>

                            </div>
                        </a>
                        :
                        (typeof(sharedStatus) === "undefined" && <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>)
                    }

                    {children}
                </div>);
    }
};

export default StreamPost;
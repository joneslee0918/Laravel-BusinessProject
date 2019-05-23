import React from 'react';
import StreamFeedMedia from './StreamFeedMedia';
import ReadMore from '../ReadMore';
import {truncate} from '../../utils/helpers';

const StreamPost = ({profileImg, username, date, text, media, setImages, children, statusId, attachmentData, sharedStatus, networkType}) => (
    <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={profileImg} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{username}</strong></a>
                                <div className="post-date">{date ? new Date(date).toDateString() : ""}</div>
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
                                                <a href="#" className="username"><strong>{sharedStatus.user.name}</strong></a>
                                                <div className="post-date">{sharedStatus.created_at ? new Date(sharedStatus.created_at).toDateString() : ""}</div>
                                            </div>
                                        </div>
                                        
                                        <ReadMore>{sharedStatus.text}</ReadMore>
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
                            <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>
                        }

                        {children}
                    </div>
);

export default StreamPost;
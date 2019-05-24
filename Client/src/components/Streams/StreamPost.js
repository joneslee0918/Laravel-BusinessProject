import React from 'react';
import StreamFeedMedia from './StreamFeedMedia';
import ReadMore from '../ReadMore';

const StreamPost = ({profileImg, username, date, text, media, setImages, children}) => (
    <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={profileImg} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{username}</strong></a>
                                <div className="post-date">{date ? new Date(date).toDateString() : ""}</div>
                            </div>
                        </div>
                        <div className="post-content">
                             <ReadMore>{text}</ReadMore>
                        </div>

                        <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>

                        {children}
                    </div>
);

export default StreamPost;
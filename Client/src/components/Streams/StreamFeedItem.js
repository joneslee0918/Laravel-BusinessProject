import React from 'react';

const StreamFeedItem = ({profilePic, username, date, content}) => (
    <div className="stream-feed-container">
        <div className="post-info">
            <img src={profilePic} />
            <div>
                <a href="#" className="username"><strong>{username}</strong></a>
                <div className="post-date">{date}</div>
            </div>
        </div>
        <div className="post-content">
            {content}
        </div>
    </div>
);

export default StreamFeedItem;
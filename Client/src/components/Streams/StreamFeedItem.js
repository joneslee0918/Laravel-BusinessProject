import React from 'react';

const StreamFeedItem = ({feedItem}) => {

    return (<div className="stream-feed-container">
                <div className="post-info">
                    <img src={feedItem.user.profile_image_url} />
                    <div>
                        <a href="#" className="username"><strong>{feedItem.user.screen_name}</strong></a>
                        <div className="post-date"></div>
                    </div>
                </div>
                <div className="post-content">
                    {feedItem.text}
                </div>
            </div>);
};

export default StreamFeedItem;
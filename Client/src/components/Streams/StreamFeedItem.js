import React from 'react';

const StreamFeedItem = ({feedItem, streamItem}) => {
    try{
        if(streamItem.network === "twitter"){
            if(streamItem.type === "followers"){
                console.log(feedItem.status["created_at"], streamItem.type);
                return <TwitterFollowersFeed feedItem={feedItem} />;
            }else{
                return <TwitterDefaultFeed feedItem={feedItem} />;
            }
        }
    }catch(e){
        return <div></div>
    }
};

const TwitterDefaultFeed = ({feedItem}) => (
    <div className="stream-feed-container">
                <div className="post-info">
                    <img src={feedItem.user.profile_image_url} />
                    <div className="post-info-item">
                        <a href="#" className="username"><strong>{feedItem.user.screen_name}</strong></a>
                        <div className="post-date">{new Date(feedItem.created_at).toDateString()}</div>
                    </div>
                </div>
                <div className="post-content">
                    {feedItem.text}
                </div>
            </div>
);

const TwitterFollowersFeed = ({feedItem}) => (
    <div className="stream-feed-container">
                <div className="post-info">
                    <img src={feedItem.profile_image_url} />
                    <div className="post-info-item">
                        <a href="#" className="username"><strong>{feedItem.screen_name}</strong></a>
                        <div className="post-date">{new Date(feedItem.status["created_at"]).toDateString()}</div>
                    </div>
                </div>
                <div className="post-content">
                    {feedItem.status["text"]}
                </div>
            </div>
);

export default StreamFeedItem;
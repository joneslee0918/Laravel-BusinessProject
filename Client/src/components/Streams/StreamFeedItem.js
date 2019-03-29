import React from 'react';

const StreamFeedItem = ({feedItem, streamItem, channel}) => {
    try{
        if(streamItem.type == "scheduled"){
            return <ScheduledFeed feedItem={feedItem} channel={channel}/>
        }

        if(streamItem.network === "twitter"){
            if(streamItem.type === "followers"){
                return <TwitterFollowersFeed feedItem={feedItem} />;
            }else{
                return <TwitterDefaultFeed feedItem={feedItem} />;
            }
        }
        else if(streamItem.network === "facebook"){

            if(streamItem.type === "conversations"){
                return <FacebookMessagesFeed feedItem = {feedItem} channel={channel}/>
            }else{
                return <FacebookPostsFeed feedItem = {feedItem} />
            }
            
        }else{
            return <div></div>;
        }
    }catch(e){
        return <div></div>
    }
};

const TwitterDefaultFeed = ({feedItem}) => {
    try{
        return (
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
    }catch(e){
        console.log(e);
        return <div></div>
    }
}

const TwitterFollowersFeed = ({feedItem}) => {
    try{
        return(
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
    }catch(e){
        console.log(e);
        return <div></div>
    }

}

const ScheduledFeed = ({feedItem, channel}) => {
    try{
        return (
            <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={channel.avatar} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{channel.username}</strong></a>
                                <div className="post-date">{new Date(feedItem.scheduled_at_original).toDateString()}</div>
                            </div>
                        </div>
                        <div className="post-content">
                            {feedItem.content}
                        </div>
                    </div>
        )}catch(e){ 
            console.log(e);
            return <div></div>
        }
};

const FacebookPostsFeed = ({feedItem}) => {

    try{
            return (
            <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={feedItem.from.picture.data.url} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{feedItem.from.name}</strong></a>
                                <div className="post-date">{new Date(feedItem.created_time).toDateString()}</div>
                            </div>
                        </div>
                        <div className="post-content">
                            {feedItem.message}
                        </div>
                    </div>
)
    }catch(e){
        console.log(e);
        return <div></div>;
    }
};

const FacebookMessagesFeed = ({feedItem, channel}) => {
    try{
            return (
            <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={channel.name === feedItem.messages.data[0].from.name ? channel.avatar : "/images/dummy_profile.png"} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{feedItem.messages.data[0].from.name}</strong></a>
                                <div className="post-date">{(new Date(feedItem.updated_time)).toDateString("MMM dd, yyyy hh:mm a")}</div>
                            </div>
                        </div>
                        <div className="post-content">
                            {feedItem.messages.data[0].message}
                        </div>
                    </div>
)
    }catch(e){
        console.log(e);
        return <div></div>;
    }
};

export default StreamFeedItem;
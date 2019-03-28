import React from 'react';
import {connect} from 'react-redux';
import channelSelector, {channelById} from '../../selectors/channels';

const StreamFeedItem = ({feedItem, streamItem, channels}) => {
    try{
        if(streamItem.type == "scheduled"){
            return <ScheduledFeed feedItem={feedItem} channels={channels}/>
        }

        if(streamItem.network === "twitter"){
            if(streamItem.type === "followers"){
                return <TwitterFollowersFeed feedItem={feedItem} />;
            }else{
                return <TwitterDefaultFeed feedItem={feedItem} />;
            }
        }else{
            
            return <div></div>;
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

const ScheduledFeed = ({feedItem, channels}) => {
    const channel = channelById(channels, {id: feedItem.channel_id});
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
)};

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider: undefined, publishable: true});
    return {
        channels
    }
}

export default connect(mapStateToProps)(StreamFeedItem);
import React from 'react';
import ReadMoreAndLess from 'react-read-more-less';
import parse from 'html-react-parser';
import {linkify} from '../../utils/helpers';

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
        const text = feedItem.text ? feedItem.text : "";
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
                            <TextRenderer text={text} />                            
                        </div>
                        <div className="stream-action-icons">
                            <i className="fa fa-mail-forward"></i>
                            <i className="fa fa-retweet"></i>
                            <i className="fa fa-heart"></i>
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
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
        const text = typeof feedItem.status["text"] !== "undefined" ? feedItem.status["text"] : "";
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
                            <TextRenderer text={text} />
                        </div>
                        <div className="stream-action-icons">
                            <i className="fa fa-mail-forward"></i>
                            <i className="fa fa-retweet"></i>
                            <i className="fa fa-heart"></i>
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
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
        const text = feedItem.content ? feedItem.content : "";
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
                            <TextRenderer text={text} /> 
                        </div>
                    </div>
        )}catch(e){ 
            console.log(e);
            return <div></div>
        }
};

const FacebookPostsFeed = ({feedItem}) => {

    try{    
        const text = feedItem.message ? feedItem.message : "";
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
                            <TextRenderer text={text} />
                        </div>
                        <div className="stream-action-icons">
                            <i className="fa fa-thumbs-up"></i>
                            <i className="fa fa-comment"></i>
                            <i className="fa fa-share"></i>
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
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
        const text = feedItem.messages.data[0].message ? feedItem.messages.data[0].message : "";
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
                            <TextRenderer text={text} />
                        </div>
                    </div>
)
    }catch(e){
        console.log(e);
        return <div></div>;
    }
};

const TextRenderer = ({text = ""}) => {
    return (<ReadMoreAndLess
        className="read-more-content"
        charLimit={120}
        readMoreText=" Read more"
        readLessText=" Read less"
    >
        {text}
    </ReadMoreAndLess>);
}

export default StreamFeedItem;
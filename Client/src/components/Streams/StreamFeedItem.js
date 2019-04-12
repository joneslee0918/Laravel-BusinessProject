import React from 'react';
import ReadMore from '../ReadMore';
import StreamFeedMedia from './StreamFeedMedia';

const StreamFeedItem = ({feedItem, streamItem, channel, setImages}) => {
    try{
        if(streamItem.type == "scheduled"){
            return <ScheduledFeed feedItem={feedItem} setImages={setImages} channel={channel}/>
        }

        if(streamItem.network === "twitter"){
            if(streamItem.type === "followers"){
                return <TwitterFollowersFeed feedItem={feedItem} setImages={setImages} />;
            }else{
                return <TwitterDefaultFeed feedItem={feedItem} setImages={setImages} />;
            }
        }
        else if(streamItem.network === "facebook"){

            if(streamItem.type === "conversations"){
                return <FacebookMessagesFeed feedItem = {feedItem} channel={channel} setImages={setImages} />
            }else{
                return <FacebookPostsFeed feedItem = {feedItem} setImages={setImages} />
            }
            
        }else{
            return <div></div>;
        }
    }catch(e){
        return <div></div>
    }
};

const TwitterDefaultFeed = ({feedItem, setImages}) => {
    try{
        const text = feedItem.text ? feedItem.text : "";

        let media = typeof feedItem.extended_entities !== "undefined" && typeof feedItem.extended_entities.media !== "undefined" ? feedItem.extended_entities.media : [];
        media = media.map(file => {
            const source = file.type === "video" && typeof file.video_info.variants !== "undefined" && file.video_info.variants.length ? file.video_info.variants[0].url : "";
            return {src: file.media_url_https, type: file.type, source}
        });

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
                        <ReadMore>{text}</ReadMore>                            
                </div>

                <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>

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

const TwitterFollowersFeed = ({feedItem, setImages}) => {
    try{
        const text = typeof feedItem.status !== "undefined" && typeof feedItem.status["text"] !== "undefined" ? feedItem.status["text"] : "";
        const date = typeof feedItem.status !== "undefined" && typeof feedItem.status["created_at"] !== "undefined" ? feedItem.status["created_at"] : "";

        let media = typeof feedItem.status !== "undefined" && typeof feedItem.status.extended_entities !== "undefined" && typeof feedItem.status.extended_entities.media !== "undefined" ? feedItem.status.extended_entities.media : [];
        media = media.map(file => {
            const source = file.type === "video" && typeof file.video_info.variants !== "undefined" && file.video_info.variants.length ? file.video_info.variants[0].url : "";
            return {src: file.media_url_https, type: file.type, source}
        });

        return(
            <div className="stream-feed-container">
                        <div className="post-info">
                            <img src={feedItem.profile_image_url} />
                            <div className="post-info-item">
                                <a href="#" className="username"><strong>{feedItem.screen_name}</strong></a>
                                <div className="post-date">{date ? new Date(date).toDateString() : ""}</div>
                            </div>
                        </div>
                        <div className="post-content">
                             <ReadMore>{text}</ReadMore>
                        </div>

                        <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>

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

const ScheduledFeed = ({feedItem, channel, setImages}) => {
    try{
        const text = feedItem.content ? feedItem.content : "";
        let media = typeof feedItem.payload.images !== "undefined" && feedItem.payload.images.length ? feedItem.payload.images : [];

        media = media.map(file => ({src: file.absolutePath, type: "photo"}));

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
                             <ReadMore>{text}</ReadMore> 
                        </div>

                        <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>
                    </div>
        )}catch(e){ 
            console.log(e);
            return <div></div>
        }
};

const FacebookPostsFeed = ({feedItem, setImages}) => {

    try{    
        const text = feedItem.message ? feedItem.message : "";

        const attachments = typeof feedItem.attachments !== "undefined" ? feedItem.attachments.data : [];
        const subAttachments = attachments.length && typeof attachments[0].subattachments !== "undefined" ? (typeof attachments[0].subattachments.data !== "undefined" ? attachments[0].subattachments.data : []) : [];

        
        let mainMedia = attachments.map((item) => {
            if(typeof item.media !== "undefined"){
                return item.media;
            }
        }).filter(item => typeof item !== "undefined");

        let subMedia = subAttachments.map((item) => {
            if(typeof item.media !== "undefined"){
                return item.media;
            }
        }).filter(item => typeof item !== "undefined");

        let media = [...mainMedia, ...subMedia];

        media = media.map(file => ({src: file.image.src, type: typeof file.source !== "undefined" ? "video": "photo", source: typeof file.source !== "undefined" ? file.source : ""}));

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
                    <ReadMore>{text ? text : (attachments.length ? attachments[0].title : "")}</ReadMore>
                </div>

                <StreamFeedMedia setImages={setImages} media={media}></StreamFeedMedia>

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
                                <div className="post-date">{(new Date(feedItem.updated_time)).toDateString()}</div>
                            </div>
                        </div>
                        <div className="post-content">
                            <ReadMore>{text}</ReadMore>
                        </div>
                    </div>
)
    }catch(e){
        console.log(e);
        return <div></div>;
    }
};


export default StreamFeedItem;
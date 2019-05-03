import React from 'react';
import TwitterActions from './TwitterActions';
import StreamPost from './StreamPost';
import FacebookActions from './FacebookActions';
import FacebookMessagesFeed from './FacebookMessagesFeed';

const StreamFeedItem = ({feedItem, streamItem, channel, setImages, updateItem}) => {
    try{
        if(streamItem.type == "scheduled"){
            return <ScheduledFeed feedItem={feedItem} setImages={setImages} channel={channel}/>
        }

        if(streamItem.network === "twitter"){
            if(streamItem.type === "followers"){
                return <TwitterFollowersFeed feedItem={feedItem} setImages={setImages} channel={channel} updateItem={updateItem}/>;
            }else{
                return <TwitterDefaultFeed feedItem={feedItem} setImages={setImages} channel={channel} updateItem={updateItem}/>;
            }
        }
        else if(streamItem.network === "facebook"){

            if(streamItem.type === "conversations"){
                return <FacebookMessagesFeed feedItem = {feedItem} channel={channel} setImages={setImages} updateItem={updateItem}/>
            }else{
                return <FacebookPostsFeed feedItem = {feedItem} setImages={setImages} channel={channel} updateItem={updateItem}/>
            }
            
        }else{
            return <div></div>;
        }
    }catch(e){
        return <div></div>
    }
};

const TwitterDefaultFeed = ({feedItem, setImages, channel, updateItem}) => {
    try{
        const text = feedItem.text ? feedItem.text : "";
        const profileImg = feedItem.user.profile_image_url;
        const username = feedItem.user.screen_name;
        const date = feedItem.created_at;
        const statusId = feedItem.id_str;
        let media = typeof feedItem.extended_entities !== "undefined" && typeof feedItem.extended_entities.media !== "undefined" ? feedItem.extended_entities.media : [];
        media = media.map(file => {
            const source = file.type === "video" && typeof file.video_info.variants !== "undefined" && file.video_info.variants.length ? file.video_info.variants[0].url : "";
            return {src: file.media_url_https, type: file.type, source}
        });

        const postData = {profileImg, username, text, date, media, setImages, statusId};

        return (
            <StreamPost {...postData} >
                <TwitterActions 
                    updateItem={updateItem} 
                    channel={channel} 
                    feedItem={feedItem}
                    type="twitterDefault"
                    postData={postData}
                />
            </StreamPost>
        );
    }catch(e){
        console.log(e);
        return <div></div>
    }
}

const TwitterFollowersFeed = ({feedItem, setImages, channel, updateItem}) => {
    try{
        const text = typeof feedItem.status !== "undefined" && typeof feedItem.status["text"] !== "undefined" ? feedItem.status["text"] : "";
        const date = typeof feedItem.status !== "undefined" && typeof feedItem.status["created_at"] !== "undefined" ? feedItem.status["created_at"] : "";
        const username = feedItem.screen_name;
        const profileImg = feedItem.profile_image_url;
        const statusId = typeof feedItem.status !== "undefined" ? feedItem.status.id_str: "";
        let media = typeof feedItem.status !== "undefined" && typeof feedItem.status.extended_entities !== "undefined" && typeof feedItem.status.extended_entities.media !== "undefined" ? feedItem.status.extended_entities.media : [];
        media = media.map(file => {
            const source = file.type === "video" && typeof file.video_info.variants !== "undefined" && file.video_info.variants.length ? file.video_info.variants[0].url : "";
            return {src: file.media_url_https, type: file.type, source}
        });

        const postData = {profileImg, username, text, date, media, setImages, statusId};

        return(
            <div>
            {typeof feedItem.status != "undefined" && 
                <StreamPost {...postData} >
                    <TwitterActions 
                        updateItem={updateItem} 
                        channel={channel} 
                        feedItem={feedItem.status}
                        type="twitterFollowers"
                        postData={postData}
                        />
                </StreamPost>}
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
        const profileImg = channel.avatar;
        const username = channel.username;
        const date = feedItem.scheduled_at_original;
        let media = typeof feedItem.payload.images !== "undefined" && feedItem.payload.images.length ? feedItem.payload.images : [];

        media = media.map(file => ({src: file.absolutePath, type: "photo"}));

        return (
            <StreamPost {...{profileImg, username, text, date, media, setImages}} />
        )}catch(e){ 
            console.log(e);
            return <div></div>
        }
};

const FacebookPostsFeed = ({feedItem, setImages, channel, updateItem}) => {

    try{    
        let text = feedItem.message ? feedItem.message : "";
        const profileImg = feedItem.from.picture.data.url;
        const username = feedItem.from.name;
        const date = feedItem.created_time;

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

        text = text ? text : (attachments.length ? attachments[0].title : "");

        media = media.map(file => ({src: file.image.src, type: typeof file.source !== "undefined" ? "video": "photo", source: typeof file.source !== "undefined" ? file.source : ""}));

        const statusId = feedItem.id;
        const postData = {profileImg, username, text, date, media, setImages, statusId};

        return (
            <StreamPost {...postData} >
                <FacebookActions 
                    updateItem={updateItem} 
                    channel={channel} 
                    feedItem={feedItem}
                    postData={postData}
                />
            </StreamPost>
        )
    }catch(e){
        console.log(e);
        return <div></div>;
    }
};

export default StreamFeedItem;
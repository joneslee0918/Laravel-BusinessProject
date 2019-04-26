import React from 'react';
import StreamFeedItem from './StreamFeedItem';
import {getStreamFeed} from '../../requests/streams';
import Lightbox from 'react-images';
import {PostLoader} from '../Loader';

class StreamFeed extends React.Component{
    state = {
        items: [],
        images: [],
        imageViewer: false,
        imageIndex: 0,
        loading: false
    };

    componentDidMount(){
        const {streamItem} = this.props;
        this.setState(() => ({loading: true}));
        getStreamFeed(streamItem.type, streamItem.network, streamItem.channel_id, streamItem.search_query).then((response) => {
            
            const items = typeof response["data"] !== "undefined" ? response["data"] : response;

            this.setState(() => ({
                items: items,
                loading: false
            }));
            
            if(!items.length) return;
        }).catch(e => {
            this.setState(() => ({loading: false}));
        });
    }

    setImages = (images, index = 0) => {
        this.setState(() => ({
          images,
          imageViewer: !this.state.imageViewer,
          imageIndex: index
        }));
    };

    updateItem = (currentItem, type = "twitterDefault") => {
        this.setState(() => ({
            items: this.state.items.map(item => {

                if(type == "twitterDefault" && item.id == currentItem.id){
                    return currentItem;
                }

                if(type == "twitterFollowers" && typeof item.status !== "undefined" && item.id == currentItem.id){
                    item.status = currentItem;
                    return item;
                }

                if(type == "facebookLike" && typeof item.id !== "undefined" && item.id == currentItem.id){
                    item.likes.summary.has_liked = true;
                    item.likes.summary.total_count += 1;
                    return item;
                }

                if(type == "facebookUnlike" && typeof item.id !== "undefined" && item.id == currentItem.id){
                    item.likes.summary.has_liked = false;
                    item.likes.summary.total_count -= 1;
                    return item;
                }

                return item;
            })
        }));
    }

    render(){
        const {streamItem, channel} = this.props;
        const {imageViewer, imageIndex, images} = this.state;
        return (
            <div className="stream-feed scrollbar">
                {imageViewer && (
                    <Lightbox
                        currentImage={imageIndex}
                        images={images}
                        isOpen={imageViewer}
                        onClickPrev={() =>
                            this.setState({
                              imageIndex: (imageIndex + images.length - 1) % images.length,
                            })}
                        onClickNext={() =>
                            this.setState({
                              imageIndex: (imageIndex + 1) % images.length,
                            })}
                        onClose={() => this.setState({ imageViewer: false })}
                        />
                )}
                {this.state.items.length ? this.state.items.map((item, index) => (
                    <StreamFeedItem  
                        feedItem={item} 
                        streamItem={streamItem} 
                        key={index} 
                        setImages={this.setImages} 
                        updateItem={this.updateItem} 
                        channel={channel}/>

                )) : this.state.loading ? 
                        <div className="container-p10">
                            <PostLoader /><PostLoader />
                        </div> : 
                        <div className="container-nodata">
                            <div>
                                <p><i className="fa fa-folder-open"></i> </p>
                                <span>No data found.</span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default StreamFeed;
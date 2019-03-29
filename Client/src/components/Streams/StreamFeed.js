import React from 'react';
import StreamFeedItem from './StreamFeedItem';
import {getStreamFeed} from '../../requests/streams';

class StreamFeed extends React.Component{
    state = {
        items: []
    };

    componentDidMount(){
        const {streamItem} = this.props;
        getStreamFeed(streamItem.type, streamItem.network, streamItem.channel_id, streamItem.search_query).then((response) => {
            
            const items = typeof response["data"] !== "undefined" ? response["data"] : response;
            if(!items.length) return;

            this.setState(() => ({
                items: items
            }));
        });
    }

    render(){
        const {streamItem, channel} = this.props;
        return (
            <div className="stream-feed scrollbar">
                {this.state.items.length ? this.state.items.map((item, index) => (
                    <StreamFeedItem  feedItem={item} streamItem={streamItem} key={index} channel={channel}/>
                )) : <div>No data</div>}
            </div>
        );
    }
}

export default StreamFeed;
import React from 'react';
import StreamPost from './StreamPost';
import DraftEditor from '../DraftEditor';

class TwitterReply extends React.Component{

    state = {
        content: "",
        pictures: [],
        letterCount: 0
    }

    updateContent = (content = "") => {
        this.setState(() => ({
            content: content,
            letterCount: content.length
        }));
    };

    updatePictures = (pictures = []) => {
        this.setState(() => ({
            pictures: pictures
        }));
    };

    render(){
        const {close, postData, channel} = this.props;
        return (
            <div className="t-reply-container">
                <div className="t-reply-heading">
                    <h3>Twitter Reply</h3>
                    <i onClick={close} className="fa fa-close link-cursor"></i>
                </div>
                <div className="t-reply-body">
                    <StreamPost {...postData} />
                </div>
                <div className="t-reply-footer">
                    <div className="t-reply-profile">
                        <img src={channel.avatar} />
                        <p>@{channel.username} replying to @{postData.username}</p>
                    </div>
                    <DraftEditor 
                        content={this.state.content}
                        pictures={this.state.pictures}
                        onChange={this.updateContent}
                        onImagesChange={this.updatePictures}
                        network="twitter"
                    />
                    <p className={`letter-count pull-left ${this.state.letterCount > 280 ? 'red-txt' : ''}`}>{this.state.letterCount}</p>
                    <div className="t-reply-actions">
                        <button onClick={close} className="cancelBtn" >Cancel</button>
                        {this.state.letterCount < 1 || this.state.letterCount > 280 ?
                            <button className="doneBtn disabled-btn" >Send</button> :
                            <button className="doneBtn" >Send</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TwitterReply;
import React from 'react';
import { connect } from 'react-redux';
import {Modifier, EditorState} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import channelSelector from '../selectors/channels';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import hashtagSuggestionList from '../fixtures/hashtagSuggestions';
import {tweet} from '../requests/twitter/channels';
import 'draft-js-mention-plugin/lib/plugin.css';


class Compose extends React.Component{

    emojiPlugin = createEmojiPlugin();
    hashtagMentionPlugin = createMentionPlugin({
        mentionPrefix: "#",
        mentionTrigger: "#"
    });


    state = {
        editorState: createEditorStateWithText(''),
        hashtagSuggestions: hashtagSuggestionList,
        selectChannelsModal: false,
        publishChannels: this.setPublishChannels()
    };

    componentDidUpdate(prevProps) {
        if(prevProps.channels !== this.props.channels){
            this.setState(() => ({
                publishChannels: this.setPublishChannels()
            }));
        }
    }

    onChannelSelectionChange = (username) => {
        const publishChannels = this.props.channels.map((channel) => {
            if(channel.username === username){
                channel.selected = 1;
            }else{
                channel.selected = 0;
            }

            return channel;
        });

        this.setState(() => ({
            publishChannels
        }));
    };

    setPublishChannels(){
        let publishChannels = localStorage.getItem('publishChannels');
        
        publishChannels = publishChannels ? JSON.parse(publishChannels) : this.props.channels;
        return publishChannels;
    }

    onChange = (editorState) => {
        this.setState(() => ({
            editorState
        }));
    };

    focus = () => {
        this.editor.focus();
    };

    onHashtagSearchChange = ({ value }) => {
        this.setState(() => ({
            hashtagSuggestions: defaultSuggestionsFilter(value, hashtagSuggestionList)
        }));
    };

    onAddMention = (mention) => {
        //console.log('mention', mention)
    };

    toggleSelectChannelsModal = () => {

        if(this.state.selectChannelsModal){
            console.log("here");
            localStorage.setItem('publishChannels', JSON.stringify(this.state.publishChannels));
        }

        this.setState(() => ({
            selectChannelsModal: !this.state.selectChannelsModal
        }));
    }

    onHashIconClick = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const ncs = Modifier.insertText(contentState, selection, "#");
        const es = EditorState.push(editorState, ncs, 'insert-fragment');
        this.setState(() => ({
            editorState: es
        }), () => this.focus());

    };

    postTweet = () => {
        const editorState = this.state.editorState;
        const content = editorState.getCurrentContent().getPlainText();

        tweet(content).then((response) => response);
    }

    render(){
        const { EmojiSuggestions, EmojiSelect} = this.emojiPlugin;
        const { MentionSuggestions: HashtagSuggestions } = this.hashtagMentionPlugin;
        const plugins = [this.emojiPlugin, this.hashtagMentionPlugin];

        return (
            <div className="modal fade" id="compose">
                <div className="modal-dialog compose-dialog">

                    {this.state.selectChannelsModal ? 
                    
                    <div className="modal-content">
                        <div className="modal-body">
                            {!!this.state.publishChannels.length && this.state.publishChannels.map((channel) => (
                                <label key={channel.id} className="channel-item selection-container">
                                    <input type="radio" onChange={() => this.onChannelSelectionChange(channel.username)} defaultChecked={channel.selected ? "checked" : ""} name="publish_channel" />
                                    <span className="checkmark"></span>
                                    <img src={channel.avatar} /> @{channel.username}
                                </label>
                            ))}
                        </div>

                        <div className="modal-footer">
                            <div onClick={this.toggleSelectChannelsModal} className="publish-btn-group gradient-background-teal-blue link-cursor pull-right">
                                <button className="publish-btn naked-button">Save</button>
                            </div>
                        </div>
                    </div>

                    :
                        
                    <div className="modal-content">
        
                        <div className="modal-header">
                            <button type="button" className="close fa fa-times-circle" data-dismiss="modal"></button>
                            <ul className="compose-header">
                                <li onClick={this.toggleSelectChannelsModal} className="add-new-channel"><i className="fa fa-plus"></i></li>

                                    {!!this.state.publishChannels.length && channelSelector(this.state.publishChannels, {selected: true, provider: undefined}).map((channel) => (
                                        <li key={channel.id} className="channel-item">
                                            <img src={channel.avatar}/>
                                        </li>
                                    ))}

                            </ul>
                        </div>

                        <div className="modal-body">
                            <form id="draft_form">
                            <div>
                                <div className="editor" onClick={this.focus}>
                                    <Editor
                                        editorState={this.state.editorState}
                                        onChange={this.onChange}
                                        plugins={plugins}
                                        placeholder="What's on your mind?"
                                        ref={(element) => { this.editor = element; }}
                                    />
                                    <EmojiSuggestions />
                                    <HashtagSuggestions
                                        onSearchChange={this.onHashtagSearchChange}
                                        suggestions={this.state.hashtagSuggestions}
                                        onAddMention={this.onAddMention}
                                        onClose={() => this.setState({ ...this, suggestions: hashtagSuggestionList })}
                                    />
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="editor-icons">
                            <i className="fa fa-image upload-images"></i>
                            <i className="fa fa-map-marker add-location"></i>
                            <EmojiSelect />
                            <i onClick={this.onHashIconClick} className="fa fa-hashtag add-hashtag"></i>
                        </div>

                        <div className="modal-footer">
                            <div className="publish-btn-group gradient-background-teal-blue link-cursor">
                                <button className="picker-btn fa fa-caret-up naked-button"></button>
                                <button onClick={this.postTweet} className="publish-btn naked-button">Post at best time</button>
                            </div>
                        </div>

                    </div>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider:undefined});

    return {
        channels
    }
}

export default connect(mapStateToProps)(Compose);
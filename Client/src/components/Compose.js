import React from 'react';
import { connect } from 'react-redux';
import {Modifier, EditorState} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import channelSelector from '../selectors/channels';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import hashtagSuggestions from '../fixtures/hashtagSuggestions';
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
        hashagSuggestions: hashtagSuggestions
    };

    componentDidUpdate(prevProps) {
        if(prevProps.channels !== this.props.channels){
            
        }
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
            hashagSuggestions: defaultSuggestionsFilter(value, hashtagSuggestions)
        }));
    };

    onAddMention = (mention) => {
        //console.log('mention', mention)
    };

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
        const {channels} = this.props;
        const { EmojiSuggestions, EmojiSelect} = this.emojiPlugin;
        const { MentionSuggestions: HashtagSuggestions } = this.hashtagMentionPlugin;
        const plugins = [this.emojiPlugin, this.hashtagMentionPlugin];

        return (
            <div className="modal fade" id="compose">
                <div className="modal-dialog compose-dialog">
                    <div className="modal-content">
        
                        <div className="modal-header">
                            <button type="button" className="close fa fa-times-circle" data-dismiss="modal"></button>
                            <ul className="compose-header">
                                <li className="add-new-channel"><i className="fa fa-plus"></i></li>
        
                                    {!!channels.length && channels.map((channel) => (
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
                                        suggestions={this.state.hashagSuggestions}
                                        onAddMention={this.onAddMention}
                                        onClose={() => this.setState({ ...this, suggestions: hashtagSuggestions })}
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
                            <div className="publish-btn-group gradient-background-teal-blue">
                                <button className="picker-btn fa fa-caret-up naked-button"></button>
                                <button onClick={this.postTweet} className="publish-btn naked-button">Post at best time</button>
                            </div>
                        </div>
        
                    </div>
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
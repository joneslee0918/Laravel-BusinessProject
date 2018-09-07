import React from 'react';
import { connect } from 'react-redux';
import {convertToRaw, Modifier, EditorState} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import channelSelector from '../selectors/channels';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import hashtagSuggestions from '../fixtures/hashtagSuggestions';
import 'draft-js-mention-plugin/lib/plugin.css';

// const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();
const hashtagMentionPlugin = createMentionPlugin({
    mentionPrefix: "#",
    mentionTrigger: "#"
});

const { EmojiSuggestions, EmojiSelect} = emojiPlugin;
const { MentionSuggestions: HashtagSuggestions } = hashtagMentionPlugin;

const plugins = [emojiPlugin, hashtagMentionPlugin];

class Compose extends React.Component{

    state = {
        editorState: createEditorStateWithText(''),
        hashagSuggestions: hashtagSuggestions
    };

    onChange = (editorState) => {
        //const contentState = editorState.getCurrentContent();
        //console.log('content state', convertToRaw(contentState));
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

    render(){
        const {channels} = this.props;
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
                                <button className="publish-btn naked-button">Post at best time</button>
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
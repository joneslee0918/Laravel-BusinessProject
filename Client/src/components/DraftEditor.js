import React from 'react';
import {convertToRaw} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
// import ImageUploader from 'react-images-upload';
// import editorStyles from './Plugins/css/editorStyles.css';
// import hashtagStyles from './Plugins/css/hashtagStyles.css';

const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions} = emojiPlugin;
const plugins = [hashtagPlugin, emojiPlugin];


export default class DraftEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: createEditorStateWithText('')
        };

        this.onChange = (editorState) => {
            const contentState = editorState.getCurrentContent();
            console.log('content state', convertToRaw(contentState));
            this.setState({
                editorState,
            });
        };

        this.focus = () => {
            this.editor.focus();
        };

        this.onDrop = this.onDrop.bind(this);
    };

    onDrop(picture){
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    };

    render() {
        return (
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
                </div>
            </div>
        );
    }
}
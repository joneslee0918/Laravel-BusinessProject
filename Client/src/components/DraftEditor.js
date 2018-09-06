import React from 'react';
import {convertToRaw} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';


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
                        plugins={this.props.editorPlugins}
                        placeholder="What's on your mind?"
                        ref={(element) => { this.editor = element; }}
                    />
                    {this.props.emojiSuggestions}
                </div>
            </div>
        );
    }
}
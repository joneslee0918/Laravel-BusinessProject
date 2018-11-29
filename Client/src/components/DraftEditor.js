import React from 'react';
import {connect} from 'react-redux';
import {Modifier, EditorState} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import ImageUploader from 'react-images-browse/src/component/compiled';
import hashtagSuggestionList from '../fixtures/hashtagSuggestions';


class DraftEditor extends React.Component{

    emojiPlugin = createEmojiPlugin();
    imageIcon = React.createRef();
    hashtagMentionPlugin = createMentionPlugin({
        mentionPrefix: "#",
        mentionTrigger: "#"
    });

    state = {
        editorState: createEditorStateWithText(this.props.content),
        hashtagSuggestions: hashtagSuggestionList,
        letterCount: 0,
        pictures: this.props.pictures
    };

    componentDidUpdate(prevProps){

        if(prevProps.post !== this.props.post && this.props.post){
            this.setState(() => ({
                editorState: createEditorStateWithText(this.props.post.content),
                pictures: this.props.post.images
            }));
        }
    }

    focus = () => {
        this.editor.focus();
    };

    onChange = (editorState) => {

        const text = editorState.getCurrentContent().getPlainText();

        this.setState(() => ({
            editorState,
            letterCount: text.length
        }), this.props.onChange(text));
    };

    onDrop = (pictures, pictureDataUrls) => {
        this.setState((prevState) => {
            if(prevState.pictures !== pictures){

                this.props.onImagesChange(pictureDataUrls);
                return {
                    pictures: pictureDataUrls
                }
            }
        });
    };

    onImageIconClick = () => {
        this.imageIcon.current.
        inputElement.
        previousSibling.
        click();
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

    onHashtagSearchChange = ({ value }) => {
        this.setState(() => ({
            hashtagSuggestions: defaultSuggestionsFilter(value, hashtagSuggestionList)
        }));
    };

    onAddMention = (mention) => {
        //console.log('mention', mention)
    };

    render(){

        const { EmojiSuggestions, EmojiSelect} = this.emojiPlugin;
        const { MentionSuggestions: HashtagSuggestions } = this.hashtagMentionPlugin;
        const plugins = [this.emojiPlugin, this.hashtagMentionPlugin];
        const {scheduledLabel} = this.props;

        return(
            <div>
                <div className="modal-body">
                    <form id="draft_form">
                        <div>
                            <div className="editor" onClick={this.focus}>

                                {scheduledLabel}

                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    placeholder="What's on your mind?"
                                    ref={(element) => { this.editor = element; }}
                                />
                                <ImageUploader
                                    withIcon={false}
                                    buttonText=''
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    withLabel={false}
                                    buttonClassName='dnone'
                                    ref={this.imageIcon}
                                    defaultImages={this.state.pictures}
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
                    <i onClick={this.onImageIconClick} className="fa fa-image upload-images"></i>
                    {/* <i className="fa fa-map-marker add-location"></i> */}
                    <EmojiSelect />
                    <i onClick={this.onHashIconClick} className="fa fa-hashtag add-hashtag"></i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post
    }
};

export default connect(mapStateToProps)(DraftEditor);
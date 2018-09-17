import React from 'react';
import { connect } from 'react-redux';
import {Modifier, EditorState} from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import Popup from "reactjs-popup";
import ImageUploader from 'react-images-upload';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import channelSelector from '../selectors/channels';
import hashtagSuggestionList from '../fixtures/hashtagSuggestions';
import {tweet} from '../requests/twitter/channels';
import 'draft-js-mention-plugin/lib/plugin.css';
import {hours, minutes, dayTime} from "../fixtures/time";


class Compose extends React.Component{

    emojiPlugin = createEmojiPlugin();
    imageIcon = React.createRef();
    hashtagMentionPlugin = createMentionPlugin({
        mentionPrefix: "#",
        mentionTrigger: "#"
    });


    state = {
        editorState: createEditorStateWithText(''),
        hashtagSuggestions: hashtagSuggestionList,
        selectChannelsModal: false,
        publishChannels: this.setPublishChannels(),
        publishState: {
            name: "Post at Best Time",
            value: "best"
        },
        postTime: null,
        calendarFocused: false,
        showCalendar: false,
        optionsMenu: false,
        pictures: []
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

    onImageIconClick = () => {
        this.imageIcon.current.
        inputElement.
        previousSibling.
        click();
    }

    setPublishChannels(){
        let publishChannels = localStorage.getItem('publishChannels');
        
        publishChannels = publishChannels ? JSON.parse(publishChannels) : this.props.channels;
        return publishChannels;
    }

    setPublishState = (publishState, close = false) => {

        this.setState(() => ({
            publishState,
            showCalendar: false
        }), () => {
            if(close){
                close(); 
            }
        });
    }

    onChange = (editorState) => {
        this.setState(() => ({
            editorState
        }));
    };

    onDrop = (pictures, pictureDataUrls) => {
        this.setState((prevState) => {
            if(prevState.pictures !== pictures){
                return {
                    pictures: pictureDataUrls
                }
            }
        });
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

    onDateChange = (postTime) => {
        if(postTime)
        this.setState(() => ({postTime}));
    };

    onFocusChange = ({focused}) => {
        this.setState((prevState) => ({
            calendarFocused: focused,
            showCalendar: !focused ? focused : prevState.showCalendar
        }));
    };

    toggleSelectChannelsModal = () => {

        if(this.state.selectChannelsModal){
            localStorage.setItem('publishChannels', JSON.stringify(this.state.publishChannels));
        }

        this.setState(() => ({
            selectChannelsModal: !this.state.selectChannelsModal
        }));
    }

    toggleOptionsMenu = () => {
        this.setState(() => ({optionsMenu: !this.state.optionsMenu}));
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

                        <div className="modal-footer" style={{position:"relative"}}>
                            <div className="publish-group gradient-background-teal-blue link-cursor">

                                <Popup
                                    trigger={<button onClick={this.toggleOptionsMenu} className="picker-btn fa fa-caret-up naked-button btn-side-arrow"></button>}
                                    on="click"
                                    position="top"
                                    arrow={!this.state.showCalendar}
                                >
                                {
                                 close => ( 
                                     <div className="popup-options">

                                            {!this.state.showCalendar ?

                                            <div className="tooltip-menu">
                                                <div onClick={() => this.setPublishState({name:"Post right now", value: "now"}, close)} className="menu-item"> 
                                                    <h4>Post now</h4>
                                                    <p>Share right away</p>
                                                </div>
                                                <div onClick={() => {this.onFocusChange({focused: true}); this.setState(() => ({showCalendar: true}))}} className="menu-item"> 
                                                    <h4>Post at Custom Time</h4>
                                                    <p>Schedule at a specific time</p>    
                                                </div>                                  
                                                <div onClick={() => this.setPublishState({name: "Post at Best Time", value: "best"}, close)} className="menu-item"> 
                                                    <h4>Post at Best Time</h4>
                                                    <p>Share when your audience is most active</p>
                                                </div>
                                            </div>
                                            
                                            :

                                            <div className="uc-calendar">
                                                <SingleDatePicker
                                                    onDateChange={this.onDateChange}
                                                    date={this.state.postTime}
                                                    focused={this.state.calendarFocused}
                                                    onFocusChange={this.onFocusChange}
                                                    numberOfMonths={1}
                                                    showDefaultInputIcon={false}
                                                    keepOpenOnDateSelect={true}
                                                    keepFocusOnInput={true}
                                                    inputIconPosition="after"
                                                    readOnly={true}
                                                    small={true}
                                                    customInputIcon={
                                                        <div>
                                                            <div className="uc-calendar-time-picker">                                                  
                                                                <select className="hours">
                                                                    {hours.map((hour) => (
                                                                        <option key={hour} value={hour}>{hour}</option>
                                                                    ))}
                                                                    
                                                                </select>

                                                                <select className="minutes">
                                                                    {minutes.map((minute) => (
                                                                        <option key={minute} value={minute}>{minute}</option>
                                                                    ))}
                                                                </select>

                                                                <select className="dayTime">
                                                                    {dayTime.map((time) => (
                                                                        <option key={time} value={time}>{time}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            
                                                            <div 
                                                                onClick={() => this.setPublishState({name: "Custom Time", value: "date"}, close)} 
                                                                className="btn naked-button date-btn">
                                                                Done
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        }
                                            
                                     </div>
                                    )
                                }
                                </Popup>
                                
                                <button onClick={this.postTweet} className="publish-btn naked-button half-btn">{this.state.publishState.name}</button>
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
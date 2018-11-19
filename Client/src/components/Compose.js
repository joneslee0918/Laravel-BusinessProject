import React from 'react';
import { connect } from 'react-redux';
import {Modifier, EditorState} from 'draft-js';
import { Redirect, Link } from 'react-router-dom';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import Popup from "reactjs-popup";
import ImageUploader from 'react-images-browse/src/component/compiled';
import moment from "moment";
import momentTz from "moment-timezone";
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import channelSelector from '../selectors/channels';
import hashtagSuggestionList from '../fixtures/hashtagSuggestions';
import {publish} from '../requests/channels';
import 'draft-js-mention-plugin/lib/plugin.css';
import {hours, minutes, dayTime} from "../fixtures/time";
import {setPost, setPostedArticle} from "../actions/posts";
import {LoaderWithOverlay} from "./Loader";


class Compose extends React.Component{

    emojiPlugin = createEmojiPlugin();
    imageIcon = React.createRef();
    hashtagMentionPlugin = createMentionPlugin({
        mentionPrefix: "#",
        mentionTrigger: "#"
    });

    defaultPost = {
        id: "",
        content: "", 
        type: "store",
        images: [],
        scheduled_at: moment(),
        scheduled_at_original: moment()
    };

    defaultState = {
        editorState: createEditorStateWithText(''),
        type: 'store',
        hashtagSuggestions: hashtagSuggestionList,
        selectChannelsModal: false,
        publishChannels: this.setPublishChannels(),
        publishState: {
            name: "Post at Best Time",
            value: "best"
        },
        postDate: moment(),
        publishTimestamp: null,
        publishDateTime: null,
        publishUTCDateTime: null,
        publishTimezone: momentTz.tz.guess(),
        calendarData: {
            time: {
                hour: moment().add(1, "hours").format("hh"),
                minutes: minutes[Math.floor(Math.random() * minutes.length)],
                time: moment().format("A")
            }
        },
        calendarFocused: false,
        canSchedule: false,
        showCalendar: false,
        optionsMenu: false,
        twitterSelect: false,
        facebookSelect: false,
        letterCount: 0,
        pictures: [],
        loading: false,
        stored: false,
        refresh: true,
        error: false
    };

    state = this.defaultState;

    componentDidMount(){
        if(!this.state.publishTimestamp){
            this.setPublishTimestamp();
        }
    }

    componentDidUpdate(prevProps) {

        if(prevProps.post !== this.props.post && this.props.post){

            const postDate = (this.props.post ? this.props.post.type : 'store') === 'edit' ? 
            this.props.post.scheduled_at_original : 
            moment().add(1, "hours");

            let refresh = this.state.refresh;

            if(typeof(this.props.post.refresh) !== "undefined"){
                refresh = this.props.post.refresh;
            }

            let publishState = {
                name: "Custom Time",
                value: "date"
            };

            if(this.props.post.type == 'store'){
                publishState = {
                    name: "Post at Best Time",
                    value: "best"
                }
            }

            this.setState(() => ({
                editorState: createEditorStateWithText(this.props.post.content),
                pictures: this.props.post.images,
                postDate: moment(postDate),
                type: this.props.post ? this.props.post.type : "store",
                calendarData: {
                    time: {
                        hour: moment(postDate).format("hh"),
                        minutes: moment(postDate).format("mm"),
                        time: moment(postDate).format("A"),
                    }
                },
                publishState,
                letterCount: this.props.post.content.length,
                refresh
            }), () => this.setPublishTimestamp());
        }

        if(this.state.stored){
            document.getElementById("closeModal").click();
        }

        if(prevProps.channels !== this.props.channels){
            this.setState(() => ({
                publishChannels: this.setPublishChannels()
            }));
        }
    }

    onChannelSelectionChange = (obj) => {

        const publishChannels = this.state.publishChannels.map((channel) => {
            if(channel.id === obj.id){
                return {
                    ...channel,
                    selected: channel.selected ? 0 : 1
                }
            }
            else{
        
                if(obj.type == "twitter" && channel.type == "twitter"){
                    return {
                        ...channel,
                        selected:0
                    }
                }else{
                    return {
                        ...channel
                    };
                }
            }
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

    toggleTwitterSelect = () => {
        this.setState(() => ({
            twitterSelect: !this.state.twitterSelect
        }));
    };

    toggleFacebookSelect = () => {
        this.setState(() => ({
            facebookSelect: !this.state.facebookSelect
        }));
    };

    setPublishChannels(){
        // const publishChannelStorage = JSON.parse(localStorage.getItem('publishChannels'));
        const publishChannels = this.props.channels;
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

    setPublishTimestamp = () => {
        const postDate = this.state.postDate;
        const date = moment(postDate).format("YYYY-MM-DD");
        const time = this.state.calendarData.time;
        const formatted24HTime = moment(`${time.hour}:${time.minutes} ${time.time}`, "hh:mm a").format("HH:mm");
        const dateTime = date.concat(`T${formatted24HTime}`);

        this.setState(() => ({
            publishTimestamp: moment(dateTime).unix(),
            publishDateTime: moment(dateTime).format("YYYY-MM-DDTHH:mmZ"),
            publishUTCDateTime: moment(dateTime).utc().format("YYYY-MM-DDTHH:mm")
        }),
        () => {
            if(this.state.publishTimestamp > moment().unix()){
                this.setState(() => ({
                    canSchedule: true
                }));
            }else{
                this.setState(() => ({
                    canSchedule: false
                }));
            }
        });
    };

    onChange = (editorState) => {
        this.setState(() => ({
            editorState,
            letterCount: editorState.getCurrentContent().getPlainText().length
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

    onDateChange = (postDate) => {
        this.setState(() => ({postDate}), () => this.setPublishTimestamp());
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

    onHourChange = (e) => {
        const value = e.target.value;
        this.setState((prevState) => {
            
            const calendarData = prevState.calendarData;
            calendarData.time.hour = value;

            return {
                calendarData
            }
        }, () => this.setPublishTimestamp());
    };

    onMinutesChange = (e) => {
        const value = e.target.value;
        this.setState((prevState) => {
            const calendarData = prevState.calendarData;
            calendarData.time.minutes = value;

            return {
                calendarData
            }
        }, () => this.setPublishTimestamp());
    };

    onTimeChange = (e) => {
        const value = e.target.value;
        this.setState((prevState) => {
            const calendarData = prevState.calendarData;
            calendarData.time.time = value;

            return {
                calendarData
            }
        }, () => this.setPublishTimestamp());
    };

    publish = () => {
        const editorState = this.state.editorState;
        const content = editorState.getCurrentContent().getPlainText();
        const type = this.state.type;
        const id = this.props.post ? this.props.post.id : "";
        const articleId = this.props.post && typeof(this.props.post.articleId) !== "undefined" ? this.props.post.articleId : "";
        const images = this.state.pictures;
        const publishState = this.state.publishState;
        const publishTimestamp = this.state.publishTimestamp;
        const publishDateTime = this.state.publishDateTime;
        const publishUTCDateTime = this.state.publishUTCDateTime;
        const publishTimezone = this.state.publishTimezone;
        const publishChannels = channelSelector(this.state.publishChannels, {selected: true, provider: undefined});

        this.setState(() => ({
            loading: true
        }));

        publish({
            content, 
            images,                
            publishChannels, 
            publishType: publishState.value, 
            scheduled:{
                publishTimestamp,
                publishDateTime,
                publishUTCDateTime,
                publishTimezone
            },
            type,
            id,
            articleId
        })
        .then((response) => {
            this.setState(() => ({
                loading: false,
                stored: true
            }), () => {
                if(articleId){
                    this.props.setPostedArticle({
                        articleId,
                        posted: publishState.value == "now" ? 1 : 0
                    });
                }
            });
        }).catch((error) => {
            this.setState(() => ({
                loading: false,
                error: true
            }));
        });
    }

    render(){
        const { EmojiSuggestions, EmojiSelect} = this.emojiPlugin;
        const { MentionSuggestions: HashtagSuggestions } = this.hashtagMentionPlugin;
        const plugins = [this.emojiPlugin, this.hashtagMentionPlugin];

        const twitterChannels = channelSelector(this.state.publishChannels, {selected: undefined, provider: "twitter"});
        const facebookChannels = channelSelector(this.state.publishChannels, {selected: undefined, provider: "facebook"});

        return (
            <div className="modal fade" id="compose" tabIndex="-1" data-backdrop="static" data-keyboard="false" role="dialog">
                {(this.state.stored && this.state.refresh) && <Redirect to={location.pathname} />}
                {this.state.loading && <LoaderWithOverlay/>}
                
                <div className="modal-dialog modal-dialog-centered compose-dialog" role="document">
   
                    {this.state.selectChannelsModal ? 
                    
                    <div className="modal-content">
                        <div className="modal-body">
                            {!!twitterChannels.length &&
                                <h3 className="bg-heading" onClick={this.toggleTwitterSelect}>
                                <i className="fa fa-twitter"> </i> Twitter
                                {this.state.twitterSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                                </h3>
                            }
                            {!!twitterChannels.length && this.state.twitterSelect &&
                                
                                twitterChannels.map((channel) => (
                                        <label key={channel.id} className="channel-item selection-container">
                                            <input type="radio" onChange={() => this.onChannelSelectionChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="twitter_channel" />
                                            <span className="checkmark round"></span>
                                            <img className="avatar-box" src={channel.avatar} /> {channel.name}
                                        </label>
                                )
                            )}

                            {!!facebookChannels.length &&
                                <h3 className="bg-heading" onClick={this.toggleFacebookSelect}>
                                <i className="fa fa-facebook"> </i> Facebook
                                {this.state.facebookSelect ? <i className="fa fa-minus pull-right"> </i> : <i className="fa fa-plus pull-right"> </i> }
                                </h3>
                            }
                            {!!facebookChannels.length && this.state.facebookSelect &&
                                
                                facebookChannels.map((channel) => (
                                        <label key={channel.id} className="channel-item selection-container">
                                            <input type="checkbox" onChange={() => this.onChannelSelectionChange(channel)} defaultChecked={channel.selected ? "checked" : ""} name="facebook_channel" />
                                            <span className="checkmark"></span>
                                            <img className="avatar-box" src={channel.avatar} /> {channel.name}
                                        </label>
                                )
                            )}
                        </div>

                        <div className="modal-footer">
                            <div onClick={this.toggleSelectChannelsModal} className="publish-btn-group gradient-background-teal-blue link-cursor pull-right">
                                <button className="publish-btn naked-button">Done</button>
                            </div>
                        </div>
                    </div>

                    :
                        
                    <div className="modal-content">
        
                        <div className="modal-header">
                            <button type="button" id="closeModal" onClick={() => {this.props.setPost(this.defaultPost); this.setState(() => (this.defaultState))}} className="close fa fa-times-circle" data-dismiss="modal"></button>
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
                                    {(this.state.canSchedule && this.state.publishState.value === "date") 
                                    && <div className="schedule-info">{`Scheduled: ${moment(this.state.publishDateTime).format("DD MMMM YYYY hh:mmA")}`}</div>}
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

                        <div className="modal-footer" style={{position:"relative"}}>
                            <div className="publish-group gradient-background-teal-blue link-cursor">

                                <Popup
                                    trigger={<button className="picker-btn fa fa-caret-up naked-button btn-side-arrow"></button>}
                                    on="click"
                                    position="top center"
                                    arrow={!this.state.showCalendar}
                                    closeOnDocumentClick={true}
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
                                                    {!(this.state.canSchedule && this.state.publishState.value === "date") ?
                                                        <p>Schedule at a specific time</p>
                                                        :
                                                        <p className="schedule-info">{moment(this.state.publishDateTime).format("DD MMMM YYYY hh:mmA")}</p>
                                                    }    
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
                                                    date={this.state.postDate}
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
                                                                <select onChange={this.onHourChange} value={this.state.calendarData.time.hour} className="hours">
                                                                    {hours.map((hour) => (
                                                                        <option key={hour} value={hour}>{hour}</option>
                                                                    ))}
                                                                    
                                                                </select>

                                                                <select onChange={this.onMinutesChange} value={this.state.calendarData.time.minutes} className="minutes">
                                                                    {minutes.map((minute) => (
                                                                        <option key={minute} value={minute}>{minute}</option>
                                                                    ))}
                                                                </select>

                                                                <select onChange={this.onTimeChange} value={this.state.calendarData.time.time} className="dayTime">
                                                                    {dayTime.map((time) => (
                                                                        <option key={time} value={time}>{time}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            
                                                            <div 
                                                                onClick={() => {
                                                                    if(this.state.canSchedule){
                                                                        this.setPublishState({name: "Custom Time", value: "date"}, close)}
                                                                    }
                                                                }   
                                                                className={`btn naked-button date-btn ${!this.state.canSchedule ? 'disabled' : ''}`}>
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
                                
                                <button onClick={() => {
                                    if((this.state.letterCount > 0 
                                        && this.state.letterCount <= 280 || (this.state.pictures.length > 0 
                                            && this.state.pictures.length < 5)) 
                                            && (this.state.canSchedule || this.state.publishState.value !== 'date') 
                                            && channelSelector(this.state.publishChannels, {selected: true, provider: undefined}).length){
                                       this.publish(); 
                                    }
                                }} className={`publish-btn naked-button half-btn ${(
                                    this.state.letterCount > 0 && 
                                    this.state.letterCount <= 280 || this.state.pictures.length > 0)
                                     && (this.state.canSchedule || this.state.publishState.value !== 'date') 
                                     && channelSelector(this.state.publishChannels, {selected: true, provider: undefined}).length ? 
                                     '' : 'disabled-btn'}`}>
                                     {this.state.publishState.name}</button>
                            </div>
                            <p className={`letter-count ${this.state.letterCount > 280 ? 'red-txt' : ''}`}>{this.state.letterCount}</p>
                        </div>
                        {this.state.error && <div className='alert alert-danger'>Something went wrong.</div>}
                    </div>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider: undefined, publishable: true});

    return {
        channels,
        post: state.posts.post
    }
}

const mapDispatchToProps = (dispatch) => ({
    setPost: (post) => dispatch(setPost(post)),
    setPostedArticle: (article) => dispatch(setPostedArticle(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
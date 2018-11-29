import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from "moment";
import DraftEditor from './DraftEditor';
import channelSelector from '../selectors/channels';
import {publish} from '../requests/channels';
import {setPost, setPostedArticle} from "../actions/posts";
import {LoaderWithOverlay} from "./Loader";
import SelectChannelsModal from "./SelectChannelsModal";
import PublishButton from './PublishButton';


class Compose extends React.Component{

    defaultPost = {
        id: "",
        content: "", 
        type: "store",
        images: [],
        scheduled_at: moment(),
        scheduled_at_original: moment()
    };

    defaultState = {
        content: "",
        type: 'store',
        selectChannelsModal: false,
        publishChannels: this.props.channels,
        optionsMenu: false,
        letterCount: 0,
        pictures: [],
        loading: false,
        stored: false,
        refresh: true,
        restricted: false,
        twitterRestricted: false,
        scheduledLabel: "",
        error: false
    };

    state = this.defaultState;

    componentDidMount(){
        this.setRestrictions();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.post !== this.props.post && this.props.post){

            let refresh = this.state.refresh;

            if(typeof(this.props.post.refresh) !== "undefined"){
                refresh = this.props.post.refresh;
            }


            this.setState(() => ({
                type: this.props.post ? this.props.post.type : "store",
                letterCount: this.props.post.content.length,
                refresh
            }));
        }

        if(this.state.stored){
            document.getElementById("closeModal").click();
        }

        if(prevProps.channels !== this.props.channels){
            this.setState(() => ({
                publishChannels: this.props.channels
            }));
        }

        if(prevState.letterCount !== this.state.letterCount 
            || prevState.pictures !== this.state.pictures 
            || prevState.publishChannels !== this.state.publishChannels){
            this.setRestrictions();
        }
    }

    setRestrictions = () => {

        const selectedChannels = channelSelector(this.state.publishChannels, {selected: true, provider: undefined});

        const restricted = !((this.state.letterCount > 0 || this.state.pictures.length > 0)
                && selectedChannels.length);

        const twitterRestricted = (this.state.letterCount > 280 || this.state.pictures.length > 4) 
        && channelSelector(selectedChannels, {selected: undefined, provider: "twitter"}).length;


        this.setState(() => ({
            restricted,
            twitterRestricted
        }));
    };

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

    updateScheduledLabel = (scheduledLabel) => {
        this.setState(() => ({
            scheduledLabel
        }));
    };

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


    toggleSelectChannelsModal = () => {

        if(this.state.selectChannelsModal){
            localStorage.setItem('publishChannels', JSON.stringify(this.state.publishChannels));
        }

        this.setState(() => ({
            selectChannelsModal: !this.state.selectChannelsModal
        }));
    };

    toggleOptionsMenu = () => {
        this.setState(() => ({optionsMenu: !this.state.optionsMenu}));
    };

    publish = (scheduled, publishType) => {
        const content = this.state.content;
        const type = this.state.type;
        const id = this.props.post ? this.props.post.id : "";
        const articleId = this.props.post && typeof(this.props.post.articleId) !== "undefined" ? this.props.post.articleId : "";
        const images = this.state.pictures;
        const publishChannels = channelSelector(this.state.publishChannels, {selected: true, provider: undefined});

        this.setState(() => ({
            loading: true
        }));

        publish({
            content, 
            images,                
            publishChannels, 
            publishType, 
            scheduled,
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
                        posted: publishType == "now" ? 1 : 0
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

        const scheduledLabel = this.state.scheduledLabel && <div className="schedule-info">{this.state.scheduledLabel}</div>;

        return (
            <div className="modal fade" id="compose" tabIndex="-1" data-backdrop="static" data-keyboard="false" role="dialog">
                {(this.state.stored && this.state.refresh) && <Redirect to={location.pathname} />}
                {this.state.loading && <LoaderWithOverlay/>}
                
                <div className="modal-dialog modal-dialog-centered compose-dialog" role="document">
   
                    {this.state.selectChannelsModal ? 
                    
                    <SelectChannelsModal 
                    channels={this.state.publishChannels} 
                    onChange={this.onChannelSelectionChange}
                    toggle={this.toggleSelectChannelsModal}/>

                    :
                        
                    <div className="modal-content">
        
                        <div className="modal-header">
                            <button type="button" id="closeModal" onClick={() => {this.props.setPost(this.defaultPost); this.setState(() => (this.defaultState))}} className="close fa fa-times-circle" data-dismiss="modal"></button>
                            <ul className="compose-header">
                                <li onClick={this.toggleSelectChannelsModal} className="add-new-channel"><i className="fa fa-plus"></i></li>

                                    {!!this.state.publishChannels.length && channelSelector(this.state.publishChannels, {selected: true, provider: undefined}).map((channel) => (
                                        <li key={channel.id} className="channel-item">
                                            <div className="remove-overlay fa fa-close" onClick={() => this.onChannelSelectionChange(channel)}></div>
                                            <img src={channel.avatar}/>
                                        </li>
                                    ))}

                            </ul>
                        </div>

                        <DraftEditor 
                            scheduledLabel={scheduledLabel}
                            onChange={this.updateContent}
                            onImagesChange={this.updatePictures}
                            content={this.state.content}
                            pictures={this.state.pictures}
                        />

                        <div className="modal-footer" style={{position:"relative"}}>
                            <PublishButton 
                                action={this.publish} 
                                onChange={this.updateScheduledLabel}
                                restricted={this.state.restricted}
                                />

                            <p className={`letter-count ${this.state.twitterRestricted && this.state.letterCount > 280 ? 'red-txt' : ''}`}>{this.state.letterCount}</p>
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
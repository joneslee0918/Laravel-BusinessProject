import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import channelSelector from '../selectors/channels';
import SelectChannelsModal from './SelectChannelsModal';

class TailoredPostModal extends React.Component{

    state = {
        publishChannels: this.props.channels,
        selectChannelsModal: false
    };

    toggleSelectChannelsModal = () => {

        if(this.state.selectChannelsModal){
            localStorage.setItem('publishChannels', JSON.stringify(this.state.publishChannels));
        }

        this.setState(() => ({
            selectChannelsModal: !this.state.selectChannelsModal
        }));
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

    render(){
        const {title, image, source, description, isOpen, toggleTailoredPostModal} = this.props;
        return  (
                    <Modal 
                    isOpen={isOpen}
                    ariaHideApp={false}
                    className="tailored-post-wrapper"
                    >   
                        <Modal isOpen={this.state.selectChannelsModal} ariaHideApp={false} className="modal-no-bg">
                            <SelectChannelsModal 
                            channels={this.state.publishChannels} 
                            onChange={this.onChannelSelectionChange}
                            toggle={this.toggleSelectChannelsModal}/>
                        </Modal>
                        <div className="tailored-post-container">
                            <div className="tailored-post-content">
                                <TailoredPostCard 
                                    network="twitter"
                                    title={title}
                                    image={image}
                                    source={source}
                                />

                                <TailoredPostCard 
                                    network="facebook"
                                    title={title}
                                    image={image}
                                    source={source}
                                />

                            </div>
                            <div className="tailored-post-bottom flex-center">
                                <div className="tailored-post-bottom-content flex-center-h">

                                    <ul className="compose-header">
                                        <li onClick={this.toggleSelectChannelsModal} className="add-new-channel"><i className="fa fa-plus"></i></li>

                                        {!!this.state.publishChannels.length && channelSelector(this.state.publishChannels, {selected: true, provider: undefined}).map((channel) => (
                                            <li key={channel.id} className="channel-item">
                                                <div className="remove-overlay fa fa-close" onClick={() => this.onChannelSelectionChange(channel)}></div>
                                                <img src={channel.avatar}/>
                                            </li>
                                        ))}

                                    </ul>
                                    <div className="publish-group gradient-background-teal-blue link-cursor">
                                        <button className={`publish-btn naked-button half-btn`}>
                                            Publish now
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="tailored-post-close flex-center-h">
                            <button className="btn tailorCloseBtn" onClick={() => toggleTailoredPostModal({})}>
                                <i className="fa fa-close"></i>
                            </button>
                        </div>
                    </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider: undefined, publishable: true});

    return {
        channels
    }
}

export default connect(mapStateToProps)(TailoredPostModal);

const TailoredPostCard = ({network, title, image, source}) => (
    <div className="tailored-post-card">

    <div className="tailored-post-card-content">
            <div className="tailored-post-preview">

                <div className="tailored-post-preview__header">
                    <i className={ `socialIcon fa fa-${network} ${network}_bg`}></i>
                    <div>
                        <div className="social-preview-title">{network} preview</div>
                        <div className="small-blurry-text">small text here</div>
                    </div>
                </div>

                {network == "facebook" ?
                    <div className="social-body-text-suggestion">
                        Click here to add text
                    </div>
                    :
                    <div className="social-body-text">
                        {title}
                    </div>
                }
                <div className="tailored-post-preview-body">
                    <img src={image}/>
                    <div className="tailoredPost__previewCardWrapper__link__text">
                        <div className="tailoredPost__previewCardWrapper__link__title">{title}</div>
                        <div className="tailoredPost__previewCardWrapper__link__domain">{source}</div>
                    </div>
                </div>
            </div>
            <div className="tailored-post-overlay flex-center-v">
                
                <div>
                    <div className="flex-center-h">
                        <i className={`overlaySocialIcon fa fa-${network} ${network}_color`}></i>
                    </div>
                    <div className="flex-center-h center-inline p10">
                        Let's reach more people by posting on {network}
                    </div>
                    <div className="flex-center-h">
                        <button className={`connectButton btn ${network}_bg normalizeText`}>Add {network}</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

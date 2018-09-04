import React from 'react';
import { connect } from 'react-redux';
import channelSelector from '../selectors/channels';
import DraftEditor from './DraftEditor';
import createEmojiPlugin from 'draft-js-emoji-plugin';

const emojiPlugin = createEmojiPlugin();
const { EmojiSelect } = emojiPlugin;

const Compose = ({ channels }) => (
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
                        <DraftEditor />
                        <div id="imagePlugin"></div>
                    </form>
                </div>
                <div className="editor-icons">
                    <i className="fa fa-image upload-images"></i>
                    <i className="fa fa-map-marker add-location"></i>
                    <i id="emojiPlugin" className="fa">
                        <EmojiSelect />
                    </i>
                    <i className="fa fa-hashtag add-hashtag"></i>
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

const mapStateToProps = (state) => {
    const channels = channelSelector(state.channels.list, {selected: undefined, provider:undefined});
    return {
        channels
    }
}

export default connect(mapStateToProps)(Compose);
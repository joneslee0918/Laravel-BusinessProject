import React from 'react';
import moment from "moment";
import SweetAlert from 'sweetalert2-react';
import Loader from './Loader';

export const PostList = ({
    action, 
    setAction, 
    destroyPost, 
    publishPost,
    error,
    setError,
    posts,
    loading,
    title,
    type
}) => (
            <div>

                <SweetAlert
                    show={!!action.id}
                    title={`Do you wish to ${action.type} this item?`}
                    text="To confirm your decision, please click one of the buttons below."
                    showCancelButton
                    type="warning"
                    confirmButtonText="Yes"
                    cancelButtonText="No"
                    onConfirm={() => {
                        if(action.type === 'delete'){
                            destroyPost(action.id);
                        }else if(action.type === 'post'){
                            publishPost(action.id);
                        }else{
                            console.log('something went wrong');
                        }

                        setAction();
                    }}
                    onCancel={() => {
                        setAction();
                    }}
                    onClose={() => setAction()}
                />

                <SweetAlert
                    show={!!error}
                    title={`Error`}
                    text={`${error}`}
                    type="error"
                    confirmButtonText="Ok"
                    cancelButtonText="No"
                    onConfirm={() => {
                        setError(() => ({ error: false}));
                    }}
                />

                <h2>{title}</h2>
                {(posts.length < 1 && !loading) && 
                <div className="no-data">No posts have been scheduled or published yet.</div>}

                {loading && <Loader />}

                <div className="row">
                    <div className="col-xs-12">

                    {posts.map((postGroup, index) => (
                        
                        <div key={index} className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>{   
                                    moment(postGroup[0].scheduled_at_original).calendar(null, {
                                        sameDay: '[Today]',
                                        nextDay: '[Tomorrow]',
                                        nextWeek: 'dddd',
                                        lastDay: '[Yesterday]',
                                        lastWeek: '[Last] dddd',
                                        sameElse: 'DD/MM/YYYY'
                                    })
                                }</h4>
                            </div>

                            {postGroup.map((post) => (
                                <div key={post.id} className={`item-row schedule-row ${type}`}>
                                    <div className="profile-info pull-left">
                                        
                                        <h4>{moment(post.scheduled_at_original).format("h:mm A")}<small className="red-txt">{post.status < 0 ? ' (failed)': ''}</small></h4>
                                        <span>{post.content}</span>

                                        {post.payload.images.map((image, index) => (
                                            <img key={index} src={image.absolutePath} />
                                        ))}
                                        
                                    </div>
                                    <div className="item-actions pull-right">
                                        <ul>
                                            <li className="text-links link-inactive"><a className="link-cursor">{`${type === 'past-scheduled' ? 'Reschedule' : 'Edit'}`}</a></li>
                                            <li className="text-links link-inactive"><a className="link-cursor danger-btn" onClick={() => setAction({type: 'delete', id: post.id})}>Delete</a></li>
                                            <li className="text-links"><a className="link-cursor" onClick={() => setAction({type: 'post', id: post.id})}>Post Now</a></li>
                                        </ul>
                                    </div>
                                </div>
                            ))}

        
                        </div>

                    ))}
        
                    </div>
                </div>
            </div>
            
);

export default PostList;
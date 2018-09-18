import React from 'react';

export default class ScheduledPosts extends React.Component{
    render(){
        return(
            <div>
                <h2>SCHEDULED POSTS</h2>

                <div className="row">
                    <div className="col-xs-12">
        
                        <div className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>Yesterday</h4>
                            </div>
        
                            <div className="item-row schedule-row">
                                <div className="profile-info pull-left">
                                    This is a sample post
        
                                    <img src="https://www.google.org/assets/static/images/grantees/storyweaver/pratham-books-hero-2x-cf1bc4ec02580dbb7ca256ae3347c63d.jpg" />
                                </div>
                                <div className="item-actions pull-right">
                                    <ul>
                                        <li className="text-links link-inactive"><a href="#">Edit</a></li>
                                        <li className="text-links link-inactive"><a href="#">Delete</a></li>
                                        <li className="text-links"><a href="#">Post Now</a></li>
                                    </ul>
                                </div>
                            </div>
        
                        </div>
        
                        <div className="item-list shadow-box">
                            <div className="item-header schedule-header">
                                <h4>Yesterday</h4>
                            </div>
        
                            <div className="item-row schedule-row">
                                <div className="profile-info pull-left">
                                    Another sample post
                                </div>
                                <div className="item-actions pull-right">
                                    <ul>
                                        <li className="text-links link-inactive"><a href="#">Edit</a></li>
                                        <li className="text-links link-inactive"><a href="#">Delete</a></li>
                                        <li className="text-links"><a href="#">Post Now</a></li>
                                    </ul>
                                </div>
                            </div>
        
                        </div>
        
                    </div>
                </div>
            </div>
            
        );
    }
}
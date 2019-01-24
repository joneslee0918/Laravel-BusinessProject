import React from 'react';

class FacebookAnalytics extends React.Component { 
    
    constructor(props){
        super(props);
    }

    state = {
        data: false,
        loading: false
    }

    render(){
        const {channel} = this.props;
        return (
            <div>
            <div className="row twitter-profile-analytics">
                <div className="col-xs-12">
                    <div className="row border-bottom tw-img-followers">
                        <div className="col-md-6 col-xs-12 text-left">
                            <div className="twitter-profile-img">
                                <img  src={channel.avatar} />
                                <img className="platform-profile" src="/images/facebook.png"></img>
                            </div>  
                            <div><span className="analytics-header">{channel.name}</span></div>                        
                        </div>
                        <div className="col-md-6 col-xs-12 text-right">
                        <span className="analytics-header">55 Page Likes</span>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-md-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-6 col-xs-12 border-right">
                                    <h3>0</h3>
                                    <p>Page Likes</p>
                                </div>
                                <div className="col-md-6 col-xs-12 border-right">
                                    <h3>0</h3>
                                    <p>Unlikes</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-4 col-xs-12 border-right">
                                    <h3>0</h3>
                                    <p>Posts</p>
                                </div>
                                <div className="col-md-4 col-xs-12 border-right">
                                    <h3>0</h3>
                                    <p>Reactions</p>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                    <h3>0</h3>
                                    <p>Engagement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default FacebookAnalytics;
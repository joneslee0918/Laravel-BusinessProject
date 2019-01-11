import React from 'react';

class TwitterAnalytics extends React.Component {    

    render(){
        return (
            <div className="row twitter-profile-analytics">
                <div className="col-xs-12">
                    <div className="row border-bottom tw-img-followers">
                        <div className="col-md-6 col-xs-12 text-left">
                            <img  src="https://pbs.twimg.com/profile_images/974287695269842944/wx7mGmVd_normal.jpg" />
                        </div>
                        <div className="col-md-6 col-xs-12 text-right">
                            @twitterfollowers
                        </div>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-md-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-6 col-xs-12 border-right">
                                    <h3>4589</h3>
                                    <p>Followers</p>
                                </div>
                                <div className="col-md-6 col-xs-12 border-right">
                                    <h3>4589</h3>
                                    <p>Followers</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="row">
                                <div className="col-md-4 col-xs-12 border-right">
                                    <h3>34</h3>
                                    <p>Tweets</p>
                                </div>
                                <div className="col-md-4 col-xs-12 border-right">
                                    <h3>89</h3>
                                    <p>Likes</p>
                                </div>
                                <div className="col-md-4 col-xs-12">
                                    <h3>12</h3>
                                    <p>Retweets</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default TwitterAnalytics;
import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import {twitterRequestTokenUrl, twitterAccessTokenUrl} from "../../config/api";

class Accounts extends React.Component {
    constructor(props) {
        super(props);
    }

    onFailure = (response) => {
        console.log(response);
    };

    onSuccess = (response) => {
        response.json().then(body => {
            console.log(body);
        });
    };

    render(){
        return (
            <div className="accounts-container">
                <h2>HAVE MORE TWITTER ACCOUNTS?</h2>
                <p>Connect them all, and we'll help you get the right audience.</p>
                
                <div className="accounts-container__logo col-md-1">
                    <div>
                        <i className="fa fa-twitter"></i>
                    </div>
                </div>
                <div className="accounts-container__content col-md-10">
                    <div className="accounts-container__content__wrapper">
                        <div className="accounts-container__content__wrapper__heading">
                            <h2>Let's grow your audience using Twitter!</h2>
                        </div> 
                        <div className="accounts-container__content__wrapper__body">
                            
                            <div className="channel-container">
                                <a href="#" className="block-urls">
                                    <div className="profile-info pull-right">
                                        <img className="pull-left" src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                        <div className="pull-left">
                                            <p className="profile-name">Albert Feka</p>
                                            <p className="profile-username">@Galanx</p>
                                        </div>
                                        <div className="item-actions pull-right">
                                            <i className="fa fa-trash"></i>
                                        </div>
                                    </div>
                                </a>
                            </div>
        
                        </div> 
                    </div> 
        
                    <div className="accounts-container__content__wrapper__footer">
                        <TwitterLogin loginUrl={twitterAccessTokenUrl}
                                    onFailure={this.onFailure} onSuccess={this.onSuccess}
                                    requestTokenUrl={twitterRequestTokenUrl}
                                    showIcon={true}
                                    >
                        </TwitterLogin>
                    </div> 
                </div>
            </div>
        );
    };
} 

export default Accounts;
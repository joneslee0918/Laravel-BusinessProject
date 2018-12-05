import React from 'react';

export default class LinkedInButton extends React.Component{

    requestOAuthToken = () => {
        const redirectUri = this.props.redirectUri;
        const clientId = this.props.clientId;
        
        var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=r_basicprofile&state=123456&redirect_uri=${redirectUri}`;
        var width = 450,
          height = 730,
          left = window.screen.width / 2 - width / 2,
          top = window.screen.height / 2 - height / 2;
    
        window.addEventListener(
          "message",
          (event) => {console.log("fired");
            if (event.data.type === "access_token") {
                
              Alert.success(`Access token obtained: ${event.data.access_token}`,{position:'top'});
            }
          },
          false
        );
    
        window.open(
          oauthUrl,
          "Linkedin",
          "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
            width +
            ", height=" +
            height +
            ", top=" +
            top +
            ", left=" +
            left
        );
      };

      render(){

          return(
            <button className="linkedin-login-btn" onClick={this.requestOAuthToken}>Login with LinkedIn</button>
          );
      }
}
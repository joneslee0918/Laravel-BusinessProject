import React from 'react';
import {getParameterByName} from '../utils/helpers';

export default class LinkedInButton extends React.Component{

    requestOAuthToken = () => {
        const redirectUri = this.props.redirectUri;
        const clientId = this.props.clientId;
        const onSuccess = this.props.onSuccess;
        const onError = this.props.onError;
        
        var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=r_basicprofile,r_emailaddress,w_share&state=123456&redirect_uri=${redirectUri}`;
        var width = 450,
          height = 730,
          left = window.screen.width / 2 - width / 2,
          top = window.screen.height / 2 - height / 2;
    
        const targetWindow = window.open(
          oauthUrl,
          "Linkedin",
          "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=" +
            width +
            ",height=" +
            height +
            ",top=" +
            top +
            ",left=" +
            left
        );

        var targetInterval = setInterval(function(){

          if(targetWindow.document.domain === window.document.domain){
            if(targetWindow.location.pathname == "/redirect"){
              
              const token = getParameterByName("accessToken", targetWindow.location.href);
              
              if(token){
                onSuccess({
                  "accessToken": token
                });
              }else{
                onError({
                  "error" : "Something went wrong."
                });
              }

              targetWindow.close();
              clearInterval(targetInterval);
            }
          }

        }, 1000);
      };

      render(){
          const {cssClass, icon} = this.props;
          const btnClass = cssClass ? cssClass : "linkedin-login-btn";
          const btnChild = icon ? icon : "Login with LinkedIn"
          return(
            <button className={btnClass} onClick={this.requestOAuthToken}>{btnChild}</button>
          );
      }
}
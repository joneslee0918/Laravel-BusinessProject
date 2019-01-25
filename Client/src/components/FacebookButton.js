import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookButton = ({appId, onSuccess, icon=undefined, cssClass=undefined, textButton=undefined}) => (
    <FacebookLogin
        appId={appId}
        autoLoad={false}
        fields="name,email,picture"
        scope="manage_pages,publish_pages,pages_show_list,publish_to_groups,public_profile,email,read_insights,user_likes"
        callback={onSuccess}
        icon={icon}
        cssClass={cssClass}
        textButton={textButton} />
);

export default FacebookButton;
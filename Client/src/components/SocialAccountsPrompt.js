import React from 'react'
import {NavLink} from 'react-router-dom';

const SocialAccountsPrompt = ({image, title, description, buttonTitle, buttonLink}) => (
    <div className="social-account-prompt">
        <img src={image} />
        <h1>{title}</h1>
        <p>{description}</p>

        <h5>{buttonTitle}</h5>
        <NavLink to={buttonLink}><button className="magento-btn">Get Started</button></NavLink>
    </div>
);

export default SocialAccountsPrompt;
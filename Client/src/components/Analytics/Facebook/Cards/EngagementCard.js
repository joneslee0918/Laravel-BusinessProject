import React from 'react';

const EngagementCard = ({name, reactions, comments, shares}) => 

    (
        <div className="overview-card analytics-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="eng-card-section">
                <span className="anl-desc card-description">Reactions</span>
                <span className="anl-count">{reactions}</span>
            </div>
            <div className="eng-card-section eng-card-section-middle">
                <span className="anl-desc card-description">Comments</span>
                <span className="anl-count">{comments}</span>
            </div>
            <div className="eng-card-section">
                <span className="anl-desc card-description">Shares</span>
                <span className="anl-count">{shares}</span>
            </div>
        </div>
    );

export default EngagementCard;
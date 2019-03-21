import React from 'react';

const EngagementCard = ({name, count, description, growth}) => 

    (
        <div className="overview-card analytics-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="eng-card-section">
                <span className="anl-desc card-description">Reactions</span>
                <span className="anl-count">10</span>
            </div>
            <div className="eng-card-section eng-card-section-middle">
                <span className="anl-desc card-description">Comments</span>
                <span className="anl-count">10</span>
            </div>
            <div className="eng-card-section">
                <span className="anl-desc card-description">Shares</span>
                <span className="anl-count">10</span>
            </div>
        </div>
    );

export default EngagementCard;
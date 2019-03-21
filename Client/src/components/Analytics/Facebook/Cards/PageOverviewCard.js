import React from 'react';

const PageOverviewCard = ({name, count, description}) => 

    (
        <div className="overview-card analytics-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="card-analytics-body anl-post-page">
                <span className="anl-desc card-description">{description}</span><span className="anl-count">{count}</span>
            </div>
        </div>
    );

export default PageOverviewCard;
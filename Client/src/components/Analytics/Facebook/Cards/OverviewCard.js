import React from 'react';

const OverviewCard = ({name, count, description, growth}) => 

    (
        <div className="overview-card analytics-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="card-analytics-body">
                <div className="card-number">{count}</div>
                <div className="card-description">{description}</div>
            </div>
            <div className="card-footer">
            <i className="fa fa-arrow-up"></i> {growth}
            </div>
        </div>
    );

export default OverviewCard;
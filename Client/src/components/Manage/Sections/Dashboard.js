import React from 'react';

const Dashboard = () => (
    <div>
        <h2>DASHBOARD</h2>

        <div className="row">
            <div className="col-xs-12">

                <ul className="dashboard-info shadow-box">
                    <li>
                        <p className="title">Followers</p>
                        <p className="count">200k</p>
                        <p className="description">People who follow you</p>
                    </li>
                    <li>
                        <p className="title">You follow</p>
                        <p className="count">130k</p>
                        <p className="description">People you follow</p>
                    </li>
                    <li>
                        <p className="title">Tweets</p>
                        <p className="count">600</p>
                        <p className="description">The tweets you posted</p>
                    </li>
                    <li>
                        <p className="title">Info</p>
                        <p className="description text-only">Lorem ipsum dolor sit amet, lor ipsum dolor sit amet</p>
                    </li>

                </ul>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-12">
                <div className="col-xs-12 col-md-8 shadow-box">
                    Chart coming soon...
                </div>
                <div className="col-xs-12 col-md-4 shadow-box">
                    Chart coming soon...
                </div>
            </div>
        </div>
    </div>
);

export default Dashboard;

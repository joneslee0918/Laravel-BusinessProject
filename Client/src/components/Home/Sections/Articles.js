import React from 'react';

export default class Articles extends React.Component {
    render(){
        return(
            <div>
                <div className="card-display">
                    <div className="card-content">
                        <img className="card-img-top" src="https://cdn.vox-cdn.com/thumbor/vVLqdTQ5GNop1f9rLGm7AqXjRuE=/0x0:1436x707/1200x675/filters:focal(503x195:731x423)/cdn.vox-cdn.com/uploads/chorus_image/image/60757935/Screen_Shot_2018_08_07_at_5.22.34_PM.0.png" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            <div className="center-inline">
                                <button className="upgrade-btn">Share</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-display">
                    <div className="card-content">
                        <img className="card-img-top" src="https://imgix.ranker.com/video_img/1/1538/original/best-action-anime-u1?w=400&h=225&fm=jpg&q=50" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                            <div className="center-inline">
                                <button className="upgrade-btn">Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';

const Article = ({article}) => (

    <div className="card-display">
        <div className="card-content">
            <a target="_blank" href={article.url}>
                <img className="card-img-top" onError={(e) => e.target.src='/images/no-image-box.png'} src={article.image_url} />
            </a>
            <div className="card-body">
                <a target="_blank" href={article.url}>
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <p className="card-text"><small className="text-muted">{article.source_url}</small></p>
                </a>
                <div className="center-inline">
                    <button className="upgrade-btn">Share</button>
                </div>
            </div>
        </div>
    </div>
);

export default Article;
import React from 'react';

const Article = ({article, setPost}) => (

    <div className="card-display">
        <div className="card-content">
            <a target="_blank" href={article.url}>
                <img className="card-img-top" onError={(e) => e.target.src='/images/no-image-box.png'} src={article.image_url ? article.image_url : '/images/no-image-box.png'} />
            </a>
            <div className="card-body">
                <a target="_blank" href={article.url}>
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <p className="card-text"><small className="text-muted">{article.source_url}</small></p>
                </a>
                <div className="center-inline">
                    <button onClick={() => setPost(
                        {
                         content: `${article.description} ${article.url}`,
                         images: [],
                         type: 'store'
                        }) } className="upgrade-btn" data-toggle="modal" data-target="#compose">Share</button>
                </div>
            </div>
        </div>
    </div>
);

export default Article;
import React from 'react';
import {connect} from 'react-redux';

const Article = ({article, setPost, postedArticle}) => {
    if(article.posted == null){

        if(typeof(postedArticle) !== "undefined" && typeof(postedArticle.articleId) !== "undefined"){

            if(typeof(postedArticle.posted) !== "undefined" && postedArticle.articleId == article.id){
                article.posted = postedArticle.posted;
            }
        }
    }

    return (<div className="card-display">
            <div className="card-content">
                <a target="_blank" href={article.url}>
                    <img className="card-img-top" onError={(e) => e.target.src='/images/no-image-box.png'} src={article.image_url ? article.image_url : '/images/no-image-box.png'} />
                </a>
                <div className="card-body">
                    <a target="_blank" href={article.url}>
                        <h5 className="card-title">{`${article.title} `} 
                            {article.posted != null ? (article.posted ? 
                                
                                <span className="alert-success pull-right p10">POSTED</span> : 
                                <span className="alert-info pull-right p10">SCHEDULED</span>) : "" }
                        </h5>
                        <p className="card-text">{article.description}</p>
                        <p className="card-text"><small className="text-muted">{article.source_url}</small></p>
                    </a>
                    <div className="center-inline">
                        <button onClick={() => setPost(
                            {
                            content: `${article.description} ${article.url}`,
                            images: [],
                            type: 'store',
                            refresh: false,
                            articleId: article.id
                            }) } className="upgrade-btn" data-toggle="modal" data-target="#compose">
                            
                            Share
                            
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        postedArticle: state.posts.article
    }
}

export default connect(mapStateToProps)(Article);
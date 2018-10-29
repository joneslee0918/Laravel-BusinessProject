import React from 'react';
import Article from './Article';
import {getArticles} from '../../../requests/articles';

export default class Articles extends React.Component {

    state = {
        articles: []
    }

    componentDidMount(){
        getArticles()
        .then((response) => {
            this.setState(() => ({
                articles: response.data
            }));
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        return(
            <div>

                {!!this.state.articles.length &&
                    this.state.articles.map( article => {

                        return (
                            <Article key={article.id} article={article} />
                        );
                    })
                }

            </div>
        );
    }
}
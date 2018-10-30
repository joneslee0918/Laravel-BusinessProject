import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Article from './Article';
import {getArticles} from '../../../requests/articles';
import Loader from '../../Loader';

export default class Articles extends React.Component {

    state = {
        articles: [],
        loading: false,
        page: 0
    }

    componentDidMount(){
        this.loadArticles();
    }

    loadArticles = () => {
        let page = this.state.page + 1;
        this.setState(() => ({
            loading: true
        }));
        getArticles(page)
        .then((response) => {
            this.setState((prevState) => ({
                articles: [...prevState.articles, ...response.data],
                loading: false,
                page
            }));
        }).catch((error) => {
            this.setState(() => ({
                loading: false
            }));
        });
    }

    render(){   
        return(
            <div>
                {this.state.loading && <Loader />}
                <h4 className="center-inline">Articles based on your choice of <a className="link-cursor">topics</a></h4>
                <br/>
                {!!this.state.articles.length &&
                    this.state.articles.map( article => {

                        return (
                            <Article key={article.id} article={article} />
                        );
                    })
                }

                <BottomScrollListener onBottom={this.loadArticles} />
            </div>
        );
    }
}
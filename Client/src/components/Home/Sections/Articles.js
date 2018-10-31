import React from 'react';
import {connect} from 'react-redux';
import Modal from "react-modal";
import BottomScrollListener from 'react-bottom-scroll-listener';
import Article from './Article';
import {updateProfile} from "../../../requests/profile";
import {getArticles} from '../../../requests/articles';
import {startSetProfile} from '../../../actions/profile';
import {setPost} from '../../../actions/posts';
import {ArticleLoader} from '../../Loader';

class Articles extends React.Component {

    state = {
        articles: [],
        loading: false,
        topics: [],
        topic: "",
        isTopicsModalOpen: false,
        page: 0
    }

    componentDidMount(){
        this.initializeTopics();
        this.loadArticles();
    }

    initializeTopics = () => {
        if(this.props.profile){
            const topics = this.props.profile.topics;

            let stateCopy = Object.assign({}, this.state);
            stateCopy["topics"] = topics.map((topic) => topic.topic);
            this.setState(() => (stateCopy));
        }
    };

    loadArticles = (pageNumber = false) => {
        let page = pageNumber ? pageNumber : this.state.page + 1;
        this.setState(() => ({
            loading: true
        }));
        getArticles(page)
        .then((response) => {
            if(page < 2){
                this.setState(() => ({
                    articles: [...response.data],
                    loading: false,
                    page
                }));
            }else{
                this.setState((prevState) => ({
                    articles: [...prevState.articles, ...response.data],
                    loading: false,
                    page
                }));
            }
        }).catch((error) => {
            this.setState(() => ({
                loading: false
            }));
        });
    };

    toggleTopicsModal = () => {
        this.setState(() => ({
            isTopicsModalOpen: !this.state.isTopicsModalOpen
        }));
    };

    onTopicsFieldChange = (topic) => {
        this.setState(() => ({
            topic
        }));
    };

    onTopicsSave = () => {

        this.setState(() => ({
            isTopicsModalOpen: false,
            loading: true
        }));

        updateProfile({
            topics: this.state.topics
        }).then((response) => {
            this.props.startSetProfile().then((response) => {
                this.loadArticles(1);
            });
            this.setState(() => ({
                loading: false
            }));
        }).catch((error) => {
            console.log(error);
            this.setState(() => ({
                loading: false
            }));
        });
    };

    addTopic = (e) => {
        e.preventDefault();
        if(this.state.topic){
            this.setState((prevState) => {
                return {
                    topics: [
                        ...prevState.topics.filter(topic => topic !== prevState.topic),
                        prevState.topic
                    ],
                    topic: ""}
            });
        }
    };

    removeTopic = (index) => {
        let topics = [...this.state.topics];
        topics.splice(index, 1);

        this.setState(() => ({
            topics
        }));
    };

    render(){   
        return(
            <div>
                <Modal
                    isOpen={this.state.isTopicsModalOpen}
                    ariaHideApp={false}
                    >       
                    <form onSubmit={(e) => this.addTopic(e)}>  
                        <div className="form-group flex_container-center">
                            <div>
                                {this.state.topics.length >= 15 ?
                                    <input disabled type="text" className="form-control" onChange={(e) => this.onTopicsFieldChange(e.target.value)} value={this.state.topic} placeholder="food, pets, fashion..." /> 
                                :
                                    <input type="text" className="form-control" onChange={(e) => this.onTopicsFieldChange(e.target.value)} value={this.state.topic} placeholder="food, pets, fashion..." /> 
                                }
                                
                            </div>
                            <div>
                                <button className="btn btn-default right-radius">Add</button>
                            </div>
                        </div>
                    </form>

                        
                        {!!this.state.topics.length && this.state.topics.map((topic, index) => (
                        <div key={index} className="addedItemLabels">{topic} <span className="fa fa-times link-cursor" onClick={() => this.removeTopic(index)}></span></div>  
                        ))}
                        
                        <div className="center-inline top-border p10 m10-top">
                            <button className="upgrade-btn" onClick={this.onTopicsSave}>Save</button>
                        </div>
                </Modal>
                
                {!(!!this.state.articles.length) && this.state.loading && 
                    <div><ArticleLoader /><ArticleLoader /></div>}
                { !!this.state.articles.length ?                 
                    <div>

                        <h4 className="center-inline">Articles based on your choice of <a onClick={this.toggleTopicsModal} className="link-cursor">topics</a></h4>
                        {this.state.loading && <ArticleLoader />}
                        <br/>

                        {!!this.state.articles.length &&
                            this.state.articles.map( (article, index) => {

                                return (
                                    <div key={index}>
                                    <Article key={index} article={article} setPost={this.props.setPost}/>
                                    </div>
                                );
                            })
                        }
                        {this.state.loading && <ArticleLoader />}
                        <BottomScrollListener onBottom={this.loadArticles} /> 
                    </div>
                :   
                    
                    <div className="initial-topics">
                    {this.state.loading && <ArticleLoader />}
                        {!this.state.loading &&
                            <div>
                                <p>Please set your topics to view articles of your interest.</p>
                                <button className="upgrade-btn" onClick={this.toggleTopicsModal}>Set Topics</button>
                            </div> 
                        }

                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetProfile: () => dispatch(startSetProfile()),
    setPost: (post) => dispatch(setPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
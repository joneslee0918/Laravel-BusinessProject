import React from 'react';
import Loader from 'react-loader-spinner';
import { pageInsightsByType } from "../../../../requests/linkedin/channels";
import ReadMore from "../../../ReadMore";

class PostsTable extends React.Component{
    state = {
        posts: null,
        loading: false
    };

    componentDidMount(){
        this.fetchAnalytics();
    };

    componentDidUpdate(prevProps){
        if(prevProps.selectedAccount != this.props.selectedAccount || prevProps.calendarChange != this.props.calendarChange)
        {
            this.fetchAnalytics();
        }  
    }

    fetchAnalytics = () => {
        this.setState(() => ({
            loading: true
        }));
        try {
            pageInsightsByType(this.props.selectedAccount, this.props.startDate, this.props.endDate, this.props.type)            
            .then((response) => {
                this.setState(() => ({
                    posts: response,
                    loading: false
                }));
            }).catch(error => {
                this.setState(() => ({
                    loading: false
                }));
                return Promise.reject(error);
            }); 
        } catch (error) {
            
        }
        
    };

    render(){
        const {name} = this.props;
        return (
        <div className="overview-card">
            <div className="card-header">
                <img className="card-img" src="/images/linkedin-logo.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="card-table">
                <div className="table-loader-style">{this.state.loading && <Loader type="Bars" color="#46a5d1" height={70} width={70} />}</div>
                {this.state.posts != null &&
                <table className="table anl-posts-table">
                    <thead>
                        <tr>
                            <th className="anl-posts-table-th-first">Date</th>
                            <th className="anl-posts-table-th-second">Message</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Shares</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post, index)=> (
                            <tr key={index}>
                                <td className="anl-posts-table-th-first" scope="row">
                                    <div className="post-table-images">
                                        <img className="pt-page-img" src="/images/uniclix.png" />
                                        <img className="pt-page-facebook" src="/images/linkedin-logo.png"></img>
                                    </div>
                                    <div className="post-table-page-date">
                                        <p className="pt-page-name">UniClix</p>
                                        <p className="pt-post-date">{post.date}</p>
                                    </div>
                                </td>
                                <td className="anl-posts-table-th-second"><ReadMore characters={400}>{post.message ? post.message : ''}</ReadMore></td>
                                <td>{post.likes}</td>
                                <td>{post.comments}</td>
                                <td>{post.shares}</td>                            
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
        );
    }
}

export default PostsTable;
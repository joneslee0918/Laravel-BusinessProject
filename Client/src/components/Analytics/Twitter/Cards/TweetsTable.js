import React from 'react';
import Loader from 'react-loader-spinner';
import { pageInsightsByType } from "../../../../requests/twitter/channels";
import ReadMore from "../../../ReadMore";
import AnalyticsTooltip from '../../AnalyticsTooltip'

class TweetsTable extends React.Component{
    state = {
        tweets: null,
        loading: false
    };

    componentDidMount(){
        this.fetchAnalytics();
    };

    componentDidUpdate(prevProps){
        if(prevProps.selectedAccount != this.props.selectedAccount || prevProps.calendarChange != this.props.calendarChange)
        {
            this.fetchAnalytics();
            console.log(this.props.selectedAccount);
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
                    tweets: response,
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
                <img className="card-img" src="/images/twitter.png"></img> {name}
                    <AnalyticsTooltip tooltipDesc={this.props.tooltipDesc} />
            </div>
            <div className="card-table">
                <div className="table-loader-style">{this.state.loading && <Loader type="Bars" color="#46a5d1" height={70} width={70} />}</div>
                {this.state.tweets !=null &&
                <table className="table anl-posts-table">
                    <thead>
                        <tr>
                            <th className="anl-posts-table-th-first">Date</th>
                            <th className="anl-posts-table-th-second">Message</th>
                            <th>Retweets</th>
                            <th>Replies</th>
                            <th>Likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tweets.map((tweet, index)=> (
                            <tr key={index}>
                                <td className="anl-posts-table-th-first">
                                    <div className="post-table-images">
                                        <img className="pt-page-img" src="/images/uniclix.png" />
                                        <img className="pt-page-facebook" src="/images/twitter.png"></img>
                                    </div>
                                    <div className="post-table-page-date">
                                        <p className="pt-page-name">UniClix</p>
                                        <p className="pt-post-date">{tweet.date}</p>
                                    </div>
                                </td>
                                <td className="anl-posts-table-th-second">{tweet.text}</td>
                                <td>{tweet.retweet_count}</td>
                                <td>0</td>
                                <td>{tweet.favorite_count}</td>                            
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
        );
    }
}

export default TweetsTable;
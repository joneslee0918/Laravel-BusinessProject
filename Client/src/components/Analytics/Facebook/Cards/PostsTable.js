import React from 'react';

const PostsTable = ({name, data}) => 

    (
        <div className="overview-card">
            <div className="card-header">
                <img className="card-img" src="/images/facebook.png"></img> {name}
                <i className="fa fa-question-circle" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
            </div>
            <div className="card-table">
                <table className="table anl-posts-table">
                    <thead>
                        <tr>
                            <th className="anl-posts-table-th-first">Date</th>
                            <th className="anl-posts-table-th-second">Message</th>
                            <th>Reactions</th>
                            <th>Comments</th>
                            <th>Shares</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((post, index)=> (
                            <tr key={index}>
                                <th scope="row">
                                    <div className="post-table-images">
                                        <img className="pt-page-img" src="/images/uniclix.png" />
                                        <img className="pt-page-facebook" src="/images/facebook.png"></img>
                                    </div>
                                    <div className="post-table-page-date">
                                        <p className="pt-page-name">UniClix</p>
                                        <p className="pt-post-date">{post.date}</p>
                                    </div>
                                </th>
                                <td className="anl-posts-table-th-second">{post.message}</td>
                                <td>{post.reactions}</td>
                                <td>{post.comments}</td>
                                <td>{post.shares}</td>                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

export default PostsTable;
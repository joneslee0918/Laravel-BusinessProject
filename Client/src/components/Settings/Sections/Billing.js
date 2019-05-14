import React from 'react';

class Billing extends React.Component{

    render(){
        return(
            <div className="flex-container flex-space-between pricing-table">
                <table className="table table-striped flex-center">
                    <tbody>
                        <tr>
                            <th scope="col" className="empty-td"></th>
                            <th scope="col" className={`plan plan-free`}>Free</th>
                            <th scope="col" className={`plan plan-basic`}>Basic $10</th>
                            <th scope="col" className={`plan plan-plus animated wobble`}>Plus $15</th>
                            <th scope="col" className={`plan plan-premium`}>Premium $35</th>
                            <th scope="col" className={`plan plan-pro`}>Pro $70</th>
                            <th scope="col" className={`plan plan-agency`}>Agency $140</th>
                            <th scope="col" className={`plan plan-twitter-growth`}>Twitter Growth $9.99</th>
                        </tr>
                    
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Social Accounts</td>
                            <td>1</td>
                            <td>6</td>
                            <td>10</td>
                            <td>25</td>
                            <td>50</td>
                            <td>100</td>
                            <td>Recommended Followers</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Post Limitation</td>
                            <td>10 posts per account </td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Unlimited</td>
                            <td>Recommended Unfollowers</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Schedule and Publish</td>
                            <td>Limited</td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td>Target Audience</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Content Curation</td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td>Clear Inactive Users</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Mentions</td>
                            <td><i className="fa fa-close pink-cross"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td>Reply to Followers</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Social Listening & Monitoring</td>
                            <td><i className="fa fa-close pink-cross"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td>Mentions</td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Analytics</td>
                            <td>Limited</td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="feature-category"><i className="fa fa-angle-right"></i>Advanced schedule</td>
                            <td><i className="fa fa-close pink-cross"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td><i className="fa fa-check green-check"></i></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="empty-td"></td>
                            <td><button className="plan-btn">Sign up</button></td>
                            <td><button className="plan-btn">Free 30 Days Trial</button></td>
                            <td><button className="plan-btn">Free 30 Days Trial</button></td>
                            <td><button className="plan-btn">Free 30 Days Trial</button></td>
                            <td><button className="plan-btn">Buy Now</button></td>
                            <td><button className="plan-btn">Buy Now</button></td>
                            <td><button className="plan-btn">Free 30 Days Trial</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Billing;
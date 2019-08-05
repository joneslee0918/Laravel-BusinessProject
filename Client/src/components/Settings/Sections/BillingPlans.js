import React from 'react';
import {getPlanData} from '../../../requests/billing';
import Loader from '../../Loader';

class BillingPlans extends React.Component {
    state = {
        allPlans: []
    }

    componentDidMount() {
        getPlanData().then(response => {
            this.setState({
                allPlans: response.allPlans
            });
        });
    }

    render() {
        const {allPlans} = this.state;
        return (
            <div>
                {allPlans.length > 0 ? 
                <div className="compare-plans-table-container">
                    <table className="compare-plans-table">
                        <thead>
                            <tr>

                                <th>
                                </th>
                                {allPlans.map((plan, index) => {
                                    return (
                                        <th key={`${index}-1`}>
                                            <h5>{plan["Name"]}</h5>
                                            <a className="btn plan-price-btn" data-period="annually" href="#">Start trial</a>
                                        </th>
                                    );
                                })}

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Monthly</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Monthly"] > 0)
                                       return <td key={`${index}-2`}>${plan["Monthly"]}</td>
                                    else
                                       return <td key={`${index}-2`}></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Annual Billing</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Annual Billing"] > 0)
                                        return <td key={`${index}-3`}>${plan["Annual Billing"]}</td>
                                    else
                                        return <td key={`${index}-3`}></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Social Accounts</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-4`}>{plan["Social Accounts"]}</td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Users</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-5`}>{plan["Users"]}</td>
                                })}
                                
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Post Limitation</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-6`} className="plan-table-text">{plan["Post Limitation"]}</td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Schedule and Publish</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Schedule and Publish"] === 'Limited')
                                        return <td key={`${index}-7`} className="plan-table-text">{plan["Schedule and Publish"]}</td>
                                    else
                                        return <td key={`${index}-7`}><img src="/images/plan-success.svg" /></td>
                                })} 
                            </tr>

                            <tr className="grey-tr">
                                <td className="fs14 text-left">Content Curation</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Content Curation"] === 'Limited')
                                        return <td key={`${index}-8`} className="plan-table-text">{plan["Content Curation"]}</td>
                                    else
                                        return <td key={`${index}-8`}><img src="/images/plan-success.svg" /></td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Mentions</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Mentions"])
                                        return <td key={`${index}-9`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-9`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Social Listening & Monitoring</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Social Listening & Monitoring"])
                                        return <td key={`${index}-10`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-10`}><img src="/images/plan-success.svg" /></td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Analytics</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Analytics"] === 'Limited')
                                        return <td key={`${index}-11`} className="plan-table-text">{plan["Analytics"]}</td>
                                    else
                                        return <td key={`${index}-11`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Advanced Schedule</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Advanced Schedule"])
                                        return <td key={`${index}-12`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-12`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Create and Manage Draft Posts</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Create and Manage Draft Posts"])
                                        return <td key={`${index}-13`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-13`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Team: Invite Additional Users</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Team: Invite Additional Users"])
                                        return <td key={`${index}-14`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-14`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Approval Workflow</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Approval Workflow"])
                                        return <td key={`${index}-15`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-15`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                </th>

                                {allPlans.map((plan, index) => {
                                    return (
                                        <th key={`${index}-16`}>
                                            <h5>{plan["Name"]}</h5>
                                            <a className="btn plan-price-btn" href="#">Start trial</a>
                                        </th>)
                                })}
                                
                            </tr>
                        </thead>
                    </table>
                </div> : <Loader />}
            </div>
        );
    }
}

export default BillingPlans;
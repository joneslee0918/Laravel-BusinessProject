import React from 'react';
import { connect } from 'react-redux';
import { startSetProfile } from "../../../actions/profile";
import { changePlan, getPlanData } from '../../../requests/billing';
import UpgradeAlert from '../../UpgradeAlert';
import Loader from '../../Loader';

class BillingPlans extends React.Component {
    state = {
        allPlans: [],
        error: 'Please delete some accounts to correspond to the limits of your new plan.',
        redirect: '/accounts'
    }

    componentDidMount() {
        getPlanData().then(response => {
            this.setState({
                allPlans: response.allPlans
            });
        });
    }

    onPlanClick = (plan) => {
        changePlan(plan).then(response => {
            this.props.startSetProfile();
        }).then()
            .catch(error => {
                if (error.response.status === 403) {
                    this.setState(() => ({
                        forbidden: true,
                        error: error.response.data.error,
                        redirect: error.response.data.redirect  
                    }))
                } else {
                    this.setError("Something went wrong!");
                }
            });
    };

    setForbidden = (forbidden = false) => {
        this.setState(() => ({
            forbidden
        }));
    };

    render() {
        const {allPlans} = this.state;
        const {profile} = this.props;
        return (
            <div>
                <UpgradeAlert
                    isOpen={this.state.forbidden}
                    setForbidden={this.setForbidden}
                    title="Change required"
                    confirmBtn="Accounts"
                    text={this.state.error}
                    type="info"
                    redirectUri={this.state.redirect}
                />
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
                                            {   profile.role.name === plan["Name"].toLowerCase() ?
                                                <a className="btn plan-price-btn disabled-btn" data-period="annually" href="javascript:void();">Start trial</a>
                                                :
                                                <a className="btn plan-price-btn" data-period="annually" onClick={() => this.onPlanClick(plan["Name"].toLowerCase())} href="javascript:void();">Start trial</a>
                                            }
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
                                       return <td key={`${index}-2`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>${plan["Monthly"]}</td>
                                    else
                                       return <td key={`${index}-2`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Annual Billing</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Annual Billing"] > 0)
                                        return <td key={`${index}-3`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>${plan["Annual Billing"]}</td>
                                    else
                                        return <td key={`${index}-3`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Social Accounts</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-4`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Social Accounts"]}</td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Users</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-5`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Users"]}</td>
                                })}
                                
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Post Limitation</td>
                                {allPlans.map((plan, index) => {
                                    return <td key={`${index}-6`} className={`plan-table-text ${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Post Limitation"]}</td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Schedule and Publish</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Schedule and Publish"] === 'Limited')
                                        return <td key={`${index}-7`} className={`plan-table-text ${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Schedule and Publish"]}</td>
                                    else
                                        return <td key={`${index}-7`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })} 
                            </tr>

                            <tr className="grey-tr">
                                <td className="fs14 text-left">Content Curation</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Content Curation"] === 'Limited')
                                        return <td key={`${index}-8`} className={`plan-table-text ${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Content Curation"]}</td>
                                    else
                                        return <td key={`${index}-8`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Mentions</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Mentions"])
                                        return <td key={`${index}-9`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-9`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Social Listening & Monitoring</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Social Listening & Monitoring"])
                                        return <td key={`${index}-10`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-10`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Analytics</td>
                                {allPlans.map((plan, index) => {
                                    if(plan["Analytics"] === 'Limited')
                                        return <td key={`${index}-11`} className={`plan-table-text ${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}>{plan["Analytics"]}</td>
                                    else
                                        return <td key={`${index}-11`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Advanced Schedule</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Advanced Schedule"])
                                        return <td key={`${index}-12`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-12`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Create and Manage Draft Posts</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Create and Manage Draft Posts"])
                                        return <td key={`${index}-13`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-13`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr className="grey-tr">
                                <td className="fs14 text-left">Team: Invite Additional Users</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Team: Invite Additional Users"])
                                        return <td key={`${index}-14`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-14`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
                                })}
                                
                            </tr>
                            <tr>
                                <td className="fs14 text-left">Approval Workflow</td>
                                {allPlans.map((plan, index) => {
                                    if(!plan["Approval Workflow"])
                                        return <td key={`${index}-15`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/red-x.svg" /></td>
                                    else
                                        return <td key={`${index}-15`} className={`${profile.role.name === plan["Name"].toLowerCase() && "disabled-btn"}`}><img src="/images/plan-success.svg" /></td>
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
                                            {   profile.role.name === plan["Name"].toLowerCase() ?
                                                <a className="btn plan-price-btn disabled-btn" data-period="annually" href="javascript:void();">Start trial</a>
                                                :
                                                <a className="btn plan-price-btn" data-period="annually" onClick={() => this.onPlanClick(plan["Name"].toLowerCase())} href="javascript:void();">Start trial</a>
                                            }
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

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetProfile: () => dispatch(startSetProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingPlans);
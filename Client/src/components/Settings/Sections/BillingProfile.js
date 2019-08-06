import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startSetProfile } from "../../../actions/profile";
import { changePlan, activateAddon, cancelAddon, getPlanData } from '../../../requests/billing';
import Loader from '../../Loader';


class BillingProfile extends React.Component {
    
    state = {
        allPlans: [],
        billingPeriod: "annually"
    }

    componentDidMount() {
        getPlanData().then(response => {
            this.setState({
                allPlans: response.allPlans
            });
        });
    }

    onAddonClick = (addon) => {
        activateAddon(addon).then(response => {
            this.props.startSetProfile();
        });
    };

    onAddonCancel = (addon) => {
        cancelAddon(addon).then(response => {
            this.props.startSetProfile();
        });
    };

    setBillingPeriod = () => {
        this.setState(() => ({billingPeriod: this.state.billingPeriod === "annually" ? "monthly" : "annually"}));
    };

    render(){
       const {allPlans} = this.state;
       const {profile} = this.props;
       let planData = allPlans.filter(plan => plan["Name"].toLowerCase() === profile.role.name);
       planData = planData.length > 0 ? planData[0] : false;
       console.log(planData);

       return (
            <div>
                {!!planData ? <div className="shadow-box main-content-style">
                    <h3>Plan Type</h3>

                    <div className="col-md-12">
                        <div className="col-md-6">
                            <div className="col-md-12">
                                <h5>Selected Plan</h5>
                                <h5 className="magento-color">{planData["Name"]}</h5>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="col-md-12">
                                <h5>Change Plan Type</h5>
                                <p>You can upgrade or downgrade your base plan type anytime</p>
                                <NavLink to="/settings/billing/plans"><button className="default-white-btn">Change plan type</button></NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="clearer clearfix">
                        <h5>What's included</h5>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>{planData["Social Accounts"]} Social accounts</p>
                            </div>
                        </div>

                        {(planData["Name"] === "Premium" || planData["Name"] === "Pro" || planData["Name"] === "Agency")&&
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>{planData["Users"]} Users</p>
                            </div>
                        </div>}

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>{planData["Post Limitation"]} Posts per account</p>
                            </div>
                        </div>

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Schedule and Publish</p>
                            </div>
                        </div>}

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Content Curation</p>
                            </div>
                        </div>}

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Mentions</p>
                            </div>
                        </div>}

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Listening</p>
                            </div>
                        </div>}

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Analytics</p>
                            </div>
                        </div>}

                        {planData["Name"] !== "Free" && 
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Advanced Schedule</p>
                            </div>
                        </div>}

                        {(planData["Name"] === "Premium" || planData["Name"] === "Pro" || planData["Name"] === "Agency")&&
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Draft Posts</p>
                            </div>
                        </div>}

                        {(planData["Name"] === "Premium" || planData["Name"] === "Pro" || planData["Name"] === "Agency")&&
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Team users</p>
                            </div>
                        </div>}

                        {(planData["Name"] === "Premium" || planData["Name"] === "Pro" || planData["Name"] === "Agency")&&
                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Approval workflow</p>
                            </div>
                        </div>}
                    </div>

                    {planData["Name"] !== "Free" &&<div className="seperator"></div>}

                    {planData["Name"] !== "Free" && <div className="">
                        <div className="box billing channels-box">

                            <div className="col-md-12 mb20">
                                <h5>Billing Cycle</h5>
                            </div>
                            
                            <div className="plan-box col-md-6 col-xs-12">
                                <div className={`billingPeriodSelection col-md-12 ${this.state.billingPeriod === 'annually' && 'selected'}`}>

                                    <label className="custom-radio-container">Annually
                                        
                                        <input type="radio" name="billingPeriod" checked={this.state.billingPeriod === "annually" ? "checked" : false} onChange={this.setBillingPeriod}/>
                                    
                                        <span className="checkmark"></span>
                                    </label>

                                    <p>${parseFloat(planData["Annual Billing"] / 12).toFixed(1)} / month</p>
                                    <p>Billing annually for $400.00</p>
                                </div>
                            </div>
                            <div className="plan-box col-md-6 col-xs-12">
                                <div className={`billingPeriodSelection col-md-12 ${this.state.billingPeriod === 'monthly' && 'selected'}`}>

                                    <label className="custom-radio-container">Monthly
                                        
                                        <input type="radio" name="billingPeriod" checked={this.state.billingPeriod === "monthly" ? "checked" : false} onChange={this.setBillingPeriod}/>
                                    
                                        <span className="checkmark"></span>
                                    </label>

                                    <p>${parseFloat(planData["Monthly"]).toFixed(1)} / month</p>
                                    <p>Billing monthly for $50.00</p> 
                                </div>
                            </div>
                        </div>
                    </div>}

                    {planData["Name"] !== "Free" && 
                    <div className="col-md-12">
                        <button className="magento-btn mt20 small-btn">Cancel plan</button>
                    </div>}
                    
                </div>                
                :
                <Loader />
                }

                <div className="shadow-box main-content-style">
                    <h3>Twitter Growth</h3>

                    <div className="col-md-12">
                        <h5>What's included</h5>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Recommended Followers</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Recommended Unfollowers</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Targeted Audience</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Clear Inactive Users</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Reply to Followers</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Mentions</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        {   profile.roleAddons.length > 0 && profile.roleAddons[0].name === "twitter_growth" ?
                            <button className="magento-btn mt20 small-btn" onClick={() => this.onAddonCancel('twitter_growth')}>Cancel addon</button>
                            :
                            <button className="magento-btn mt20 small-btn" onClick={() => this.onAddonClick('twitter_growth')}>Purchase addon</button>
                        }
                    </div>
                    
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingProfile);
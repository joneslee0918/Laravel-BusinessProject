import React from 'react';
import {NavLink} from 'react-router-dom';

class BillingProfile extends React.Component {
    
    render(){
       return (
            <div>
                <div className="shadow-box main-content-style">
                    <h3>Plan Type</h3>

                    <div className="col-md-12">
                        <div className="col-md-6">
                            <div className="col-md-12">
                                <h5>Selected Plan</h5>
                                <h5 className="magento-color">Premium</h5>
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

                    <div className="col-md-12">
                        <h5>What's included</h5>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button className="magento-btn mt20 small-btn">Cancel plan</button>
                    </div>
                    
                </div>

                <div className="shadow-box main-content-style">
                    <h3>Twitter Growth</h3>

                    <div className="col-md-12">
                        <h5>What's included</h5>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="included-feature">
                                <img src="/images/plan-success.svg" />
                                <p>Social Streaming</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button className="magento-btn mt20 small-btn">Cancel addon</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default BillingProfile;
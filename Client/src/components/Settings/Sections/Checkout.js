import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { createSubscription } from '../../../requests/billing';

export default class Checkout extends React.Component {
  onToken = (token) => {
    createSubscription(token)
  }

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_oSJOsGVnmCQfVN05k3uln7WC"
        token={this.onToken}
      />
    )
  }
}
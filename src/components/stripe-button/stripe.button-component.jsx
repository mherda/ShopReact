import React from 'react';
//import StripeCheckout from "react-stripe-checkout";
// import { loadStripe } from '@stripe/stripe-js';

//const stripePromise = loadStripe('pk_test_51HKWY8FvfDHYsvDElUnCN00r0WLq0YboaA1iqhYZf8Lbc4MZtTPsTkqqVhlvm3ECRvDiamOqgf079DQUelPKEyLo00gXxIhjzp');

const StripeCheckoutButton = ({ price }) => {

    return(
        <button role='link'>
            Checkout
        </button>

    );
};

export default StripeCheckoutButton;
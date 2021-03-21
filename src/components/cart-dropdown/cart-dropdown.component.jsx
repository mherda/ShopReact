import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';


import './cart-dropdown.styles.scss';

// cartItems are from state via connect, history is via withRouter (gives access to other params)

const CartDropdown = ({ cartItems, history, dispatch }) => {
    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />
                    )
                )) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
            }}>
                Checkout</CustomButton>
        </div>
    )
}

// Action dispatch: if we don't provide the second argument to connect (mapDispatchtoprops)
// react passes 'dispatch' to props by default. See how we destructured it in props above

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
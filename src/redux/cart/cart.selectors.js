import { createSelector } from 'reselect';

// Input selector
// it's a function with a naming structure selectXXX
// Takes state and returns slice of it.
const selectCart = state => state.cart;

// output selector (uses the input selector)
// createSelector: 2 arguments
// - input selectors collection (so array [])
// - the second is a function that will return a value out of the selector
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
);
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// In production it does not logs all the action to be inspected in the console.
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
//export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

// The middlewares is an array because we'll probably add something to it later on, apart from the logger
// That's why we're spreading it in applyMiddleware(...middlewares) so if we add something to middlewares array later on
// it'll be applied as well. We could have done:
// (rootReducer, applyMiddleware(logger)); if we knew it's only going to be one middleware
// Once again middleware is a piece of code that sits between 'actions' and the root reducer'. It takes the actions, does something to them and passes to the reducer

// probably don't need to export store any more
export default {store, persistor};
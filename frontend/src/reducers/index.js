// import { combineReducers } from 'redux';
// import stocksReducer from './stocks';
// import authReducer from './auth';
// import purchasedReducer from './purchased';
// import transactionsReducer from './transactions';
// import logsReducer from './logs';
// import { authErrorsReducer, marketErrorsReducer, purchasedErrorsReducer, userErrorsReducer, transactionErrorsReducer, logsErrorsReducer } from './error';
// import { LOGOUT } from '../constants/actions';

// const appReducer = combineReducers({ 
//   stocksReducer, 
//   authReducer, 
//   purchasedReducer,
//   transactionsReducer,
//   logsReducer, 
//   authErrorsReducer, 
//   marketErrorsReducer,
//   purchasedErrorsReducer,
//   userErrorsReducer,
//   transactionErrorsReducer,
//   logsErrorsReducer
// });

// export const reducer = (state, action) => {
//   if (action.type === LOGOUT) {
//     return appReducer(undefined, action)
//   }
//   return appReducer(state, action)
// }

// src/reducers/index.js
import { combineReducers } from 'redux';
import stocksReducer from './stocks';
import authReducer from './auth';
import purchasedReducer from './purchased';
import transactionsReducer from './transactions';
import logsReducer from './logs';

import {
  authErrorsReducer,
  marketErrorsReducer,
  purchasedErrorsReducer,
  userErrorsReducer,
  transactionErrorsReducer,
  logsErrorsReducer,
} from './error';

import { LOGOUT } from '../constants/actions';

// Combine all reducers
const appReducer = combineReducers({
  stocks: stocksReducer,
  auth: authReducer,
  purchased: purchasedReducer,
  transactions: transactionsReducer,
  logs: logsReducer,

  // Error reducers (string state)
  authError: authErrorsReducer,
  marketError: marketErrorsReducer,
  purchasedError: purchasedErrorsReducer,
  userError: userErrorsReducer,
  transactionError: transactionErrorsReducer,
  logsError: logsErrorsReducer,
});

// Root reducer with logout reset
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action); // Reset state on logout
  }
  return appReducer(state, action);
};

// ✅ Default export
export default rootReducer;

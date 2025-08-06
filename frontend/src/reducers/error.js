// import { AUTH_ERROR_OCCURRED, MARKET_ERROR_OCCURRED, PURCHASED_ERROR_OCCURRED, USER_ERROR_OCCURRED, TRANSACTION_ERROR_OCCURRED, LOG_ERROR_OCCURRED } from '../constants/actions';

// // errors for authentication
// const authErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case AUTH_ERROR_OCCURRED:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // // errors for stock market
// // const marketErrorsReducer = (state = [], action) => {
// //   switch (action.type) {
// //     case MARKET_ERROR_OCCURRED:
// //       return action.payload;
// //     default:
// //       return state;
// //   }
// // };
// const marketErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case MARKET_ERROR_OCCURRED:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// // errors for purchase details
// const purchasedErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case PURCHASED_ERROR_OCCURRED:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // errors for updating profile
// const userErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case USER_ERROR_OCCURRED:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // errors for transactions
// const transactionErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case TRANSACTION_ERROR_OCCURRED:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // errors for action logs
// const logsErrorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case LOG_ERROR_OCCURRED:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export { authErrorsReducer, marketErrorsReducer, purchasedErrorsReducer, userErrorsReducer, transactionErrorsReducer, logsErrorsReducer };



// src/reducers/error.js

import {
  AUTH_ERROR_OCCURRED,
  MARKET_ERROR_OCCURRED,
  PURCHASED_ERROR_OCCURRED,
  USER_ERROR_OCCURRED,
  TRANSACTION_ERROR_OCCURRED,
  LOG_ERROR_OCCURRED,
} from '../constants/actions';

// ✅ এই ফাংশন ensure করবে state কখনো undefined না হয়
const createErrorReducer = (errorType) => {
  return (state = '', action) => {
    if (!action || !action.type) return state;
    switch (action.type) {
      case errorType:
        return action.payload || ''; // fallback যদি payload না থাকে
      default:
        return state;
    }
  };
};

export const authErrorsReducer = createErrorReducer(AUTH_ERROR_OCCURRED);
export const marketErrorsReducer = createErrorReducer(MARKET_ERROR_OCCURRED);
export const purchasedErrorsReducer = createErrorReducer(PURCHASED_ERROR_OCCURRED);
export const userErrorsReducer = createErrorReducer(USER_ERROR_OCCURRED);
export const transactionErrorsReducer = createErrorReducer(TRANSACTION_ERROR_OCCURRED);
export const logsErrorsReducer = createErrorReducer(LOG_ERROR_OCCURRED);

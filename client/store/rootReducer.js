import { combineReducers } from '@reduxjs/toolkit';
import supermarketDetailsReducer from '../features/supermarketDetails/supermarketDetailsSlice';

const rootReducer = combineReducers({
  supermarketDetails: supermarketDetailsReducer,
});

export default rootReducer;

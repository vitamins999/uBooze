import { combineReducers } from '@reduxjs/toolkit';
import supermarketDetailsReducer from '../features/supermarketDetails/supermarketDetailsSlice';

const combinedReducer = combineReducers({
  supermarketDetails: supermarketDetailsReducer,
});

export default combinedReducer;

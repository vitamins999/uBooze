import { combineReducers } from '@reduxjs/toolkit';
import supermarketDetailsReducer from '../features/supermarketDetails/supermarketDetailsSlice';
import sortReducer from '../features/sort/sortSlice';

const combinedReducer = combineReducers({
  supermarketDetails: supermarketDetailsReducer,
  sort: sortReducer,
});

export default combinedReducer;

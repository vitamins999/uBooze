import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './lib/slices/userInfoSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
  devTools: true,
});

export default store;

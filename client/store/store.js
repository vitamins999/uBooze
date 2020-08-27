import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import combinedReducer from './rootReducer';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = (context) =>
  configureStore({
    reducer,
  });

export const wrapper = createWrapper(makeStore);

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import rootReducer from './rootReducer';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) {
      nextState.count = state.count;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const makeStore = (context) =>
  configureStore({
    reducer,
  });

export const wrapper = createWrapper(makeStore);

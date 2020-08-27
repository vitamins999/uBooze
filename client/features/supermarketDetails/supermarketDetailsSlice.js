import { createSlice } from '@reduxjs/toolkit';

const supermarketDetailsSlice = createSlice({
  name: 'supermarketDetails',
  initialState: {
    supermarketList: [],
    queryString: '',
    userPostcode: '',
  },
  reducers: {
    setSupermarkets: (state, action) => {
      const payload = action.payload;
      state.supermarketList = payload;
    },
    setQueryString: (state, action) => {
      const payload = action.payload;
      state.queryString = payload;
    },
    setUserPostcode: (state, action) => {
      const payload = action.payload;
      state.userPostcode = payload;
    },
  },
});

export const {
  setSupermarkets,
  setQueryString,
  setUserPostcode,
} = supermarketDetailsSlice.actions;

export default supermarketDetailsSlice.reducer;

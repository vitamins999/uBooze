import { createSlice } from '@reduxjs/toolkit';

const supermarketDetailsSlice = createSlice({
  name: 'supermarketDetails',
  initialState: [],
  reducers: {
    setSupermarkets(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setSupermarkets } = supermarketDetailsSlice.actions;

export default supermarketDetailsSlice.reducer;

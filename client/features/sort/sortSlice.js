import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    order: 'asc',
  },
  reducers: {
    setOrder: (state, action) => {
      const payload = action.payload;
      state.order = payload;
    },
  },
});

export const { setOrder } = sortSlice.actions;

export default sortSlice.reducer;

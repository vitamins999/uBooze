import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userID: null,
    email: null,
    username: null,
    displayName: null,
    accountType: null,
    gravatar: null,
    token: null,
  },
  reducers: {
    userLoginRequest: (state, action) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      (state.loading = false),
        (state.userID = action.payload.user.userID),
        (state.email = action.payload.user.email),
        (state.username = action.payload.user.username),
        (state.displayName = action.payload.user.displayName),
        (state.accountType = action.payload.user.accountType),
        (state.gravatar = action.payload.user.gravatar),
        (state.token = action.payload.user.token);
    },
    userLoginFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    userLogout: (state, action) => {
      (state.userID = null),
        (state.email = null),
        (state.username = null),
        (state.displayName = null),
        (state.accountType = null),
        (state.gravatar = null),
        (state.token = null),
        (state.loading = false);
    },
  },
});

export const loginAsync = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      'http://localhost:3001/api/auth/login',
      { email, password },
      config
    );

    dispatch(userLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(userLoginFail(error.message));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout);
};

export const selectUserInfo = (state) => state.userInfo;

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

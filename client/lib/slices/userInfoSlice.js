import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userID: null,
    email: null,
    username: null,
    displayName: null,
    firstName: null,
    lastName: null,
    location: null,
    bio: null,
    isAdmin: null,
    gravatar: null,
    favourites: [],
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
        (state.firstName = action.payload.user.firstName),
        (state.lastName = action.payload.user.lastName),
        (state.location = action.payload.user.location),
        (state.bio = action.payload.user.bio),
        (state.isAdmin = action.payload.user.isAdmin),
        (state.gravatar = action.payload.user.gravatar),
        (state.favourites = action.payload.user.favourites),
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
        (state.firstName = null),
        (state.lastName = null),
        (state.location = null),
        (state.bio = null),
        (state.isAdmin = null),
        (state.gravatar = null),
        (state.favourites = []),
        (state.token = null),
        (state.loading = false);
    },
    userUpdateProfile: (state, action) => {
      (state.firstName = action.payload.firstName),
        (state.lastName = action.payload.lastName),
        (state.displayName = action.payload.displayName),
        (state.location = action.payload.location),
        (state.bio = action.payload.bio);
    },
    userUpdateAccount: (state, action) => {
      (state.email = action.payload.email),
        (state.username = action.payload.username),
        (state.gravatar = action.payload.gravatar);
    },
    userUpdateFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    userUpdateFavourites: (state, action) => {
      state.favourites = action.payload.favourites;
    },
    userUpdateFavouritesFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
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

export const updateUserProfile = (
  firstName,
  lastName,
  location,
  bio,
  token
) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      'http://localhost:3001/api/profile/currentUser/profile',
      { firstName, lastName, location, bio },
      config
    );

    dispatch(userUpdateProfile(data));
    const { userInfo } = getState();
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify({ user: { ...userInfo } }));
  } catch (error) {
    dispatch(userUpdateFail(error.message));
  }
};

export const updateUserAccount = (username, email, token) => async (
  dispatch,
  getState
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      'http://localhost:3001/api/profile/currentUser/account',
      { username, email },
      config
    );

    dispatch(userUpdateAccount(data));
    const { userInfo } = getState();
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify({ user: { ...userInfo } }));
  } catch (error) {
    dispatch(userUpdateFail(error.message));
  }
};

export const updateFavourites = (token) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.get(
      'http://localhost:3001/api/favourites',
      config
    );

    dispatch(userUpdateFavourites(data));
    const { userInfo } = getState();
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify({ user: { ...userInfo } }));
  } catch (error) {
    dispatch(userUpdateFavouritesFail(error.message));
  }
};

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userUpdateProfile,
  userUpdateAccount,
  userUpdateFail,
  userUpdateFavourites,
  userUpdateFavouritesFail,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

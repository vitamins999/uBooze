import { createSlice } from '@reduxjs/toolkit';
import { loginUserAccountAPI } from '../../api/public';
import {
  updateUserProfileAPI,
  updateUserAccountAPI,
  fetchUserFavouritesPrivate,
} from '../../api/private';

export const initialState = {
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
  isSocial: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
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
        (state.favourites = action.payload.user.favourites);
      state.isSocial = action.payload.user.isSocial;
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
        (state.loading = false),
        (state.isSocial = null),
        (state.error = null);
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

    const data = await loginUserAccountAPI(email, password);
    const { user } = data;

    dispatch(userLoginSuccess(data));

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        userID: user.userID,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        bio: user.bio,
        isAdmin: user.isAdmin,
        gravatar: user.gravatar,
        favourites: user.favourites,
        isSocial: false,
      })
    );
    localStorage.setItem('accessToken', JSON.stringify(user.token));
  } catch (error) {
    dispatch(userLoginFail(error.response.data));
  }
};

export const loginSocial = (cookieData) => async (dispatch) => {
  try {
    let user = JSON.parse(cookieData);
    const userState = {
      user: { ...user },
    };

    dispatch(userLoginSuccess(userState));

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        userID: user.userID,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        bio: user.bio,
        isAdmin: user.isAdmin,
        gravatar: user.gravatar,
        favourites: user.favourites,
        isSocial: user.isSocial,
      })
    );
    localStorage.setItem('accessToken', JSON.stringify(user.token));
  } catch (error) {
    dispatch(userLoginFail(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch(userLogout);
};

export const selectUserInfo = (state) => state.userInfo;

export const updateUserProfile =
  (firstName, lastName, location, bio) => async (dispatch, getState) => {
    try {
      const data = await updateUserProfileAPI(
        firstName,
        lastName,
        location,
        bio
      );

      dispatch(userUpdateProfile(data));
      const { userInfo } = getState();
      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
    } catch (error) {
      dispatch(userUpdateFail(error.message));
    }
  };

export const updateUserAccount =
  (username, email, password) => async (dispatch, getState) => {
    try {
      const data = await updateUserAccountAPI(username, email, password);

      if (data.error) {
        return data;
      } else {
        dispatch(userUpdateAccount(data));
        const { userInfo } = getState();
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
      }
    } catch (error) {
      dispatch(userUpdateFail(error.message));
    }
  };

export const updateFavourites = (token) => async (dispatch, getState) => {
  try {
    const data = await fetchUserFavouritesPrivate();

    dispatch(userUpdateFavourites(data));
    const { userInfo } = getState();
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
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

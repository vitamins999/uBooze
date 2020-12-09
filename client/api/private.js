import { restAPI } from './calls';

// PRIVATE API REQUESTS

// Fetch the public profile of a user. If the logged in user is the same user as the profile, isUser will return 'true'.
export const fetchProfileInfo = async (config, username) => {
  try {
    const { data } = await restAPI.get(
      `/profile/?username=${username}`,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Fetch the logged in user's rating for an individual item by productID
export const fetchUserRatingPrivate = async (config, item) => {
  const { data } = await restAPI.get(`/ratings?productid=${item}`, config);
  return data;
};

// Save/overwrite the logged in user's new rating to the DB.
export const saveUserRatingPrivate = async (config, item, rating) => {
  const { data } = await restAPI.post(
    `/ratings`,
    { productID: Number(item), rating },
    config
  );
  return data;
};

// Fetch favourites for logged in user
export const fetchUserFavouritesPrivate = async (config) => {
  const { data } = await restAPI.get('/favourites', config);

  return data;
};

// Favourite or unfavourite product in DB for the logged in user
export const saveFavouriteStatusPrivate = async (config, item) => {
  restAPI.post('/favourites', { productID: Number(item) }, config);
};

// Fetch the current logged in user's profile
export const fetchCurrentProfile = async (config) => {
  try {
    const { data } = await restAPI.get(`/profile/currentUser`, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Update current logged in user's profile
export const updateUserProfileAPI = async (
  firstName,
  lastName,
  location,
  bio,
  config
) => {
  const { data } = await restAPI.put(
    '/profile/currentUser/profile',
    { firstName, lastName, location, bio },
    config
  );

  return data;
};

// Update current logged in user's account details
export const updateUserAccountAPI = async (username, email, config) => {
  const { data } = await restAPI.put(
    '/profile/currentUser/account',
    { username, email },
    config
  );

  return data;
};

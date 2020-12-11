import { restAPI } from './calls';

// PRIVATE API REQUESTS

// Fetch the public profile of a user. If the logged in user is the same user as the profile, isUser will return 'true'.
export const fetchProfileInfo = async (username) => {
  try {
    const { data } = await restAPI.get(`/profile/?username=${username}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Fetch the logged in user's rating for an individual item by productID
export const fetchUserRatingPrivate = async (item) => {
  const { data } = await restAPI.get(`/ratings?productid=${item}`);
  return data;
};

// Save/overwrite the logged in user's new rating to the DB.
export const saveUserRatingPrivate = async (item, rating) => {
  const { data } = await restAPI.post(`/ratings`, {
    productID: Number(item),
    rating,
  });
  return data;
};

// Fetch favourites for logged in user
export const fetchUserFavouritesPrivate = async () => {
  const { data } = await restAPI.get('/favourites');

  return data;
};

// Favourite or unfavourite product in DB for the logged in user
export const saveFavouriteStatusPrivate = async (item) => {
  restAPI.post('/favourites', { productID: Number(item) });
};

// Fetch the current logged in user's profile
export const fetchCurrentProfile = async () => {
  try {
    const { data } = await restAPI.get(`/profile/currentUser`);

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
  bio
) => {
  const { data } = await restAPI.put('/profile/currentUser/profile', {
    firstName,
    lastName,
    location,
    bio,
  });

  return data;
};

// Update current logged in user's account details
export const updateUserAccountAPI = async (username, email) => {
  const { data } = await restAPI.put('/profile/currentUser/account', {
    username,
    email,
  });

  return data;
};

import { restAPI } from './calls';

// PUBLIC API REQUESTS

// Takes a postcode and fetches a list of nearby supermarkets, using the API endpoint
// designed for that purpose.
export const fetchSupermarkets = async (postcode, radius = 3218) => {
  const { data } = await restAPI.get(
    `/products/postcode?postcode=${postcode}&radius=${radius}`
  );
  return data;
};

// Fetch singular drink item by productID
export const fetchDrinkInfo = async (key, item) => {
  const { data } = await restAPI.get(`/products/details?item=${item}`);
  return data;
};

// Generic fetch all drinks from database function (for React Query)
export const fetchDrinks = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const { data } = await restAPI.get(
    `/products/?page=${page}${queryString}&order=${order}&limit=${limit}`
  );
  return data;
};

// Generic fetch all drinks from database function (for React Query) from subcategory
export const fetchDrinksSub = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const { data } = await restAPI.get(
    `/products/subtypes/?page=${page}${queryString}&order=${order}&limit=${limit}`
  );
  return data;
};

// Generic fetch all drinks from database function (for React Query) from favourites
export const fetchDrinksFavourites = async (
  key,
  page = 1,
  favourites,
  order = 'asc',
  limit = 10
) => {
  const { data } = await restAPI.post(
    `/favourites/userfavourites?page=${page}&order=${order}&limit=${limit}`,
    { favourites },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

// Generic fetch all drinks from database function (for React Query) from favourites by userID
export const fetchDrinksFavouritesPublic = async (
  key,
  page = 1,
  username,
  order = 'asc',
  limit = 10
) => {
  const { data } = await restAPI.get(
    `/favourites/userfavourites/id?page=${page}&order=${order}&limit=${limit}&username=${username}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

// Fetch all drinks related to search input in the query string
export const fetchDrinksSearch = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const { data } = await restAPI.get(
    `/search/?page=${page}&search=${queryString}&order=${order}&limit=${limit}`
  );
  return data;
};

// Fetch the overall rating for a specific product by productID
export const fetchOverallProductRating = async (item) => {
  const { data } = await restAPI.get(`/ratings/${item}`);
  return data;
};

// Register User Account
export const registerUserAccountAPI = async (data) => {
  try {
    await restAPI({
      method: 'POST',
      data: data,
      withCredentials: true,
      url: '/auth/register',
    });
  } catch (error) {
    console.log(error);
  }
};

// Login to User Account
export const loginUserAccountAPI = async (email, password) => {
  const { data } = await restAPI.post('/auth/login', { email, password });

  return data;
};

// Send Contact Us Email
export const sendContactUsEmail = async ({ name, email, message }) => {
  const { data } = await restAPI.post('/email', {
    name,
    email,
    message,
  });
  return data;
};

// Send Forgot Password Email Request
export const sendForgotPasswordRequest = async (email) => {
  const { data } = await restAPI.post('/auth/forgotpassword', {
    email,
  });
  return data;
};

// Reset Password
export const resetPassword = async (token, password) => {
  const { data } = await restAPI.put(`/auth/resetpassword/${token}`, {
    password,
  });
  return data;
};

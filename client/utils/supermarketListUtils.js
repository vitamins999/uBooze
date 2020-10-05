// Capitalise first letter
export const capitaliseFirstLetter = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

// Takes a postcode and fetches a list of nearby supermarkets, using the API endpoint
// designed for that purpose.
export const fetchSupermarkets = async (postcode, radius = 3218) => {
  const res = await fetch(
    `http://localhost:3001/api/products/postcode?postcode=${postcode}&radius=${radius}`
  );
  return res.json();
};

// Creates a query string of an array supermarkets array, to be sent to the API.
export const createQueryString = (supermarketList) => {
  const data = supermarketList.map((supermarket) => {
    const capitalisedSupermarket = capitaliseFirstLetter(supermarket);
    return `&supermarkets=${capitalisedSupermarket}`;
  });
  return data.join('');
};

// Convert price from integer to GBP.
export const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

// Return the relevant supermarket logo SVG for an image string.
export const supermarketLogo = (supermarket) => {
  if (supermarket === 'Waitrose') {
    return '/waitrose_logo.svg';
  } else if (supermarket === "Sainsbury's") {
    return '/sainsburys_logo.svg';
  } else if (supermarket === 'Tesco') {
    return '/tesco_logo.svg';
  }
};

// Generic fetch drinks from database function (for React Query)
export const fetchDrinks = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const res = await fetch(
    `http://localhost:3001/api/products/?page=${page}${queryString}&order=${order}&limit=${limit}`
  );
  return res.json();
};

// Generic fetch drinks from database function (for React Query) from subcategory
export const fetchDrinksSub = async (
  key,
  page = 1,
  queryString,
  order = 'asc',
  limit = 10
) => {
  const res = await fetch(
    `http://localhost:3001/api/products/subtypes/?page=${page}${queryString}&order=${order}&limit=${limit}`
  );
  return res.json();
};

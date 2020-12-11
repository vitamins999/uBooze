import { restAPI } from './calls';

// ADMIN API REQUESTS

export const fetchDrinksAdmin = async () => {
  const { data } = await restAPI.get(`/admin/products`);

  return data;
};

export const deleteDrinkAdmin = async (productID) => {
  const { data } = await restAPI.delete(`/admin/products/${productID}`);

  return data;
};

export const fetchSupermarketProductsAdmin = async () => {
  const { data } = await restAPI.get(`/admin/supermarketproducts`);

  return data;
};

export const fetchSupermarketProductsNoIDAdmin = async (
  key,
  currentSupermarket = 'Asda'
) => {
  const { data } = await restAPI.get(
    `/admin/supermarketproducts/noid/${currentSupermarket}`
  );

  return data;
};

export const addNewProductAdmin = async (
  productID,
  productName,
  displayName,
  volume,
  drinkType,
  drinkSubtype
) => {
  await restAPI.post(`/admin/products`, {
    productID,
    productName,
    displayName,
    volume,
    drinkType,
    drinkSubtype,
  });
};

import { restAPI } from './calls';

// ADMIN API REQUESTS

export const fetchDrinksAdmin = async (config) => {
  const { data } = await restAPI.get(`/admin/products`, config);

  return data;
};

export const deleteDrinkAdmin = async (config, productID) => {
  const { data } = await restAPI.delete(`/admin/products/${productID}`, config);

  return data;
};

export const fetchSupermarketProductsAdmin = async (config) => {
  const { data } = await restAPI.get(`/admin/supermarketproducts`, config);

  return data;
};

export const fetchSupermarketProductsNoIDAdmin = async (
  key,
  currentSupermarket = 'Asda',
  config
) => {
  const { data } = await restAPI.get(
    `/admin/supermarketproducts/noid/${currentSupermarket}`,
    config
  );

  return data;
};

export const addNewProductAdmin = async (
  config,
  productID,
  productName,
  displayName,
  volume,
  drinkType,
  drinkSubtype
) => {
  await restAPI.post(
    `/admin/products`,
    {
      productID,
      productName,
      displayName,
      volume,
      drinkType,
      drinkSubtype,
    },
    config
  );
};

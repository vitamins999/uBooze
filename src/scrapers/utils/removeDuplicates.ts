import { SupermarketProduct } from './types';

export const removeDuplicates = (drinksArr: SupermarketProduct[]) => {
  return drinksArr.reduce(
    (acc: SupermarketProduct[], current: SupermarketProduct) => {
      const x = acc.find((item) => item.productName === current.productName);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    },
    []
  );
};

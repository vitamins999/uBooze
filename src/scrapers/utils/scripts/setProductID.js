const { productsBeer } = require('../../../../seeds/base_data/productsBeer');
const { productsWine } = require('../../../../seeds/base_data/productsWine');
const {
  productsSpirits,
} = require('../../../../seeds/base_data/productsSpirits');

const fs = require('fs');

const setProductID = (productsArr, startingNumber) => {
  const numberedProductsArr = productsArr.map((product, index) => {
    return {
      ...product,
      productID: index + startingNumber,
    };
  });
  return numberedProductsArr;
};

const beerNumbered = setProductID(productsBeer, 1);
const beerNumberedJSON = JSON.stringify(beerNumbered);
fs.writeFileSync('src/output/seed-beerNumbered.json', beerNumberedJSON);

const wineNumbered = setProductID(productsWine, 302);
const wineNumberedJSON = JSON.stringify(wineNumbered);
fs.writeFileSync('src/output/seed-wineNumbered.json', wineNumberedJSON);

const spiritsNumbered = setProductID(productsSpirits, 921);
const spiritsNumberedJSON = JSON.stringify(spiritsNumbered);
fs.writeFileSync('src/output/seed-spiritsNumbered.json', spiritsNumberedJSON);

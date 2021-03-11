const { icelandSpirits } = require('./seeds/base_data/icelandSpirits');

const duplicateProductID = (productArr) => {
  for (let i = 0; i < productArr.length; i++) {
    for (let j = 0; j < productArr.length; j++) {
      if (i !== j) {
        if (productArr[i].productID === productArr[j].productID) {
          console.log(
            `Product ID ${productArr[i].productID} is a duplicate -- ${productArr[i].productName}`
          );
        }
      }
    }
  }
};

const missingField = (productArr) => {
  productArr.forEach((product) => {
    if (product.productID === undefined) {
      console.log(product.productName);
    }
  });
};

duplicateProductID(icelandSpirits);
// missingField(icelandSpirits);

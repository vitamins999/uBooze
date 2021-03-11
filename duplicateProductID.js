const { morrisonsSpirits } = require('./seeds/base_data/morrisonsSpirits');

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
    if (product.supermarket === undefined) {
      console.log(product.productName);
    }
  });
};

duplicateProductID(morrisonsSpirits);
// missingField(morrisonsSpirits);

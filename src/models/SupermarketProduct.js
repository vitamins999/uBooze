const { Model } = require('objection');

class SupermarketProduct extends Model {
  static get tableName() {
    return 'supermarketProducts';
  }

  static get idColumn() {
    return 'supermarketProductID';
  }

  static get relationMappings() {
    const Product = require('./Product');

    return {
      products: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'supermarketProducts.productID',
          to: 'products.productID',
        },
      },
    };
  }
}

module.exports = SupermarketProduct;

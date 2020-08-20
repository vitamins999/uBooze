const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get idColumn() {
    return 'productID';
  }

  static get relationMappings() {
    const SupermarketProduct = require('./SupermarketProduct');

    return {
      supermarketProducts: {
        relation: Model.HasManyRelation,
        modelClass: SupermarketProduct,
        join: {
          from: 'products.productID',
          to: 'supermarketProducts.productID',
        },
      },
    };
  }
}

module.exports = Product;

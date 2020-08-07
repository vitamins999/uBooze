const { Model } = require('objection');

class Tesco extends Model {
  static get tableName() {
    return 'tesco';
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
          from: 'tesco.productID',
          to: 'products.productID',
        },
      },
    };
  }
}

module.exports = Tesco;

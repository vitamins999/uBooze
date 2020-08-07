const { Model } = require('objection');

class Waitrose extends Model {
  static get tableName() {
    return 'waitrose';
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
          from: 'waitrose.productID',
          to: 'products.productID',
        },
      },
    };
  }
}

module.exports = Waitrose;

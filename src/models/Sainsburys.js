const { Model } = require('objection');

class Sainsburys extends Model {
  static get tableName() {
    return 'sainsburys';
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
          from: 'sainsburys.productID',
          to: 'products.productID',
        },
      },
    };
  }
}

module.exports = Sainsburys;

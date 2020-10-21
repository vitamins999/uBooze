const { Model } = require('objection');

class Favourite extends Model {
  static get tableName() {
    return 'productFavourites';
  }

  static get idColumn() {
    return 'favouriteID';
  }

  static get relationMappings() {
    const Product = require('./Product');
    const User = require('./User');

    return {
      Product: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: 'productFavourites.productID',
          to: 'products.productID',
        },
      },
      User: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'productFavourites.userID',
          to: 'users.userID',
        },
      },
    };
  }
}

module.exports = Favourite;

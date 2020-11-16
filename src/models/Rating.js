const { Model } = require('objection');

class Rating extends Model {
  static get tableName() {
    return 'productRatings';
  }

  static get idColumn() {
    return 'ratingID';
  }

  static get relationMappings() {
    const Product = require('./Product');
    const User = require('./User');

    return {
      Product: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: 'productRatings.productID',
          to: 'products.productID',
        },
      },
      User: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'productRatings.userID',
          to: 'users.userID',
        },
      },
    };
  }
}

module.exports = Rating;

const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get idColumn() {
    return 'productID';
  }

  static get relationMappings() {
    // const Waitrose = require('./Waitrose');
    // const Tesco = require('./Tesco');
    // const Sainsburys = require('./Sainsburys');
    const SupermarketProduct = require('./SupermarketProduct');

    return {
      // waitrose: {
      //   relation: Model.HasOneRelation,
      //   modelClass: Waitrose,
      //   join: {
      //     from: 'products.productID',
      //     to: 'waitrose.productID',
      //   },
      // },
      // tesco: {
      //   relation: Model.HasOneRelation,
      //   modelClass: Tesco,
      //   join: {
      //     from: 'products.productID',
      //     to: 'tesco.productID',
      //   },
      // },
      // sainsburys: {
      //   relation: Model.HasOneRelation,
      //   modelClass: Sainsburys,
      //   join: {
      //     from: 'products.productID',
      //     to: 'sainsburys.productID',
      //   },
      // },

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

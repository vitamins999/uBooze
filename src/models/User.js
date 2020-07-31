const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'userID';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        userID: {
          type: 'integer',
        },
        username: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        password: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        email: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        defaultPostcode: {
          type: 'string',
          minLength: 1,
          maxLength: 10,
        },
        accountType: {
          type: 'string',
          minLength: 1,
          maxLength: 10,
        },
        gravatar: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        facebookID: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        googleID: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
      },
    };
  }
}

module.exports = User;

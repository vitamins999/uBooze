const { Model } = require('objection');

class RefreshToken extends Model {
  static get tableName() {
    return 'userRefreshTokens';
  }

  static get idColumn() {
    return 'refreshTokenID';
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      User: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'userRefreshTokens.userID',
          to: 'users.userID',
        },
      },
    };
  }
}

module.exports = RefreshToken;

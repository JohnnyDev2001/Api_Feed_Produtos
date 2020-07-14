const { Model, DataTypes } = require('sequelize');

class Profile extends Model {
  static init(sequelize) {
    super.init({
            bio:{
                type: DataTypes.TEXT,
            },
            link: {
                type: DataTypes.STRING,
            },
            photo: {
                type: DataTypes.STRING,
            },
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Profile;
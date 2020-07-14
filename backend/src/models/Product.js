const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
        name: {
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT,
        },
        price: {
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

module.exports = Product;
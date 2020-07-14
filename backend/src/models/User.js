const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
			username:{
                type: DataTypes.STRING,
            },
            real_name:{
                type: DataTypes.STRING,
            },
            email:{ 
                type: DataTypes.STRING,
                validate:{
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
            } 
    }, {
      sequelize
    })
  }
}

module.exports = User;
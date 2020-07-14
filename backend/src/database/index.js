const sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require('../models/User');
const Profile = require('../models/Profile')
const Product = require('../models/Product')

const connection = new sequelize(dbConfig);

User.init(connection);
Profile.init(connection);
Product.init(connection);

User.associate(connection.models);
Profile.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;
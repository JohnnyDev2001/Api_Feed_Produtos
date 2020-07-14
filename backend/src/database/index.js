const sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require('../models/User');
const Profile = require('../models/Profile')

const connection = new sequelize(dbConfig);

User.init(connection);
Profile.init(connection);

User.associate(connection.models);
Profile.associate(connection.models);

module.exports = connection;
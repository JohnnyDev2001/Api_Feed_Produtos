const sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require('../models/User');

const connection = new sequelize(dbConfig);

User.init(connection);

module.exports = connection;
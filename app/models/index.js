const { Sequelize } = require('sequelize');
const config = require('../config/database.config.js')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const User = require('./user.model.js');

sequelize.sync();

module.exports = { sequelize, User };

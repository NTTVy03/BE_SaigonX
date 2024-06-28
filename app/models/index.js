const { Sequelize } = require('sequelize');
const config = require('../config/database.config.js')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add tables to database here
db.users       = require('./user.model.js')(sequelize, Sequelize);
db.UserAccount = require('./UserAccount.model.js')(sequelize, Sequelize);
db.UserInfo    = require('./UserInfo.model.js')(sequelize, Sequelize);
db.Role        = require('./Role.model.js')(sequelize, Sequelize);

module.exports = db;

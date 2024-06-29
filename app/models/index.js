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
// db.users       = require('./user.model.js')(sequelize, Sequelize);
db.UserAccount = require('./UserAccount.model.js').createModel(sequelize, Sequelize);
db.UserInfo    = require('./UserInfo.model.js'   ).createModel(sequelize, Sequelize);
db.Role        = require('./Role.model.js')(sequelize, Sequelize);

// Association
db.UserAccount.hasOne(db.UserInfo, { foreignKey: 'userId' });
db.UserInfo.belongsTo(db.UserAccount);

module.exports = db;

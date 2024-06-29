const { Sequelize, InvalidConnectionError } = require('sequelize');
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
db.UserAccount = require('./UserAccount.model.js' ).createModel(sequelize, Sequelize);
db.UserInfo    = require('./UserInfo.model.js'    ).createModel(sequelize, Sequelize);
db.Role        = require('./Role.model.js')(sequelize, Sequelize);
db.Object      = require('./Object.model.js'      ).createModel(sequelize, Sequelize);
db.Asset       = require('./Asset.model.js'       ).createModel(sequelize, Sequelize);
db.Map         = require('./Map.model.js'         ).createModel(sequelize, Sequelize);
db.Land        = require('./Land.model.js'        ).createModel(sequelize, Sequelize);
db.Checkpoint  = require('./Checkpoint.model.js'  ).createModel(sequelize, Sequelize);
db.Location    = require('./Location.model.js'    ).createModel(sequelize, Sequelize);
db.PlayerMapOpen  = require('./PlayerMapOpen.model.js').createModel(sequelize, Sequelize);
db.PlayerMapData  = require('./PlayerMapData.model.js').createModel(sequelize, Sequelize);

// Association
db.UserAccount.hasOne(db.UserInfo, { foreignKey: 'userId' });
db.UserInfo.belongsTo(db.UserAccount);

// // ###############################################
// // VY test model & association

// // ### Add tables to database here
// db.VStudent     = require('./VStudent.model.js').createModel(sequelize, Sequelize);
// db.VStudentCard = require('./VStudentCard.model.js').createModel(sequelize, Sequelize);

// // ### Association
// // VStudent -- (One-to-One) -- VStudentcard
// db.VStudent.hasOne(db.VStudentCard);
// db.VStudentCard.belongsTo(db.VStudent);

// // ###############################################

module.exports = db;

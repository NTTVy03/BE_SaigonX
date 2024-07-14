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
db.UserAccount    = require('./UserAccount.model.js'  ).createModel(sequelize, Sequelize);
db.UserInfo       = require('./UserInfo.model.js'     ).createModel(sequelize, Sequelize);
db.Role           = require('./Role.model.js'         ).createModel(sequelize, Sequelize);
db.Object         = require('./Object.model.js'       ).createModel(sequelize, Sequelize);
db.Asset          = require('./Asset.model.js'        ).createModel(sequelize, Sequelize);
db.Map            = require('./Map.model.js'          ).createModel(sequelize, Sequelize);
db.Checkpoint     = require('./Checkpoint.model.js'   ).createModel(sequelize, Sequelize);
db.Location       = require('./Location.model.js'     ).createModel(sequelize, Sequelize);
db.Player         = require('./Player.model.js'       ).createModel(sequelize, Sequelize);
db.Land           = require('./Land.model.js'         ).createModel(sequelize, Sequelize);
db.PlayerMapOpen  = require('./PlayerMapOpen.model.js').createModel(sequelize, Sequelize);
db.PlayerLandOpen = require('./PlayerLandOpen.model.js').createModel(sequelize, Sequelize);
db.PlayerMapData  = require('./PlayerMapData.model.js').createModel(sequelize, Sequelize);
db.PlayerLandCheckpoint = require('./PlayerLandCheckpoint.model.js').createModel(sequelize, Sequelize);
db.ObjectAssets   = require('./ObjectAssets.model.js' ).createModel(sequelize, Sequelize);
// ----------------- Association

require('./association.js')(db);

// --------------------- TRIGGER

// Create map/land/checkpoint follow an object

require('./trigger.js')(db);
module.exports = db;

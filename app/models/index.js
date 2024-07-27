const { Sequelize, InvalidConnectionError } = require('sequelize');
const config = require('../config/database.config.js')['development'];
require('dotenv').config();

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
//   logging: false,
// });

const sequelize = new Sequelize(process.env.DB_EXT_URI, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
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
db.GameType   = require('./GameType.model.js' ).createModel(sequelize, Sequelize);
db.Game   = require('./Game.model.js' ).createModel(sequelize, Sequelize);
db.GameStatus   = require('./GameStatus.model.js' ).createModel(sequelize, Sequelize);
db.GameLeaderboard   = require('./GameLeaderboard.model.js' ).createModel(sequelize, Sequelize);
db.LeaderboardRecord   = require('./LeaderboardRecord.model.js' ).createModel(sequelize, Sequelize);
db.Reward   = require('./Reward.model.js' ).createModel(sequelize, Sequelize);
db.RewardType   = require('./RewardType.model.js' ).createModel(sequelize, Sequelize);
db.ObjectReward   = require('./ObjectReward.model.js' ).createModel(sequelize, Sequelize);
db.Result   = require('./Result.model.js' ).createModel(sequelize, Sequelize);
// ----------------- Association

require('./association.js')(db);

// --------------------- TRIGGER

// Create map/land/checkpoint follow an object

require('./trigger.js')(db);
module.exports = db;

const { Sequelize, InvalidConnectionError } = require('sequelize');
const config = require('../config/database.config.js')['development'];
const { create_N_N_accosiation, create_1_N_accosiation, create_1_1_accosiation } = require('./utils.js');

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

// [1] user_account -- [1] user_info
create_1_1_accosiation(db.UserAccount, db.UserInfo, 'id');
// db.UserAccount.hasOne(db.UserInfo, { 
//   foreignKey: 'id',
//   allowNull: false,
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.UserInfo.belongsTo(db.UserAccount, { 
//   foreignKey: 'id', // must define in both tables
// });

// [1] user_account -- [N] role
create_1_N_accosiation(db.UserAccount, db.Role, 'userId');
// db.UserAccount.hasMany(db.Role, { 
//   foreignKey: {
//     name: 'userId',
//     allowNull: false,
//   }
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Role.belongsTo(db.UserAccount, { 
//   foreignKey: 'userId',
// });

// [1] user_account -- [1] player
create_1_1_accosiation(db.UserAccount, db.Player, 'id');
// db.UserAccount.hasOne(db.Player, {
//   foreignKey: {
//     name: 'id',
//     allowNull: false,
//   }
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Player.belongsTo(db.UserAccount, {
//   foreignKey: 'id',
// });

// [1] map -- [1] object 
create_1_1_accosiation(db.Object, db.Map, 'id');
// db.Object.hasOne(db.Map, { 
//   foreignKey: {
//     name: 'id',
//     allowNull: false,
//   }
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Map.belongsTo(db.Object, { 
//   foreignKey: 'id',
// });

// [1] land -- [1] object 
create_1_1_accosiation(db.Object, db.Land, 'id');
// db.Object.hasOne(db.Land, { 
//   foreignKey: {
//     name: 'id',
//     allowNull: false,
//   }
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Land.belongsTo(db.Object, { 
//   foreignKey: 'id',
// });

// [1] map -- [N] land 
create_1_N_accosiation(db.Map, db.Land, 'mapId');
// db.Map.hasMany(db.Land, {
//   allowNull: false,
//   foreignKey: 'mapId',
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Land.belongsTo(db.Map, {
//   foreignKey: 'mapId',
// });

// [1] checkpoint -- [1] object 
create_1_1_accosiation(db.Checkpoint, db.Object, 'id');
// db.Object.hasOne(db.Checkpoint, { 
//   foreignKey: {
//     name: 'id',
//     allowNull: false,
//   }
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Checkpoint.belongsTo(db.Object, { 
//   foreignKey: 'id',
// });

// [1] land -- [N] checkpoint
create_1_N_accosiation(db.Land, db.Checkpoint, 'landId');
// db.Land.hasMany(db.Checkpoint, {
//   allowNull: false,
//   foreignKey: 'landId',
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Checkpoint.belongsTo(db.Land, {
//   foreignKey: 'landId',
// });

// [1] location -- [1] object
create_1_1_accosiation(db.Object, db.Location, 'id');
// db.Object.hasOne(db.Location, {
//   allowNull: false,
//   foreignKey: 'id',
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.Location.belongsTo(db.Object, {
//   foreignKey: 'id',
// });

// [N] player - [N] map 
create_N_N_accosiation(db.Player, db.Map, db.PlayerMapOpen);
// db.Player.belongsToMany(db.Map, { through: db.PlayerMapOpen });
// db.Map.belongsToMany(db.Player, { through: db.PlayerMapOpen });
// db.Map.hasMany(db.PlayerMapOpen);
// db.PlayerMapOpen.belongsTo(db.Map);
// db.Player.hasMany(db.PlayerMapOpen);
// db.PlayerMapOpen.belongsTo(db.Player);

// [N] object -- [N] asset --> object_assets(assetId, objectId)
create_N_N_accosiation(db.Object, db.Asset, db.ObjectAssets);
// db.Asset.belongsToMany(db.Object, {through: "object_assets"}); 
// db.Object.belongsToMany(db.Asset, {through: "object_assets"});


// [N] player - [N] land 
create_N_N_accosiation(db.Player, db.Land, db.PlayerLandOpen);
// db.Player.belongsToMany(db.Land, { through: db.PlayerLandOpen });
// db.Land.belongsToMany(db.Player, { through: db.PlayerLandOpen });
// db.Land.hasMany(db.PlayerLandOpen);
// db.PlayerLandOpen.belongsTo(db.Land);
// db.Player.hasMany(db.PlayerLandOpen);
// db.PlayerLandOpen.belongsTo(db.Player);

// [1] player_map_open - [N] player_land_open
create_1_N_accosiation(db.PlayerMapOpen, db.PlayerLandOpen, 'playerMapOpenId');
// db.PlayerMapOpen.hasMany(db.PlayerLandOpen, {
//   allowNull: false,
//   foreignKey: 'playerMapOpenId',
//   // onDelete: 'RESTRICT',
//   // onUpdate: 'RESTRICT',
// });
// db.PlayerLandOpen.belongsTo(db.PlayerMapOpen, {
//   foreignKey: 'playerMapOpenId',
// });

// [N] player_land_open - [N] Checkpoint (Player_land_checkpoint)
create_N_N_accosiation(db.PlayerLandOpen, db.Checkpoint, db.PlayerLandCheckpoint);
// db.PlayerLandOpen.belongsToMany(db.Checkpoint, { through: db.PlayerLandCheckpoint });
// db.Checkpoint.belongsToMany(db.PlayerLandOpen, { through: db.PlayerLandCheckpoint });
// db.PlayerLandOpen.hasMany(db.PlayerLandCheckpoint);
// db.PlayerLandCheckpoint.belongsTo(db.PlayerLandOpen);
// db.Checkpoint.hasMany(db.PlayerLandCheckpoint);
// db.PlayerLandCheckpoint.belongsTo(db.Checkpoint);

// --------------------- TRIGGER

// Create map/land/checkpoint follow an object

db.Object.addHook('afterCreate',  async (object, options) => {
  // console.log(".options");
  // console.log(options);
  // console.log(".");

  const type = object.dataValues['type'];

  switch (type) {
    case 'map': {
      await db.Map.create({
        id: object.id,
      });

      break;
    }
    case 'land': {
      await db.Land.create({
        id: object.id,
        mapId: options.mapId,
      });

      break;
    }
    case 'checkpoint': {
      await db.Checkpoint.create({
        id: object.id,
        landId: options.landId,
        ordinal: options.ordinal,
      });

      break;
    }   
  }
});

// Increase num_land in map when create a land
db.Land.addHook('afterCreate', async (land, options) => {
  const mapId = land.dataValues.mapId;

  map = await db.Map.findByPk(mapId);

  if (map === null) {
    // return error Map not found
    console.log("Map with id= {} not found", mapId);
  }
  else {
    map.increment('num_land');
    // console.log("NUM LAND = {}", map.num_land);
  }
},);

module.exports = db;

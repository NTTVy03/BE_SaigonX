const { create_N_N_association, create_1_N_association, create_1_1_association } = require('./utils.js');


// ----------------- Association . association
const createDBAssociation = (db) => {
    // [1] user_account -- [1] user_info
    create_1_1_association(db.UserAccount, db.UserInfo, 'id');
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
    create_1_N_association(db.UserAccount, db.Role, 'userId');
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
    create_1_1_association(db.UserAccount, db.Player, 'id');
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
    create_1_1_association(db.Object, db.Map, 'id');
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
    create_1_1_association(db.Object, db.Land, 'id');
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
    create_1_N_association(db.Map, db.Land, 'mapId');
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
    create_1_1_association(db.Checkpoint, db.Object, 'id');
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
    create_1_N_association(db.Land, db.Checkpoint, 'landId');
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
    create_1_1_association(db.Object, db.Location, 'id');
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
    create_N_N_association(db.Player, db.Map, db.PlayerMapOpen);
    // db.Player.belongsToMany(db.Map, { through: db.PlayerMapOpen });
    // db.Map.belongsToMany(db.Player, { through: db.PlayerMapOpen });
    // db.Map.hasMany(db.PlayerMapOpen);
    // db.PlayerMapOpen.belongsTo(db.Map);
    // db.Player.hasMany(db.PlayerMapOpen);
    // db.PlayerMapOpen.belongsTo(db.Player);
    
    // [N] object -- [N] asset --> object_assets(assetId, objectId)
    create_N_N_association(db.Object, db.Asset, db.ObjectAssets);
    // db.Asset.belongsToMany(db.Object, {through: "object_assets"}); 
    // db.Object.belongsToMany(db.Asset, {through: "object_assets"});
    
    
    // [N] player - [N] land 
    create_N_N_association(db.Player, db.Land, db.PlayerLandOpen);
    // db.Player.belongsToMany(db.Land, { through: db.PlayerLandOpen });
    // db.Land.belongsToMany(db.Player, { through: db.PlayerLandOpen });
    // db.Land.hasMany(db.PlayerLandOpen);
    // db.PlayerLandOpen.belongsTo(db.Land);
    // db.Player.hasMany(db.PlayerLandOpen);
    // db.PlayerLandOpen.belongsTo(db.Player);
    
    // [1] player_map_open - [N] player_land_open
    create_1_N_association(db.PlayerMapOpen, db.PlayerLandOpen, 'playerMapOpenId');
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
    create_N_N_association(db.PlayerLandOpen, db.Checkpoint, db.PlayerLandCheckpoint);
    // db.PlayerLandOpen.belongsToMany(db.Checkpoint, { through: db.PlayerLandCheckpoint });
    // db.Checkpoint.belongsToMany(db.PlayerLandOpen, { through: db.PlayerLandCheckpoint });
    // db.PlayerLandOpen.hasMany(db.PlayerLandCheckpoint);
    // db.PlayerLandCheckpoint.belongsTo(db.PlayerLandOpen);
    // db.Checkpoint.hasMany(db.PlayerLandCheckpoint);
    // db.PlayerLandCheckpoint.belongsTo(db.Checkpoint);

    console.log(">>> Create DB association <<<");
}

module.exports = createDBAssociation;
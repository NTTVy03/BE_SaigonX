const ObjectType = require('../type/enum/ObjectType');

const createDBTrigger = (db) => {
    db.Object.addHook('afterCreate',  async (object, options) => {
        const type = object.dataValues['type'];
      
        switch (type) {
          case ObjectType.MAP: {
            await db.Map.create({
              id: object.id,
            });
      
            break;
          }
          case ObjectType.LAND: {
            await db.Land.create({
              id: object.id,
              mapId: options.mapId,
            });
      
            break;
          }
          case ObjectType.CHECKPOINT: {
            await db.Checkpoint.create({
              id: object.id,
              landId: options.landId,
              ordinal: options.ordinal,
            });
      
            break;
          }   

          case ObjectType.GAME : {
            await db.Game.create({
              id: object.id,
              gameTypeId: options.gameTypeId,
              checkpointId: options.checkpointId,
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
      
}

module.exports = createDBTrigger;
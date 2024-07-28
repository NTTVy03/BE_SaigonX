const { ObjectType } = require('../type/enum/ObjectType');

const createDBTrigger = (db) => {
    const { createMap, createLand, createCheckpoint, createGame } = db.createUtils;
    db.Object.addHook('afterCreate',  async (object, options) => {
        const type = object.dataValues['type'];
      
        switch (type) {
          case ObjectType.MAP: {
            await createMap({  id: object.id, ...options, })
            break;
          }
          case ObjectType.LAND: {
            await createLand({  id: object.id, ...options, })
            break;
          }
          case ObjectType.CHECKPOINT: {
            await createCheckpoint({  id: object.id, ...options, })
            break;
          }   

          case ObjectType.GAME : {
            await createGame({  id: object.id, ...options, })
            break;
          }
        }
      });
      
    // Increase num_land in map when create a land
    // db.Land.addHook('afterCreate', async (land, options) => {
    // const mapId = land.dataValues.mapId;
    
    // map = await db.Map.findByPk(mapId);
    
    // if (map === null) {
    //     // return error Map not found
    //     console.log("Map with id= {} not found", mapId);
    // }
    // else {
    //     map.increment('num_land');
    //     // console.log("NUM LAND = {}", map.num_land);
    // }
    // },);
      
}

module.exports = createDBTrigger;
const db = require('../models');
const Map = db.Map;
const Object = db.Object;
const Role = db.Role;

const { Roles } = require('../type/enum/Role');

// Check isMapActive
const isAccessMap = async (req, res, next) => {
  // console.log("isAccessMap: userId, mapId --> ", req.userId, req.params.mapId);
  let userId = req.userId;
  let mapId = req.params.mapId;

  let map = await Map.findByPk(mapId, 
    {
      include: [
        {
          model: db.Object,
          as: 'object',
        }
      ]
    }
  );

  // console.log("map --> ", map.dataValues);

  let isActive = map.object.isActive;

  if(isActive){
    next();
    return;
  }

  let roles = await Role.findAll({
    where: {
      userId: userId
    }
  });

  if (roles.include(Roles.ADMIN)) {
    next();
    return;
  }

  res.status(403).send({ message: "You don't have permission to access this map" });
}

module.exports = {
  isAccessMap
};
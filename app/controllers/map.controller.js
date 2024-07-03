const { where } = require('sequelize');
const db            = require('../models');
const Map           = db.Map;
const Object        = db.Object;
const Land          = db.Land;
const Location      = db.Location;
const Asset         = db.Asset;
const Result        = db.Result; 
const PlayerMapOpen = db.PlayerMapOpen;
const Player        = db.Player;
const PlayerLandOpen = db.PlayerLandOpen;

/**
 * Return map[] with isActive = true
 * @param {Request} req request
 * @param {Response} res response
 * @returns {Promise<Response>}
 */
const queryAvailableMaps = async () => {
  try{
    let maps = await  
      Map.findAll({
        where: {
          '$object.isActive$': true,
        },
        include: [
          {
              model: Object,
              as: 'object',
              include: [
                {
                  model: Location, 
                  as: 'location'
                },
                {
                  model: Asset,
                  as: 'assets',
                }
              ]
          },
        ]
      })

    return {
      data: maps,
      error: null
    }
  }catch(error) {
    console.log(error);
    return {
      data: null,
      error: error
    }
  }

}

const getAllMaps = async (req, res) => {
    console.log("# Get all maps")
    const {data, error} = await queryAvailableMaps();
    if (error) {
      return res.status(500).send({
        message: 'Some error occurred while retrieving maps.'
      });
    }

    return res.status(200).send({
      message: 'Maps retrieved successfully',
      data: data,
      status: 200
    });
}

// Get Detailed Map by ID: object, land, location, asset
const getMapById = async (req, res) => {
    console.log("# Get map by ID")
    let mapId = req.params.mapId;

    try{
      let map = await  
        Map.findOne({
          where: {
            id: mapId,
            '$object.isActive$': true,
          },
          include: [
            {
                model: Object,
                as: 'object',
                include: [
                  {
                    model: Location, 
                    as: 'location'
                  },
                  {
                    model: Asset,
                    as: 'assets',
                  }
                ]
            },
            {
                model: Land,
                as: 'lands',
                include: {
                  model: Object, 
                  as: 'object',
                  include: [
                    {
                      model: Location,
                      as: 'location'
                    },
                    {
                      model: Asset,
                      as: 'assets'
                    }
                  ]
                }
            }
          ]
        })
      // console.log({maps});
      res.status(200).send({
          message: 'Map retrieved successfully',
          data: map,
          status: 200
      });
    }
    catch(err){
      console.log(err);
      res.status(500).send({
          message: 'Some error occurred while retrieving map.'
      });
    }
}

const queryUserMapOpen = async (userId) => {
  try{
    let maps = await PlayerMapOpen.findAll({
      where: {
        playerId: userId,
      },
      include: [
        {
          model: Player,
        },
        {
          model: Map,
          as: 'map',
          required: true,
          
          include: {
            model: Object,
            as: 'object',
            where: {
              isActive: true,
            }
          }
        },
        // {
        //   model: db.PlayerMapData,
        //   as: 'playerMapData'
        // }
      ]
    });

    return {
      data: maps,
      error: null
    }
 
  }catch(error) {
    // console.log(error);
    return {
      data: null,
      error: error
    }
  }
}

const getUserMapsOpen = async (req, res) => {
  console.log("# Get user maps open")
  const userId = req.userId;

  console.log(">>>>> userId: ", userId)

  const {data, error} = await queryUserMapOpen(userId);
  if (error) {
    return res.status(500).send({
      message: 'Some error occurred while retrieving maps.'
    });
  }

  return res.status(200).send({
    message: 'Maps retrieved successfully',
    data: data,
    status: 200
  });
}

const getUserMapDetail = async (req, res) => {
  console.log("# Get user map detail")
  const userId = req.userId;
  const mapId = req.params.mapId;

  const {data, error} = await queryUserMapOpen(userId);
  
  
  if(error) {
    return res.status(500).send({
      message: 'Some error occurred while retrieving maps.'
    });
  }
  // console.log(">>>>> maps: ", Object.keys(data));
  console.log(Array.isArray(data));


  let maps = data;
  if (maps.length == 0) {
    return res.status(403).send({
      message: 'Map not found or not open',
      status: 403
    });
  }

  let mapsId = maps.map(map => map.mapId);

  // console.log(">>>>> userId: ", userId);
  // console.log(maps);
  // console.log(mapsId);

  try{
    const record = await PlayerMapOpen.findOne({
      where: {
        playerId: userId,
        mapId: mapId
      },
      include: [
        {
          model: Player,
          as : 'player'
        },
        {
          model: Map,
          as: 'map',
          include: [
            {
                model: Object,
                as: 'object',
                include: [
                  {
                    model: Location, 
                    as: 'location'
                  },
                  {
                    model: Asset,
                    as: 'assets',
                  }
                ]
            },
            {
                model: Land,
                as: 'lands',
                include: {
                  model: Object, 
                  as: 'object',
                  include: [
                    {
                      model: Location,
                      as: 'location'
                    },
                    {
                      model: Asset,
                      as: 'assets'
                    }
                  ]
                }
            }
          ]
        },
        // {
        //   model: db.PlayerMapData,
        //   as: 'playerMapData'
        // }
      ]
    });
  
  
    return res.status(200).send({
      message: 'Map retrieved successfully',
      data: record,
      status: 200
    });
  }catch(error) {
    console.log(error);
    return res.status(500).send({
      message: 'Some error occurred while retrieving map.'
    });
  }
  // if no, return error 403
}

const postPlayerOpenMap = async (req, res) => {
  const userId = req.userId;
  let mapId = req.params.mapId;
  mapId = parseInt(mapId);

  console.log("# Post player open map")
  console.log(">>>>> userId: ", userId);
  console.log(">>>>> mapId: ", mapId);

  const {data, error} = await queryAvailableMaps();

  if (error) {
    return res.status(500).send({
      message: 'Some error occurred while retrieving maps.'
    });
  }

  let availableMaps = data;
  console.log(availableMaps.map(map => map.id));
  console.log(availableMaps.map(map => map.id).includes(mapId));
  if (! availableMaps.map(map => map.id).includes(mapId)) {
    return res.status(403).send({
      message: 'Map not found',
      status: 403
    });
  }

  // Check user's condition to open map

  try{
    const record = await PlayerMapOpen.create({
      playerId: userId,
      mapId: mapId,
    });
  
    return res.status(200).send({
      message: 'Map opened successfully',
      data: record,
      status: 200
    });
  }
  catch(error){
    console.log(error);
    // Check error Duplicate entry
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(403).send({
        message: 'Map already opened',
        status: 403
      });
    }

    return res.status(500).send({
      message: 'Some error occurred while opening map.'
    });
  }
}

const getMapLands = async (req, res) => {
    console.log("# Get map lands")
    let mapId = req.params.mapId;

    try{
      let lands = await  
        Land.findAll({
          where: {
            mapId: mapId,
          },
          include: [
            {
              model: Object, 
              as: 'object',
              include: [
                {
                  model: Location,
                  as: 'location'
                },
                {
                  model: Asset,
                  as: 'assets'
                }
              ]
            }
          ]
        })
      // console.log({maps});
      res.status(200).send({
          message: 'Lands retrieved successfully',
          data: lands,
          status: 200
      });
    }
    catch(err){
      console.log(err);
      res.status(500).send({
          message: 'Some error occurred while retrieving lands.'
      });
    }
}

const getUserLandsOpen = async (req, res) => {
  console.log("# Get user lands open")
  const userId = req.userId;
  const mapId = req.params.mapId;

  try{
    let lands = await PlayerLandOpen.findAll({
      where: {
        playerId: userId,
      },
      include: [
        {
          model: Land,
          as: 'land',
          required: true,
          where: {
            mapId: mapId
          },
          include: [
            {
              model: Object,
              as: 'object',
              include: [
                {
                  model: Location,
                  as: 'location'
                },
                {
                  model: Asset,
                  as: 'assets'
                }
              ]
            }
          ]
        }
      ]
    });
    return res.status(200).send({
      message: 'Lands retrieved successfully',
      data: lands,
      status: 200
    });
  }catch(error) {
    console.log(error);
    return res.status(500).send({
      message: 'Some error occurred while retrieving lands.'
    });
  }


}

module.exports = {
    getAllMaps,
    getMapById,
    getUserMapsOpen,
    getUserMapDetail,
    postPlayerOpenMap,
    getMapLands,
    getUserLandsOpen
};
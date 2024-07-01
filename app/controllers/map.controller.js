const { where } = require('sequelize');
const db        = require('../models');
const Map       = db.Map;
const Object    = db.Object;
const Land      = db.Land;
const Location  = db.Location;
const Asset     = db.Asset;
const Result    = db.Result; 

/**
 * Return map[] with isActive = true
 * @param {Request} req request
 * @param {Response} res response
 * @returns {Promise<Response>}
 */
const getAllMaps = async (req, res) => {
    console.log("# Get all maps")
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
            },
            // {
            //     model: Land,
            //     as: 'lands',
            //     include: {
            //       model: Object, 
            //       as: 'object'
            //     }
            // }
          ]
        })
      // console.log({maps});
      res.status(200).send({
          message: 'Maps retrieved successfully',
          data: maps,
          status: 200
      });
    }
    catch(err){
      console.log(err);
      res.status(500).send({
          message: 'Some error occurred while retrieving maps.'
      });
    }
}

// Get Detailed Map by ID: object, land, location, asset
const getMapById = async (req, res) => {
    console.log("# Get map by ID")

    try{
      let map = await  
        Map.findOne({
          where: {
            id: req.params.id,
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
                  // {
                  //   model: Asset,
                  //   as: 'assets',
                  // }
                ]
            },
            {
                model: Land,
                as: 'lands',
                include: {
                  model: Object, 
                  as: 'object',
                  include: {
                    model: Location,
                    as: 'location'
                  }
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

const getUserMapsOpen = (req, res) => {
  console.log("# Get user maps open")
  const userId = req.userId;

  
}

const getUserMapDetail = (req, res) => {

}

module.exports = {
    getAllMaps,
    getMapById,
    getUserMapsOpen,
    getUserMapDetail
};
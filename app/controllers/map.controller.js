const MapUsecase = require('../usecase/map.usecase');

const getAllActiveMaps = async (req, res) => {
  console.log('GET /api/map');
  try{
    const maps = await MapUsecase.getAllActiveMaps();
    res.status(200).json({data: maps});
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message});
  }
}

const getActiveMapById = async(req, res) => {
  const mapId = req.params.mapId;
  console.log('GET /api/map/' + mapId);
  try{
    const map = await MapUsecase.getActiveMapDetailById(mapId);

    if(!map) {
      res.status(404).json({message: 'Map not found'});
      return;
    }
    
    res.status(200).json({data: map});
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message});
  }
}

module.exports = {
  getAllActiveMaps,
  getActiveMapById,
};
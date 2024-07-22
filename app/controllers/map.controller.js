const MapUsecase = require('../usecase/map.usecase');

const getActiveMaps = async (req, res) => {
  try{
    const maps = await MapUsecase.getActiveMaps();
    res.status(200).json({data: maps});
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message});
  }
}

const getActiveMapById = async(req, res) => {
  const mapId = req.params.mapId;
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

const getAllMaps = async (req, res) => {
  try{
    const maps = await MapUsecase.getAllMaps();
    res.status(200).json({data: maps});
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message});
  }
}

module.exports = {
    getActiveMaps,
    getActiveMapById,
    getAllMaps,
};
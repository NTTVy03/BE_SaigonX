const UserMapUseCase = require('../../usecase/user/user.map.usecase');
const db = require('../../models');
const { mapEagerLoading } = require('../../usecase/map.usecase');

const getUserMapsOpen = async (req, res) => {
    const userId = req.userId;
    try{
        const maps = await UserMapUseCase.getUserMapsOpen(userId);
        res.status(200).json({data: maps});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

const getUserMapDetail = async (req, res) => {
    const playerMapOpen = req.playerMapOpen;
    try{
        const mapData = await playerMapOpen.getMap(
            mapEagerLoading.map_object_active_location_assets
        );
        playerMapOpen.dataValues.map = mapData;
        res.status(200).json({data: playerMapOpen});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}
  
const UserMapController = {
    getUserMapsOpen,
    getUserMapDetail
}

module.exports = UserMapController;
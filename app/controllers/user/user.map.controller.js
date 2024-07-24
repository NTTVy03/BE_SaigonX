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
    let playerMapOpen = req.playerMapOpen;
    try{
        // const map = await UserMapUseCase.getUserMapDetail(userId, mapId);
        // res.status(200).json({data: map});
        playerMapOpen = await playerMapOpen.getMap(
            {
                include: mapEagerLoading.object_active_location_assets_land_detail,
            }
        );
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
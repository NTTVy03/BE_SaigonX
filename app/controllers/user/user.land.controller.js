const { landEagerLoading } = require('../../models/eagerLoading');
const { LandUsecase } = require('../../usecase');


const getAllUserLandsOpen = async (req, res) => {
    console.log('/user/map/:mapId/land');
    const userId = req.userId;
    const mapId = req.params.mapId;
    console.log({userId, mapId});
    try{
        const lands = await LandUsecase.getAllUserLandsOpen(userId, mapId);
        res.status(200).json({data: lands});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}
const getUserLandOpen = async (req, res) => { 
    console.log('/user/map/:mapId/land/:landId');  
    const playerLandOpen = req.playerLandOpen;
    res.status(200).json({data: playerLandOpen});
}
const UserLandController = {
    getUserLandOpen,
    getAllUserLandsOpen
}

module.exports = UserLandController;
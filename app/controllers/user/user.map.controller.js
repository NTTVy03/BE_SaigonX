const { MapUsecase } = require('../../usecase');
const db = require('../../models');

const getAllUserMapsOpen = async (req, res) => {
    console.log('/user/maps');
    const userId = req.userId;
    try{
        const maps = await MapUsecase.getAllUserMapsOpen(userId);
        res.status(200).json({data: maps});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

const getUserMapDetail = async (req, res) => {
    console.log('/user/maps/:mapId');
    const playerMapOpen = req.playerMapOpen;
    try{
        res.status(200).json({data: playerMapOpen});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}
  
const UserMapController = {
    getAllUserMapsOpen,
    getUserMapDetail
}

module.exports = UserMapController;
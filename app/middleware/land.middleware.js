const { LandUsecase } = require("../usecase")

const isOpenLand = async (req, res, next) => {
    let userId = req.userId
    let landId = req.params.landId
    try{
        let playerLandOpen = await LandUsecase.isOpenLand(userId, landId)
        if(playerLandOpen === null){
            res.status(404).json({message: 'Land not found'});
            return;
        }
        req.playerLandOpen = playerLandOpen
        next()
    }
    catch(err){
        console.log('Error: ', err);
        res.status(500).json({message: err.message});
        return;
    }
}

module.exports = {
    isOpenLand
}
const { landEagerLoading } = require('../../models/eagerLoading');
const { UserLandUsecase } = require('../../usecase');


const getLandActiveDetailById = async (req, res) => {   
    let landId = req.params.landId;
    let playerLandOpen = req.playerLandOpen;
    try{
        let land = await playerLandOpen.getLand({
            include: landEagerLoading.land_object_active_location_assets_and_checkpoint.include
        });

        if(land === null){
            res.status(404).json({message: 'Land not found'});
            return;
        }

        playerLandOpen.dataValues.land = land;
        res.status(200).json(playerLandOpen);
        return;
    }catch(err){
        console.log('Error: ', err);
        res.status(500).json({message: err.message});
        return;
    }
}
const UserLandController = {
    getLandActiveDetailById
}

module.exports = UserLandController;
const { CheckpointUsecase } = require("../../usecase");

const getAllUserCheckpointsOpen = async (req, res) => {
    console.log('/api/user/map/:mapId/land/:landId/checkpoint');
    const userId = req.userId;
    const landId = req.params.landId;
    console.log({userId, landId});

    try{
        const checkpoints = await CheckpointUsecase.getAllUserCheckpointsOpen(userId, landId);
        res.status(200).json({data: checkpoints});
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const getUserCheckpointOpen = async (req, res) => {
    const playerCheckpointOpen = req.playerCheckpointOpen;
    res.status(200).json({data: playerCheckpointOpen});
}

const UserCheckpointController = {
    getAllUserCheckpointsOpen,
    getUserCheckpointOpen
};

module.exports = UserCheckpointController;
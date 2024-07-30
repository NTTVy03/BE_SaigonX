const { CheckpointUsecase } = require("../usecase");

const isOpenCheckpoint = async (req, res, next) => {
    const { checkpointId } = req.params;
    const userId = req.userId;
    const checkpoint = await CheckpointUsecase.getUserCheckpointOpen(userId, checkpointId);
    if (!checkpoint) {
        return res.status(404).json({ message: 'Checkpoint not found' });
    }
    req.playerCheckpointOpen = checkpoint;
    next();
}

module.exports = {
    isOpenCheckpoint
}   

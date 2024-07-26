const db = require('../models');
const _ = require('lodash');
const { checkpointEagerLoading } = require('../models/eagerLoading');
const { isAccessLand, isOpenLand } = require('./land.usecase');

const isCheckpointActive = async (checkpointId) => {
    let checkpoint = await db.Checkpoint.findByPk(checkpointId, {
        include: checkpointEagerLoading.checkpoint_object_active.include,
    });

    return checkpoint;
}

const isOpenCheckpoint = async (userId, checkpointId) => {
    let checkpoint = await db.Checkpoint.findByPk(checkpointId);

    let isLandAccess = isAccessLand(userId, checkpoint.landId);
    if(!isLandAccess) { return false; }

    let playerLandCheckpoint = await isLandAccess.getPlayerLandCheckpoint();
    return playerLandCheckpoint;
}   

const isAccessCheckpoint = async (userId, checkpointId) => {
    console.log('>>> isAccessCheckpoint <<<');

    let checkpoint = await isCheckpointActive(checkpointId);
    if(!checkpoint) { return null; }

    console.log('\t>>> checkpoint is Active <<<');

    let landId = checkpoint.landId;
    let isLandOpen = await isOpenLand(userId, landId);

    if(!isLandOpen) { return null; }
    console.log('\t>>> isOpenLand <<<');
    return isLandOpen;
}

const CheckpointUsecase = {
    isAccessCheckpoint
};

module.exports = CheckpointUsecase;
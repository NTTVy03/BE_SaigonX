const { where } = require('sequelize');
const db = require('../models');
const _ = require('lodash');
const { ObjectType } = require('../type/enum/ObjectType');

const getAllUserCheckpointsOpen = async (playerId, landId) => {
    const checkpoints = await db.PlayerObjectOpen.findAll({
        where: { playerId },
        include: [
            {
                model: db.Object,
                where: { type: ObjectType.CHECKPOINT, parentId: landId },
                required: true,
                include: [
                    { model: db.Location },
                    { model: db.Asset },
                    { model: db.Checkpoint },
                ]
            }
        ]
    });

    return checkpoints;
}

const getUserCheckpointOpen = async (playerId, checkpointId) => {
    const checkpoint = await db.PlayerObjectOpen.findOne({
        where: { playerId, objectId: checkpointId },
        include: [
            {
                model: db.Object,
                where: { type: ObjectType.CHECKPOINT },
                required: true,
                include: [
                    { model: db.Location },
                    { model: db.Asset },
                    { model: db.Checkpoint },
                ]
            }
        ]
    });

    return checkpoint;
}

const CheckpointUsecase = {
    getAllUserCheckpointsOpen,
    getUserCheckpointOpen
};

module.exports = CheckpointUsecase;
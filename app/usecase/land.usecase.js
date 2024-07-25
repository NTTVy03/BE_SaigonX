const db = require('../models');
const ObjectUsecase = require('./object.usecase');
const CheckpointUsecase = require('./checkpoint.usecase');


const land_object_active = {
    model: db.Land,
    include: ObjectUsecase.objectEagerLoading.object_active,
};

const land_object_all = {
    model: db.Land,
    include: ObjectUsecase.objectEagerLoading.object_all,
};

const land_object_active_location_assets = {
    model: db.Land,
    include: ObjectUsecase.objectEagerLoading.object_active_location_assets,
};

console.log("land_object_active_location_assets", land_object_active_location_assets);  

const land_object_all_location_assets = {
    model: db.Land,
    include: ObjectUsecase.objectEagerLoading.object_all_location_assets,
};

const land_object_active_location_assets_and_checkpoint = {
    model: db.Land,
    include: [
        ObjectUsecase.objectEagerLoading.object_active_location_assets,
        CheckpointUsecase.checkpointEagerLoading.checkpoint_object_active_location_assets,
    ]
};

const land_object_all_location_assets_and_checkpoint = {
    model: db.Land,
    include: [
        ObjectUsecase.objectEagerLoading.object_all_location_assets,
        CheckpointUsecase.checkpointEagerLoading.checkpoint_object_all_location_assets,
    ]
};

const landEagerLoading = {
    land_object_active,
    land_object_all,
    land_object_active_location_assets,
    land_object_all_location_assets,
    land_object_active_location_assets_and_checkpoint,
    land_object_all_location_assets_and_checkpoint,
};

const getDetailActiveLandById = async (req, res) => {
    let landId = req.params.landId;
    let landActiveDetail = await db.Land.findByPk(landId, {
        include: [
            landEagerLoading.object_active_location_assets,
            {
                model: db.Checkpoint,
                order: [
                    'ordinal', 'ASC'
                ],

            }
        ]
    });
}
const LandUsecase = {
    landEagerLoading,
};

module.exports = LandUsecase;
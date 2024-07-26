const db = require('../');
const _ = require('lodash');
const objectEagerLoading = require('./object.eagerLoading');
const checkpointEagerLoading = require('./checkpoint.eagerLoading');
const land_object_active = {
    model: db.Land,
    include: _.cloneDeep(objectEagerLoading.object_active),
};

const land_object_all = {
    model: db.Land,
    include: _.cloneDeep(objectEagerLoading.object_all),
};

const land_object_active_location_assets = {
    model: db.Land,
    include: _.cloneDeep(objectEagerLoading.object_active_location_assets),
};

// console.log("land_object_active_location_assets", land_object_active_location_assets);  

const land_object_all_location_assets = {
    model: db.Land,
    include: _.cloneDeep(objectEagerLoading.object_all_location_assets),
};

const land_object_active_location_assets_and_checkpoint = {
    model: db.Land,
    include: [
        _.cloneDeep(objectEagerLoading.object_active_location_assets),
        _.cloneDeep(checkpointEagerLoading.checkpoint_object_active_location_assets),
    ]
};

const land_object_all_location_assets_and_checkpoint = {
    model: db.Land,
    include: [
        _.cloneDeep(objectEagerLoading.object_all_location_assets),
        _.cloneDeep(checkpointEagerLoading.checkpoint_object_all_location_assets),
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

module.exports = landEagerLoading;
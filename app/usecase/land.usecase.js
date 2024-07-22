const db = require('../models');
const ObjectUsecase = require('./object.usecase');
const _ = require('lodash');


const object_active = {
    model: db.Object,
    where: {
        isActive: true,
    },
    required: true,
};

const object_all = {
    model: db.Object,
};

const object_active_location_assets = {
    ...object_active,
    include: _.cloneDeep(ObjectUsecase.objectEagerLoading.object_location_assets),
};

const object_all_location_assets = {
    ...object_all,
    include: _.cloneDeep(ObjectUsecase.objectEagerLoading.object_location_assets),
};

const landEagerLoading = {
    object_active,
    object_all,
    object_active_location_assets,
    object_all_location_assets,
};

// console.log('landEagerLoading: ', landEagerLoading);

const LandUsecase = {
    landEagerLoading,
};

module.exports = LandUsecase;
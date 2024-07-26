const db = require('../models');
const ObjectUsecase = require('./object.usecase');
const _ = require('lodash');

const checkpoint_sort = {
    model: db.Checkpoint,
    order: [
        ['ordinal', 'ASC'],
    ],
    separate: true,
};

const checkpoint_object_active = {
    ...checkpoint_sort,
    include: ObjectUsecase.objectEagerLoading.object_active,
};

const checkpoint_object_all = {
    ...checkpoint_sort,
    include: ObjectUsecase.objectEagerLoading.object_all,
};

const checkpoint_object_active_location_assets = {
    ...checkpoint_sort,
    include: ObjectUsecase.objectEagerLoading.object_active_location_assets,
};

const checkpoint_object_all_location_assets = {
    ...checkpoint_sort,
    include: ObjectUsecase.objectEagerLoading.object_all_location_assets,
};

const checkpointEagerLoading = {
    checkpoint_sort,
    checkpoint_object_active,
    checkpoint_object_all,
    checkpoint_object_active_location_assets,
    checkpoint_object_all_location_assets,
};

const CheckpointUsecase = {
    checkpointEagerLoading,
};

module.exports = CheckpointUsecase;
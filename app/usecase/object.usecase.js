const db = require('../models');
const object_location = {
    model: db.Location,
};

const object_assets =  {
    model: db.Asset,
};
 
const object_location_assets = [
    {...object_location},
    {...object_assets},
];

const objectEagerLoading = {
    object_location,
    object_assets,
    object_location_assets,
};
console.log('object_location_assets: ', object_location_assets);

const ObjectUsecase = {
    objectEagerLoading
};

module.exports = ObjectUsecase;

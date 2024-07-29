const db = require('../');
const { ObjectType } = require('../../type/enum/ObjectType');

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

const object_location = {
    model: db.Location,
};

const object_assets =  {
    model: db.Asset,
};
 
const object_all_location_assets = {
    ...object_all,
    include: [
        object_location,
        object_assets,
    ],
};

const object_active_location_assets = {
    ...object_active,
    include: [
        object_location,
        object_assets,
    ],
};

const object_map_active_location_assets = {
   model: db.Object,
   where: {
        isActive: true,
        type: ObjectType.MAP,
   },
   required: true,
    include: [
          object_location,
          object_assets,
    ],
};

const objectEagerLoading = {
    object_active,
    object_all,
    object_active_location_assets,
    object_all_location_assets,
    object_map_active_location_assets
};

module.exports = objectEagerLoading;
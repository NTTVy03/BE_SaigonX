const db = require('../');
const objectEagerLoading = require('./object.eagerLoading');
const landEagerLoading = require('./land.eagerLoading');

const map_only = {
    model: db.Map,
}

const map_object_active = {
    model: db.Map,
    include: objectEagerLoading.object_active,
}

const map_object_all = {
    model: db.Map,
    include: objectEagerLoading.object_all,    
}

const map_object_active_location_assets = {
    model: db.Map,
    include: objectEagerLoading.object_active_location_assets,
    required: true,
}

const map_object_all_location_assets = {
    model: db.Map,
    include: objectEagerLoading.object_all_location_assets,
}

const map_object_active_location_assets_and_land_detail = {
    model: db.Map,
    include: [
        objectEagerLoading.object_active_location_assets.include,
        landEagerLoading.land_object_active_location_assets,
    ],
    required: true,
}

const map_object_all_location_assets_land_detail = {
    model: db.Map,
    include: [
        objectEagerLoading.object_all_location_assets,
        landEagerLoading.land_object_all_location_assets,
    ]
}

const mapEagerLoading = {
    map_only,
    map_object_active,
    map_object_all,
    map_object_active_location_assets,
    map_object_all_location_assets,
    map_object_active_location_assets_and_land_detail,
    map_object_all_location_assets_land_detail,
};

module.exports = mapEagerLoading;
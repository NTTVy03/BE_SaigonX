const db = require('../../models');
const { landEagerLoading } = require('../../models/eagerLoading');

const getLandActiveDetailById = async (landId) => {
    let land = await db.Land.findByPk(landId, {
        include: landEagerLoading.land_object_active_location_assets_and_checkpoint.include,
    });

    return land;
}

const UserLandUsecase = {
    getLandActiveDetailById
}

module.exports = UserLandUsecase;
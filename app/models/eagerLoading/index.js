const objectEagerLoading = require('./object.eagerLoading');
const checkpointEagerLoading = require('./checkpoint.eagerLoading');
const landEagerLoading = require('./land.eagerLoading');
const mapEagerLoading = require('./map.eagerLoading');
const userEagerLoading = require('./user.eagerLoading');

const EagerLoading = {
    objectEagerLoading,
    checkpointEagerLoading,
    landEagerLoading,
    mapEagerLoading,
    userEagerLoading
};

module.exports = EagerLoading;
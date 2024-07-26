const CheckpointUsecase = require('./checkpoint.usecase');
const LandUsecase = require('./land.usecase');
const MapUsecase = require('./map.usecase');
const ObjectUsecase = require('./object.usecase');
const UserUsecase = require('./user');

module.exports = {
    CheckpointUsecase,
    LandUsecase,
    MapUsecase,
    ObjectUsecase,
    ...UserUsecase,
};
const db = require('../../models');
const PlayerObjectOpenUsecase = require('../playerObjectOpen.usecase');

const getUserMapsOpen = async (userId) => {
    // get at playerObjectOpen
    return await PlayerObjectOpenUsecase.getPlayerMapOpen(userId);
}

const UserMapUseCase = {
    getUserMapsOpen
};

module.exports = UserMapUseCase;
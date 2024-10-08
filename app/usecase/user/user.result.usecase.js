const db = require('../../models');
const addUserResult = async (userId, objectId, result) => {
    const userResult = {
        playerId: userId,
        objectId,
        ...result
    }

    console.log('>>> result: ', userResult);

    const resultResponse = await db.Result.create(userResult);

    return resultResponse;
}

const UserResultUsecase = {
    addUserResult
}

module.exports = UserResultUsecase;
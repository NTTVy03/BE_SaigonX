const db = require('../../models');

const updateUserResult = async (objectResult, newScore) => {
    const updateResponse = await objectResult.update({
        score: newScore,
        isPassed: true // TODO: only true for Game
    })
    return updateResponse;
}

const UserResultUsecase = {
    updateUserResult
}

module.exports = UserResultUsecase;
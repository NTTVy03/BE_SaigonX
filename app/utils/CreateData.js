const db = require('../models');

async function createGame(
   code,
   gameTypeId,
   checkpointId,
   isActive = true, 
) {
    return await db.Object.create({
        type: 'game',
        code,
        isActive,
    }, {
        gameTypeId,
        checkpointId,
    })
}

module.exports = {
    createGame,
}
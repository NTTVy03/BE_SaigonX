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
        parentId: checkpointId,
    }, {
        gameTypeId,
    });
}

module.exports = {
    createGame,
}
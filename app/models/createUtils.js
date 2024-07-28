const db = require('./index');

const initialUtilsWithdb = (db) => {
    const createMap = async (info) => {
        if(!info.id) { throw new Error('Map id is required'); }

        return await db.Map.create(info);
    }

    const createLand = async (info) => {
        if(!info.id) { throw new Error('Land id is required'); }

        return await db.Land.create(info);
    }

    const createCheckpoint = async (info) => {
        if(!info.id) { throw new Error('Checkpoint id is required'); }
        if(!info.ordinal) { throw new Error('Checkpoint ordinal is required'); }

        return await db.Checkpoint.create(info);
    }

    const createGame = async (info) => {
        if(!info.id) { throw new Error('Game id is required'); }
        if(!info.gameTypeId) { throw new Error('Game type id is required for create game'); }
        return await db.Game.create(info);
    }

    return {
        createMap,
        createLand,
        createCheckpoint,
        createGame
    }
}

module.exports = {
    initialUtilsWithdb
}
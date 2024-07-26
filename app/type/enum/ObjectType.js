const ObjectType = {
    MAP: 'map',
    LAND: 'land',
    CHECKPOINT: 'checkpoint',
    GAME: 'game',
};

const ObjectTypeKeys = Object.keys(ObjectType);

const getObjectType = (type) => {
    for (let key of ObjectTypeKeys) {
        if (type === ObjectType[key]) {
            return type;
        }
    }
    return null;
}

const ObjectTypeManager = {
    ObjectTypeKeys,
    getObjectType
}

module.exports = {
    ObjectType,
    ObjectTypeManager
}
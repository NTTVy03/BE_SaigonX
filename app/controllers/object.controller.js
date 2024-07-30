const db = require("../models")
const { MapUsecase, ObjectUsecase } = require("../usecase")

const getAllMap = async (req, res) => {
    try{
        const maps = await MapUsecase.getAllActiveMaps();
        res.status(200).json(maps);
    }catch(err){
        res.status(500).send({message: err.message});
        console.log(err);
    }
}

const getObjectById = async (req, res) => {
    const objectId = req.params.objectId;
    try{
        const object = await ObjectUsecase.getObjectDetail(objectId, {
            where: { isActive: true },
            required: true,
            include: [
                { model: db.Location },
                { model: db.Asset },
            ]
        });
        res.status(200).json(object);
    }catch(error) {
        res.status(500).send({message: error.message});
        console.log(error);
    }
}

const getObjectChildren = async (req, res) => {
    const objectId = req.params.objectId;
    try{
        const children = await ObjectUsecase.getAllChildrenObject(objectId);
        const childrenDetailPromises = await children.map( async(child) => {
            return ObjectUsecase.getObjectDetail(child.id, {
                where: { isActive: true },
                required: true,
                include: [
                    { model: db.Location },
                    { model: db.Asset },
                ]
            });
        });
        const childrenDetail = await Promise.all(childrenDetailPromises);
        res.status(200).json(childrenDetail);
    }catch(error) {
        res.status(500).send({message: error.message});
        console.log(error);
    }
}

module.exports = {
    getAllMap,
    getObjectById, 
    getObjectChildren
}
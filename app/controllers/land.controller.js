const LandUsecase = require('../usecase/land.usecase');
const getLandDetailById = async (req, res) => {
    const landId = req.params.landId;

    try{
        const landDetail = await LandUsecase.getDetailActiveLandById(landId);
        res.status(200).send(landDetail);
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving land detail."
        });
    }
};

module.exports = {
  getLandDetailById
};
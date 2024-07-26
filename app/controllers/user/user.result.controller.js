const UserResultUsecase = require('../../usecase/user/user.result.usecase');

const postUserResult = async (req, res) => {
    // Need to validate req.body
    const userId = req.userId;
    const objectId = req.body.objectId;
    const result = req.body.result;

    try{
        const resultResponse = await UserResultUsecase.addUserResult(userId, objectId, result);
        res.status(201).json(resultResponse);
        return;
    }catch(err){
        res.status(500).json({message: err.message});
        return;
    }
}

const UserResultController = {
    postUserResult  
};

module.exports = UserResultController;
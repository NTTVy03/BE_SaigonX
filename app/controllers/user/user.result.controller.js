const UserResultUsecase = require('../../usecase/user/user.result.usecase');

const postUserResult = async (req, res) => {
    // Need to validate req.body
    const userId = req.userId;
    const objectId = req.params.objectId;
    const result = req.body;

    try{
        const resultResponse = await UserResultUsecase.addUserResult(userId, objectId, result);
        res.status(201).json(resultResponse);
        return;
    }catch(err){
        console.log('Error: ', err);
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.status(400).json({message: 'User already have result for this object'});
            return;
        }
        res.status(500).json({message: err.message});
        return;
    }
}

const UserResultController = {
    postUserResult  
};

module.exports = UserResultController;
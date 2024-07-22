const UserMapUseCase = require('../../usecase/user/user.map.usecase');

const getUserMapsOpen = async (req, res) => {
    const userId = req.userId;
    try{
        const maps = await UserMapUseCase.getUserMapsOpen(userId);
        res.status(200).json({data: maps});
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}
  
const UserMapController = {
    getUserMapsOpen
}

module.exports = UserMapController;
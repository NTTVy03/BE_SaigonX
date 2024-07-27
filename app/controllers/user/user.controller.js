const { UserUsecase } = require('../../usecase/user');
const db = require('../../models');
const UserAccount = db.UserAccount;
const UserInfo = db.UserInfo;

/**
 * - Get user account + user infor 
 */
const getUserInfo = async (req, res) => {
    let userId = req.userId;

    try {
        const userDetail = await UserUsecase.getUserInfo(userId);

        res.status(200).json({data: userDetail});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * - Update user avatar
 */
const updateUserAvatar = async (req, res) => {
    let userId = req.userId;
    let newAvatar = req.body.avatar;

    if (!newAvatar) {
        res.status(400).json({ message: "Avatar cannot be empty!" });
        return;
    }

    try {
        const userInfo = await UserInfo.findByPk(userId);

        if (!userInfo) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        await userInfo.update({ avatar: newAvatar });
        await userInfo.save();

        res.status(200).json({message: "Update avatar successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get user player data
 *    - score
 *    - reward (sau)
 */
const getPlayerData = async (req, res) => {
    let userId = req.userId;
    
    try{
        let promises = [
            UserUsecase.getPlayerData(userId),
            UserUsecase.getPlayerReward(userId, 1)
        ];
        const [
            playerData, 
            playerRewards
        ] = await Promise.all(promises);
        res.status(200).json({
            data: {
                playerData: playerData,
                playerRewards: playerRewards
            }
        });
    }catch(err) {
        console.error(err); 
        res.status(500).json({ message: err.message });
    }
}

const UserAccountController = {
    getUserInfo,
    updateUserAvatar,
    getPlayerData
};

module.exports = UserAccountController;
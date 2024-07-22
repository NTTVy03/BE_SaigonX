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
        const userDetail = await UserAccount.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: UserInfo }, { model: db.Role }]
        });

        res.status(200).json({data: userDetail});
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
    getPlayerData
};

module.exports = UserAccountController;
const db = require('../../models');
const getPlayerData = async (userId) => {
    console.log(">>> getPlayerData <<<");
    const playerData = await db.Player.findByPk(userId, {});
    return playerData;
}

const getObjectPass = async (userId) => {
    const objectPasses = await db.Result.findAll({
        where: {
            playerId: userId,
        },
        include: {
            model: db.Object
        }
    });
    return objectPasses;
}

const getPlayerReward = async (userId, rewardTypeId) => {
    const rewardWhereCondition = 
        rewardTypeId ? 
        { rewardTypeId: rewardTypeId, } : 
        {};
    
    const playerRewards = await db.Result.findAll({
        where: {
            playerId: userId,
        },
        include: {
            model: db.Object,
            include: {
                model: db.Reward,
                where: rewardWhereCondition,
                include: {
                    model: db.RewardType,
                }
            }
        }
    });

    return playerRewards;
}

const UserUsecase = {
    getPlayerData,
    getObjectPass, 
    getPlayerReward 
};

module.exports = UserUsecase;
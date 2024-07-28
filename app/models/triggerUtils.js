const db = require("../models");

const cal_score_from_rewards = async (objectId) => {
    try {
      const objectRewards = await db.ObjectReward.findAll({
        where: { objectId },
      });
  
      let scoreFromRewards = 0;
  
      for (const objectReward of objectRewards) {
        const quantity = objectReward.quantity;
        const rewardId = objectReward.rewardId;
        const reward = await db.Reward.findByPk(rewardId); // Await this call
  
        if (reward) {
          scoreFromRewards += reward.scoreValue * quantity; // Consider quantity in score calculation
        }
      }
  
      return scoreFromRewards;
    } catch (error) {
      console.error('Error calculating score from rewards:', error);
      throw error;
    }
  };
  

module.exports = {
  cal_score_from_rewards,
};

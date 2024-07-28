const initialUtilsWithdb = (db) => {
  const cal_score_from_rewards = async (objectId) => {
    const objectRewards = await db.ObjectReward.findAll({
      where: { objectId },
      include: { model: db.Reward },
    });

    console.log('objectRewards:', objectRewards);

    let scoreFromRewards = 0;

    for (const objectReward of objectRewards) {
      const quantity = objectReward.quantity;  // warning: dataValues
      const reward = objectReward.reward; 

      if (reward) {
        scoreFromRewards += reward.scoreValue * quantity; // Consider quantity in score calculation
      }
    }

    return scoreFromRewards;
  };

  return {
      cal_score_from_rewards,
  }
}
  
module.exports = {
  initialUtilsWithdb
} 
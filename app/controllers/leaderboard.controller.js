const LeaderboardUsecase = require('../usecase/leaderboard.usecase');

const getAllPlayersScore = async (req, res) => {
    try{
        const playersScore = await LeaderboardUsecase.getAllPlayersScore();
        res.status(200).send(playersScore);
    }catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leaderboard."
        });
    }
};

module.exports = {
    getAllPlayersScore
};
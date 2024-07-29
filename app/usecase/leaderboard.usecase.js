const db = require("../models");
const _ = require("lodash");

const getAllPlayersScore = async () => {
  console.log("# Get all players' score");
  // id, fullName (user_account), avatar (user_infos), score (players)
  // sort score (top to down)
  let players = await db.UserAccount.findAll({
    attributes: ["id", "fullName"],
    include: [
      { model: db.Player, attributes: ["score"] },
      { model: db.UserInfo, attributes: ["avatar"] },
    ],
  });

  let simplifiedPlayers = players.map((player) => ({
    id: player.id,
    fullName: player.fullName,
    score: player.player.score,
    avatar: player.user_info.avatar,
  }));

  simplifiedPlayers = simplifiedPlayers.sort(function (a, b) {
    return b.score - a.score;
  });

  return simplifiedPlayers;
};

const LeaderboardUsecase = {
  getAllPlayersScore,
};

module.exports = LeaderboardUsecase;

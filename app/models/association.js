const { create_N_N_association, create_1_N_association, create_1_1_association } = require('../utils/CreateAssociation');


// ----------------- Association . association
const createDBAssociation = (db) => {
    // new Object associations - 29/7/2024
    create_1_1_association(db.Object, db.Object, 'parentId');
    create_1_1_association(db.Object, db.Location, 'id');
    
    // new PlayerObjectOpen associations - 29/7/2024
    create_1_1_association(db.PlayerObjectOpen, db.PlayerObjectOpen, 'parentId');
    create_N_N_association(db.Player, db.Object, db.PlayerObjectOpen);

    // [1] user_account -- [1] user_info
    create_1_1_association(db.UserAccount, db.UserInfo, 'id');
    
    // [1] user_account -- [N] role
    create_1_N_association(db.UserAccount, db.Role, 'userId');
    
    // [1] user_account -- [1] player
    create_1_1_association(db.UserAccount, db.Player, 'id');
    
    // [1] map -- [1] object 
    create_1_1_association(db.Object, db.Map, 'id');
    
    // [1] land -- [1] object 
    create_1_1_association(db.Object, db.Land, 'id');
    
    // [1] checkpoint -- [1] object 
    create_1_1_association(db.Object, db.Checkpoint, 'id');
    
    // [1] location -- [1] object
    create_1_1_association(db.Object, db.Location, 'id');
    
    // [N] object -- [N] asset --> object_assets(assetId, objectId)
    create_N_N_association(db.Object, db.Asset, db.ObjectAssets);

    create_1_N_association(db.GameType, db.Game, 'gameTypeId');
    create_1_N_association(db.Checkpoint, db.Game, 'checkpointId');

    create_1_1_association(db.Object, db.GameLeaderboard, 'id');
    create_1_N_association(db.GameLeaderboard, db.LeaderboardRecord, 'gameLeaderboardId');

    create_1_N_association(db.RewardType, db.Reward, 'rewardTypeId');
    
    create_N_N_association(db.Object, db.Reward, db.ObjectReward);
    create_N_N_association(db.Player, db.Reward, db.PlayerReward);
    console.log(">>> Create DB association <<<");
}

module.exports = createDBAssociation;
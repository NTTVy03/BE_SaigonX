const db = require("./app/models");
const { createGame } = require("./app/utils/CreateData");


// ---------------------- SAMPLE DATA

async function initialSampleData() {
  // ---------------------------------------------------------
  // USER ACCOUNT & INFO & ROLE & PLAYER

  // #### Acount 1: Triet
  const trietAccount = await db.UserAccount.create({
    username: 'TrietHuynh',
    // password: await bcrypt.hash('1234567890', 10),
    password: 'c+qOaBlxvL59hjs92YClUH1/Lpmfi7q5U/QFByPX326dJbAfT/3Ee25x0n4/rbwj4ADibI8zH66ObZfHzOJdgQ==',
    fullName: 'Triet'
  });
  
  const trietInfo = await db.UserInfo.create({
    id: trietAccount.id,
    avatar: 'avatar/MaleAvatar'
  });

  const trietRole1 = await db.Role.create({
    userId: trietAccount.id,
    role: 'user',
  })

  const trietRole2 = await db.Role.create({
    userId: trietAccount.id,
    role: 'admin',
  })

  const trietPlayer = await db.Player.create({
    id: trietAccount.id,
  })

  // #### Acount 2: Phat
  const phatAccount = await db.UserAccount.create({
    username: 'PhatCao',
    // password: await bcrypt.hash('1234567890', 10),
    password: 'c+qOaBlxvL59hjs92YClUH1/Lpmfi7q5U/QFByPX326dJbAfT/3Ee25x0n4/rbwj4ADibI8zH66ObZfHzOJdgQ==',
    fullName: 'Phat',
    email: 'quangphat18ti@gmail.com'
  });

  const phatInfo = await db.UserInfo.create({
    id: phatAccount.id,
    avatar: 'avatar/FemaleAvatar'
  });

  const phatRole = await db.Role.create({
    userId: phatAccount.id,
    role: 'user',
  });

  const phatPlayer = await db.Player.create({
    id: phatAccount.id,
  })

  // ---------------------------------------------------------
  // MAP & LAND & CHECKPOINT
  
  // #### Sai Gon Map
  const sgMap = await db.Object.create({
    type: 'map',
    code: "Sai Gon Map",
    isActive: true,
  });

  // #### Lands in Sai Gon Map
  // LAND 1 & checkpoints:  
   const benthanhLand = await db.Object.create(
    {
      type: 'land',
      code: "Cho Ben Thanh",
      isActive: true,
      parentId: sgMap.id,
    }
  );

  const benthanhCheckpoint1 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Cua Dong",
      isActive: true,
      parentId: benthanhLand.id,
    },
    {
      ordinal: 1,
    }
  );

  const benthanhCheckpoint2 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Cua Tay",
      isActive: true,
      parentId: benthanhLand.id,
    },
    {
      ordinal: 2,
    }
  );

  // LAND 2 & checkpoints:  
  const dinhdoclapLand = await db.Object.create(
    {
      type: 'land',
      code: "Dinh Doc Lap",
      isActive: true,
      parentId: sgMap.id,
    }
  )

  const dinhdoclapCheckpoint1 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong hop noi cac",
      isActive: true,
      parentId: dinhdoclapLand.id,
    },
    {
      ordinal: 1,
    }
  );

  const dinhdoclapCheckpoint2 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong tiep khach",
      isActive: true,
      parentId: dinhdoclapLand.id,
    },
    {
      ordinal: 2,
    }
  );

  const dinhdoclapCheckpoint3 = await db.Object.create(
    {
      type: 'checkpoint',
      code: "Phong dai yen",
      isActive: true,
      parentId: dinhdoclapLand.id,
    },
    {
      ordinal: 3,
    }
  );

  // ------------------------------------------------------------
  const haNoiMap = await db.Object.create({
    type: 'map',
    code: "Ha Noi Map",
    isActive: false,
  });

    // ------------------------------------------------------------
    const dalatMap = await db.Object.create({
      type: 'map',
      code: "Da Lat Map",
      isActive: true,
    });

  // ---------------------------------------------------------
  // LOCATION

  const location_sgMap = await db.Location.create({
    id: sgMap.id,
    lat: 10.775556,
    lng: 106.701944,
    radius: 20000,
  });

  const location_benthanhLand = await db.Location.create({
    id: benthanhLand.id,
    lat: 10.772759203799472,
    lng: 106.69797788006473,
    radius: 1000,
  });

  const location_benthanhCheckpoint1 = await db.Location.create({
    id: benthanhCheckpoint1.id,
    lat: 10.772747861891759,
    lng:  106.698437760696,
    radius: 5,
  });

  const location_benthanhCheckpoint2 = await db.Location.create({
    id: benthanhCheckpoint2.id,
    lat: 10.772317895446271,
    lng: 106.69769448596294,
    radius: 5,
  });

  const location_dinhdoclapLand = await db.Location.create({
    id: dinhdoclapLand.id,
    lat: 10.777289298168423, 
    lng: 106.69526990890068,
    radius: 1000,
  });

  const location_dinhdoclapCheckpoint1 = await db.Location.create({
    id: dinhdoclapCheckpoint1.id,
    lat: 10.777289298168392, 
    lng: 106.69526990890101,
    radius: 5,
  });

  const location_dinhdoclapCheckpoint2 = await db.Location.create({
    id: dinhdoclapCheckpoint2.id,
    lat: 10.777289298168201, 
    lng: 106.69526990890168,
    radius: 5,
  });

  const location_dinhdoclapCheckpoint3 = await db.Location.create({
    id: dinhdoclapCheckpoint3.id,
    lat: 10.777289298168605, 
    lng: 106.69526990890118,
    radius: 5,
    jsonData: {
      description: "this (lat,lng) is not correct",
    }
  });

  // ---------------------------------------------------------
  // ASSET & OBJECT_ASSETS
  const asset1 = await db.Asset.create({
    type: 'image', // 'video'
    src: "https://shorturl.at/vIdI8"
  });

  const asset2 = await db.Asset.create({
    type: 'image', // 'video'
    src: "https://shorturl.at/vIdI8"
  });

  const asset3 = await db.Asset.create({
    type: 'video',
    src: "https://i.pinimg.com/originals/70/fb/17/70fb17b1b4fa1c35a3e9a552babdfef5.gif"
  });

  const asset4 = await db.Asset.create({
    type: 'video',
    src: "https://i.pinimg.com/originals/70/fb/17/70fb17b1b4fa1c35a3e9a552babdfef5.gif"
  });

  // add object asset here
  sgMap.addAsset(asset1);
  
  benthanhLand.addAsset(asset2);
  benthanhLand.addAsset(asset3);

  // benthanhCheckpoint1.addAsset(...);
  // benthanhCheckpoint2.addAsset(...);

  dinhdoclapLand.addAsset(asset1);

  dinhdoclapCheckpoint1.addAsset(asset4);
  // dinhdoclapCheckpoint2.addAsset(...);
  // dinhdoclapCheckpoint3.addAsset(...);

  // ---------------------------------------------------------
  // GAME TYPES
  const hanhDongType = await db.GameType.create({
    code: 'hanh dong'
  });

  const nhapVaiType = await db.GameType.create({
    code: 'nhap vai'
  });

  const moPhongType = await db.GameType.create({
    code: 'mo phong'
  });

  // GAMES

  const banXeTankGame = await createGame('ban xe tank', nhapVaiType.id, dinhdoclapCheckpoint1.id)
  
  const ghepAnhGame = await createGame('ghep anh', moPhongType.id, benthanhCheckpoint1.id)
  
  const xeTankTongCongGame = await createGame('xe tank tong cong', moPhongType.id, dinhdoclapCheckpoint2.id)
  
  const banDichGame = await createGame('ban dich', nhapVaiType.id, benthanhCheckpoint2.id)

  const canBaangTrungGame = await createGame('can bang trung', moPhongType.id, dinhdoclapCheckpoint3.id)

  // ---------------------------------------------------------
  // REWARD TYPES
  const vuKhiRewardType = await db.RewardType.create({
    code: 'vu khi'
  });

  const daQuyRewardType = await db.RewardType.create({
    code: 'da quy'
  });

  // REWARDS
  const kiemReward = await db.Reward.create({
    code: 'kiem',
    scoreValue: 100,
    rewardTypeId: vuKhiRewardType.id,
  })

  const sungReward = await db.Reward.create({
    code: 'sung',
    scoreValue: 150,
    rewardTypeId: vuKhiRewardType.id,
  })

  const daDoReward = await db.Reward.create({
    code: 'da do',
    scoreValue: 70,
    rewardTypeId: daQuyRewardType.id,
  })

  const daXanhReward = await db.Reward.create({
    code: 'da xanh',
    scoreValue: 90,
    rewardTypeId: daQuyRewardType.id,
  })

  // ---------------------------------------------------------
  // OBJECT REWARDS

  // saigon Map rewards
  const kiem_sgMap_reward = await db.ObjectReward.create({
    objectId: sgMap.id,
    rewardId: kiemReward.id,
    quantity: 5,
  });
  
  const daxanh_sgMap_reward = await db.ObjectReward.create({
    objectId: sgMap.id,
    rewardId: daXanhReward.id,
    quantity: 10,
  });

  // benthanh Land rewards
  const sung_benthanhLand_reward = await db.ObjectReward.create({
    objectId: benthanhLand.id,
    rewardId: sungReward.id,
    quantity: 3,
  });
  
  // benthanh Checkpoints rewards
  const dado_benthanhCheckoint1_reward = await db.ObjectReward.create({
    objectId: benthanhCheckpoint1.id,
    rewardId: daDoReward.id,
    quantity: 1,
  });

  const daxanh_benthanhCheckoint2_reward = await db.ObjectReward.create({
    objectId: benthanhCheckpoint2.id,
    rewardId: daXanhReward.id,
    quantity: 1,
  });

  // dinhdoclap Land rewards
  const kiem_dinhdoclapLand_reward = await db.ObjectReward.create({
    objectId: dinhdoclapLand.id,
    rewardId: kiemReward.id,
    quantity: 2,
  });
  
  // dinhdoclap Checkpoints rewards
  const sung_dinhdoclapCheckoint1_reward = await db.ObjectReward.create({
    objectId: dinhdoclapCheckpoint1.id,
    rewardId: sungReward.id,
    quantity: 1,
  });

  const dado_dinhdoclapCheckoint2_reward = await db.ObjectReward.create({
    objectId: dinhdoclapCheckpoint2.id,
    rewardId: daDoReward.id,
    quantity: 2,
  });

  const daxanh_dinhdoclapCheckoint3_reward = await db.ObjectReward.create({
    objectId: dinhdoclapCheckpoint3.id,
    rewardId: daXanhReward.id,
    quantity: 1,
  });

  
  // ---------------------------------------------------------
  // PLAYER MAP OPEN
  const trietPlayerMapSaigon = await db.PlayerObjectOpen.create({
    playerId: trietAccount.id,
    objectId: sgMap.id,
  });
  const trietPlayerMapHanoi = await db.PlayerObjectOpen.create({
    playerId: trietAccount.id,
    objectId: haNoiMap.id,
  });
  const trietPlayerMapDaLat = await db.PlayerObjectOpen.create({
    playerId: trietAccount.id,
    objectId: dalatMap.id,
  });

  const phatPlayerMapSaiGon = await db.PlayerObjectOpen.create({
    playerId: phatAccount.id,
    objectId: sgMap.id,
  })

  // ---------------------------------------------------------
  // PLAYER_LAND_OPENS
  const trietPlayerBenThanhLand = await db.PlayerObjectOpen.create({
    parentId: trietPlayerMapSaigon.id,
    playerId: trietAccount.id,
    objectId: benthanhLand.id,
  });
  // const BenThanhLandUpdateIsPass = await trietPlayerBenThanhLand.update({
  //   isPassed: true,
  //   score: 10,
  // });
  // await BenThanhLandUpdateIsPass.save();
  

  const trietPlayerDinhDoclapLand = await db.PlayerObjectOpen.create({
    parentId: trietPlayerMapSaigon.id,
    playerId: trietAccount.id,
    objectId: dinhdoclapLand.id,
  });

  // const DinhDoclapLandupdateIsPass = await trietPlayerDinhDoclapLand.update({
  //   isPassed: true,
  //   score: 100,
  // });
  // await DinhDoclapLandupdateIsPass.save();

  const phatPlayerBenThanhLand = await db.PlayerObjectOpen.create({
    parentId: phatPlayerMapSaiGon.id,
    playerId: phatAccount.id,
    objectId: benthanhLand.id,
  })
  
  // ---------------------------------------------------------
  // PLAYER CHECKPOINT OPEN

  // Triet open checkpoints of benthanh Land
  const triet_benthanhCheckpoint1 = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: trietPlayerBenThanhLand.id,
    objectId: benthanhCheckpoint1.id,
    playerId: trietAccount.id,
  })

  const triet_benthanhCheckpoint2 = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: trietPlayerBenThanhLand.id,
    objectId: benthanhCheckpoint2.id,
    playerId: trietAccount.id,
  })

  // // Triet open checkpoints of dinhdoclap Land
  const triet_dinhdoclapCheckpoint1 = await db.PlayerObjectOpen.create({
    // score: 80,
    parentId: trietPlayerDinhDoclapLand.id,
    objectId: dinhdoclapCheckpoint1.id,
    playerId: trietAccount.id,
  })

  const triet_dinhdoclapCheckpoint2 = await db.PlayerObjectOpen.create({
    // score: 100,
    parentId: trietPlayerDinhDoclapLand.id,
    objectId: dinhdoclapCheckpoint2.id,
    playerId: trietAccount.id,
  })

  const triet_dinhdoclapCheckpoint3 = await db.PlayerObjectOpen.create({
    // score: 50,
    parentId: trietPlayerDinhDoclapLand.id,
    objectId: dinhdoclapCheckpoint3.id,
    playerId: trietAccount.id,
  })

  // // Phat open checkpoints in benthanh Land
  const phat_benthanhCheckpoint1 = await db.PlayerObjectOpen.create({
    // score: 101,
    parentId: phatPlayerBenThanhLand.id,
    objectId: benthanhCheckpoint1.id,
    playerId: phatAccount.id,
  })

  const phat_benthanhCheckpoint2 = await db.PlayerObjectOpen.create({
    // score: 65,
    parentId: phatPlayerBenThanhLand.id,
    objectId: benthanhCheckpoint2.id,
    playerId: phatAccount.id,
  })

  // ---------------------------------------------------------
  // PLAYER GAME OPEN

  // Triet open games of benthanh Land
  const triet_benthanhCheckpoint1Game = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: triet_benthanhCheckpoint1.id,
    objectId: ghepAnhGame.id,
    playerId: trietAccount.id,
  })

  const triet_benthanhCheckpoint2Game = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: triet_benthanhCheckpoint2.id,
    objectId: banDichGame.id,
    playerId: trietAccount.id,
  })

  // Phat open games of benthanh Land
  const phat_benthanhCheckpoint1Game = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: phat_benthanhCheckpoint1.id,
    objectId: ghepAnhGame.id,
    playerId: phatAccount.id,
  })

  const phat_benthanhCheckpoint2Game = await db.PlayerObjectOpen.create({
    // score: 0,
    parentId: phat_benthanhCheckpoint2.id,
    objectId: banDichGame.id,
    playerId: phatAccount.id,
  })
  
  /// check trigger isPass (Only for testing)
  // await trietPlayerBenThanhLand.update({ isPassed: true });
  // await trietPlayerDinhDoclapLand.update({ isPassed: true });
}

module.exports = initialSampleData;
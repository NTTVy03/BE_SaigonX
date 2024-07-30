const { ObjectType } = require("../type/enum/ObjectType");

const createDBTrigger = (db) => {
    const { createMap, createLand, createCheckpoint, createGame } = db.createUtils;
    db.Object.addHook('afterCreate', 'createChildData',  async (object, options) => {
      const createChildObject = async () => {
        const type = object.dataValues['type'];
      
        switch (type) {
          case ObjectType.MAP: {
            await createMap({  id: object.id, ...options, })
            break;
          }
          case ObjectType.LAND: {
            await createLand({  id: object.id, ...options, })
            break;
          }
          case ObjectType.CHECKPOINT: {
            await createCheckpoint({  id: object.id, ...options, })
            break;
          }   

          case ObjectType.GAME : {
            await createGame({  id: object.id, ...options, })
            break;
          }
        }
      }
      await createChildObject();
    });

    db.Object.addHook('afterCreate',  'increaseNumChild', async (object, options) => {
      const addNumChild = async() => {
        const parentId = object.dataValues['parentId'];
        if(!parentId) return;

        const parentObject = await db.Object.findByPk(parentId);
        if (parentObject) {
          await parentObject.increment('numChild');
        }
      }

      await addNumChild();
    });
  
    db.PlayerObjectOpen.addHook(
      "afterSave", 
      'processChange',
      async (playerObjectOpen, options) => {
        if (playerObjectOpen.changed("process")) {
          const currentValue = playerObjectOpen.process;
          // console.log(`Process ${playerObjectOpen.id}: ${currentValue}`);
  
          try{
            const object = await db.Object.findByPk(playerObjectOpen.objectId);
            if(object.numChild == currentValue && playerObjectOpen.isPassed == false){
              playerObjectOpen.isPassed = true;
              // console.log('playerObjectOpen: ', playerObjectOpen.dataValues);
              // await playerObjectOpen.update({ isPassed: true });
              // console.log(`\t ${playerObjectOpen.id} isPassed: ${playerObjectOpen.isPassed}`);
            }
          }catch(error){
            console.error("Error updating player process:", error);
          }
        }
      }
    );

  // Trigger: PlayerObjectOpen.isPass (false --> true)
  db.PlayerObjectOpen.addHook(
    "afterSave",
    'isPassedChange',
    async (playerObjectOpen, options) => {
      const { cal_score_from_rewards } = db.triggerUtils;

      const getReward = () => {

      }
      const updateScore = async () => {
        const rewardScore = await cal_score_from_rewards(playerObjectOpen.objectId);
        const newScore = playerObjectOpen.score + rewardScore;
        playerObjectOpen.score = newScore;
        console.log("\t update score: ", newScore);
      }
      const updateParentProcess = async () => {
        if(!playerObjectOpen.parentId) return;
        const parent = await db.PlayerObjectOpen.findByPk( playerObjectOpen.parentId );

        if(!parent) return;
        parent.process = parent.process + 1;
        console.log('\t parent process change:', parent.id, ' ', parent.process + 1);
        await parent.save();
        console.log(parent);
      }
      // check if isPassed changed from false to true
      if (playerObjectOpen.changed("isPassed")) {
        const previousValue = playerObjectOpen._previousDataValues.isPassed;
        const currentValue = playerObjectOpen.isPassed;

        if (previousValue === false && currentValue === true) {
          // console.log("\t isPassed changed from false to true");
          console.log(`IsPassed: `, playerObjectOpen.id);

          try {
            getReward();
            await updateScore();      
            await updateParentProcess();              
          } catch (error) {
            console.error("Error in afterUpdate hook:", error);
            // Handle the error as needed, for example by throwing an error:
            // throw new Error('Failed to update parent process and isPassed status.');
          }
        } else {
          // handle case where the change is not from false to true
          console.error("isPassed did not change from false to true");
          // Optionally throw an error or handle this case appropriately
        }
      }
    }
  );

  // Trigger: update Player.score when PlayerObjectOpen.score update
  db.PlayerObjectOpen.addHook(
    "afterSave",
    'scoreChange',
    async (playerObjectOpen, options) => {
      if (playerObjectOpen.changed("score")) {
        const previousValue = playerObjectOpen._previousDataValues.score || 0;
        const currentValue = playerObjectOpen.score;
        console.log(`Score: ${playerObjectOpen.id} ${previousValue} -> ${currentValue}`);
        // console.log('playerObjectOpen: ', playerObjectOpen);

        if (previousValue !== currentValue) {
          const delta = currentValue - previousValue;
          const playerId = playerObjectOpen.playerId;

          try {
            const player = await db.Player.findByPk(playerId);
            if (player) {
              player.score += delta;
              await player.save(); // Await save operation
              console.log("\t", player.id, ' ', player.score);
            } else {
              console.error(`Player with ID ${playerId} not found.`);
            }
          } catch (error) {
            console.error("Error updating player score:", error);
          }
        }
      }
    }
  );
};

module.exports = createDBTrigger;

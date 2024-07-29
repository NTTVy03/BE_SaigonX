const { ObjectType } = require("../type/enum/ObjectType");

const createDBTrigger = (db) => {
    const { createMap, createLand, createCheckpoint, createGame } = db.createUtils;
    db.Object.addHook('afterCreate',  async (object, options) => {
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

    db.Object.addHook('afterCreate',  async (object, options) => {
      const addNumChild = async() => {
        const parentId = object.dataValues['parentId'];
        if(!parentId) return;

        const parentObject = await db.Object.findByPk(parentId);
        if (parentObject) {
          parentObject.increment('numChild');
        }
      }

      await addNumChild();
    });
  
  // Trigger: PlayerObjectOpen.isPass (false --> true)
  db.PlayerObjectOpen.addHook(
    "afterCreate",
    async (playerObjectOpen, options) => {
      const { cal_score_from_rewards } = db.triggerUtils;
      // check if isPassed changed from false to true
      if (playerObjectOpen.changed("isPassed")) {
        const previousValue = playerObjectOpen._previousDataValues.isPassed;
        const currentValue = playerObjectOpen.isPassed;

        if (previousValue === false && currentValue === true) {
          // console.log("\t isPassed changed from false to true");
          console.log("playerObjectOpen change isPassed: ", playerObjectOpen);

          try {
            // receive rewards - @TODO: Dummy implementation

            // calculate score
            const newScore =
              playerObjectOpen.score +
              await cal_score_from_rewards(playerObjectOpen.objectId) + 1;

            console.log("newScore: ", newScore);
            // update PlayerObjectOpen.score
            playerObjectOpen.score = newScore;
            // playerObjectOpen.setScore(newScore);
            await playerObjectOpen.save(); // Await save operation

            // increase parent (Player_Object_Open) process
            if(!playerObjectOpen.parentId) return;
            const parent = await db.PlayerObjectOpen.findByPk(
              playerObjectOpen.parentId
            );

            if(!parent) return;
            await parent.increment("process");

            // change parent isPass if parent process equals parent numChild
            const parentProcess = parent.process;
            const parentNumChild = (await db.Object.findByPk(parent.objectId))
              .numChild;

            if (parentNumChild > 0 && parentProcess === parentNumChild) {
              parent.isPassed = true;
              await parent.save(); // Await save operation
            }
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
    "afterUpdate",
    async (playerObjectOpen, options) => {
      if (playerObjectOpen.changed("score")) {
        console.log("PlayerObjectOpen score changed: ", playerObjectOpen);
        const previousValue = playerObjectOpen._previousDataValues.score;
        const currentValue = playerObjectOpen.score;

        if (previousValue !== currentValue) {
          const delta = currentValue - previousValue;
          const playerId = playerObjectOpen.playerId;

          try {
            const player = await db.Player.findByPk(playerId);
            if (player) {
              player.score += delta;
              await player.save(); // Await save operation
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

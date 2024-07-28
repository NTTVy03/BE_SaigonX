const { ObjectType } = require("../type/enum/ObjectType");
const { cal_score_from_rewards } = require("./triggerUtils");

const createDBTrigger = (db) => {
  db.Object.addHook("afterCreate", async (object, options) => {
    const type = object.dataValues["type"];

    switch (type) {
      case ObjectType.MAP: {
        await db.Map.create({
          id: object.id,
        });

        break;
      }
      case ObjectType.LAND: {
        await db.Land.create({
          id: object.id,
          mapId: options.mapId,
        });

        break;
      }
      case ObjectType.CHECKPOINT: {
        await db.Checkpoint.create({
          id: object.id,
          landId: options.landId,
          ordinal: options.ordinal,
        });

        break;
      }

      case ObjectType.GAME: {
        await db.Game.create({
          id: object.id,
          gameTypeId: options.gameTypeId,
          checkpointId: options.checkpointId,
        });

        break;
      }
    }
  });

  // Increase num_land in map when create a land
  db.Land.addHook("afterCreate", async (land, options) => {
    const mapId = land.dataValues.mapId;

    map = await db.Map.findByPk(mapId);

    if (map === null) {
      // return error Map not found
      console.log("Map with id= {} not found", mapId);
    } else {
      map.increment("num_land");
      // console.log("NUM LAND = {}", map.num_land);
    }
  });

  // Trigger: PlayerObjectOpen.isPass (false --> true)
  db.PlayerObjectOpen.addHook(
    "afterUpdate",
    async (playerObjectOpen, options) => {
      // check if isPassed changed from false to true
      if (playerObjectOpen.changed("isPassed")) {
        const previousValue = playerObjectOpen._previousDataValues.isPassed;
        const currentValue = playerObjectOpen.isPassed;

        if (previousValue === false && currentValue === true) {
          try {
            // receive rewards - @TODO: Dummy implementation

            // calculate score
            const newScore =
              playerObjectOpen.score +
              cal_score_from_rewards(playerObjectOpen.objectId);

            // update PlayerObjectOpen.score
            playerObjectOpen.score = newScore;
            await playerObjectOpen.save(); // Await save operation

            // increase parent (Player_Object_Open) process
            const parent = await db.PlayerObjectOpen.findByPk(
              playerObjectOpen.parentId
            );
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

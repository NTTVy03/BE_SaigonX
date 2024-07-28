const NAME = "Checkpoint";

const createModel = (sequelize, Sequelize) => {
  const Object = require("./Object.model").createModel(sequelize,Sequelize);
  // Trigger when CREATE: Count num_checkpoint of Land

  const Checkpoint = sequelize.define('checkpoint', {
    // [DONE] FK: [1] land -- [N] checkpoint NOT NULL

    id: {
      // [DONE] PK = FK: [1] checkpoint -- [1] object 
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Object,
        key: 'id'
      }
    },
    ordinal: {
        // index of checkpoint in land (1,2,3...)
        // how to check unique for a checkpoint in a land
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  });
  
  return Checkpoint;
};

module.exports = {
  createModel,
  NAME
}
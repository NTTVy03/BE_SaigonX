const NAME = "Object";

const createModel = (sequelize, Sequelize) => {
  const Object = sequelize.define("object", {
    // id: auto field
    type: {
      type: Sequelize.ENUM(["map", "land", "checkpoint", "game"]),
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    // [DONE] parentId: association 1-1 to parent object
    numChild: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    // [DONE] locationId: association 1-1 to Location
    jsonData: {
      type: Sequelize.JSON,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Object;
};

module.exports = {
  createModel,
  NAME,
};

const NAME = "Result";

const createModel = (sequelize, Sequelize) => {
  const Result = sequelize.define('result', {
    score: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    jsonData: {
      type: Sequelize.JSON
    },
  });
  
  return Result;
};

module.exports = {
  createModel,
  NAME
}
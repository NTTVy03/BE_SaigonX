const NAME = "Location";

const createModel = (sequelize, Sequelize) => {
  const Location = sequelize.define('location', {
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lng: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    radius: {
        // unit: m
        type: Sequelize.FLOAT,
        allowNull: false
    },
    jsonData: {
        type: Sequelize.JSON
    }
  });
  
  return Location;
};

module.exports = {
  createModel,
  NAME
}
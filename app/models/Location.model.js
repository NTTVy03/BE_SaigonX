const NAME = "Location";

const createModel = (sequelize, Sequelize) => {
  const Location = sequelize.define('location', {
    id: {
      // [DONE] PK = FK: [1] object - [1] location NOT NULL
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Object,
        key: 'id'
      }
    },
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
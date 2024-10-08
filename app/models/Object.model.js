const NAME = "Object";

const createModel = (sequelize, Sequelize) => {
  const Object = sequelize.define('object', {
    // [DONE] FK: [N] asset - [N] object
    // which is the through table???
    
    // typeId = id --> unuse field
    // typeId: { 
    //   // [1] map/land/checkpoint - [1] object
    //   // value get from map/land/checkpoint TRIGGER
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
    type: {
      type: Sequelize.ENUM(['map', 'land', 'checkpoint', 'game']),
      allowNull: false,
    },
    code: {
      // ~ name
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  },
);
  
  return Object;
};

module.exports = {
  createModel,
  NAME
}
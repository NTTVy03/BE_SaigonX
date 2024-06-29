const NAME = "UserAccount";

const createModel = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define('user_account', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user"
    }
  });
  
  return UserAccount;
};

class Helper {
  constructor(Model) {
    this.Model = Model;
  }

  async create(data) {
    if (!data.fullName)  // should do it at controller
      sampleData.fullName = sampleData.username;

    try{
      let data = await this.Model.create(data);
      console.log("Sample data created: ", data.dataValues);
    }catch(err){
      console.log("Failed to create sample data: ", err);
    }
  }

  async createDefault() {
    const sampleData = {
      username: "admin",
      password: "admin",
    }
    this.create(sampleData);
  }
}


module.exports = {
  createModel,
  NAME, 
  Helper
}
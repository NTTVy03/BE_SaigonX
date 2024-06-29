exports.createModel = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define(
    'user_info',
    {
      // FK: [1] user_account -- [1] user_info
      avatar: {
        type: Sequelize.STRING,
      },
      jsonData: {
        type: Sequelize.JSON
      }
    }
  )

  return UserInfo;
}

exports.createSample = (Model, sampleData) => {
  Model.create(sampleData)
    .then(data => {
      console.log("Sample data created: ", data.dataValues);
    })
    .catch(err => {
      console.log("Failed to create sample data: ", err);
    });
}

exports.createDefaultSample = (Model) => {
  const sampleData = {
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    jsonData: {
      "phone": "0123456789",
      "address": "123 Nguyen Van Linh, District 7, HCMC"
    }, 
    user_id: 1
  }
  this.createSample(Model, sampleData);
}

exports.NAME = "UserInfo";
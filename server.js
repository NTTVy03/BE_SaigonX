require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

// ---------------------- DATABASE
const db = require("./app/models");

db.sequelize.sync({
    force: true
    // alter: true    // alter: true will update the table schema
})
  .then(() => {
    console.log("Synced db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// ---------------------- ROUTES
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SaigonX Back-end." });
});

require("./app/routes/auth.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // ---------------------- SAMPLE DATA
function initial() {
  // ### Create sample data
  // db.VStudent.create(
  //   {
  //     name: "Vy",
  //     vstudent_card: {seri: "21120168"},
  //   },
  //   {
  //     include: [db.VStudentCard]
  //   }
  // );

  // Sample object
  db.Object.create({type: 'map'});
  db.Object.create({type: 'checkpoint'});
  db.Object.create({type: 'land'});
  db.Object.create({type: 'map'});

  const UserAccount = require("./app/models/UserAccount.model.js");
  const UserInfo    = require("./app/models/UserInfo.model.js");

  // UserAccount.createDefaultSample(db[UserAccount.NAME]);
  // UserInfo.createDefaultSample(db[UserInfo.NAME]);
}
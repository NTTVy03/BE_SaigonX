require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");

const db = require("./app/models");
const initialSampleData = require('./sampleData');


const app = express();
app.use(express.json());
app.use(cors({}))

// ---------------------- DATABASE
db.sequelize.sync({
    force: true
    // alter: true    // alter: true will update the table schema
})
.then(() => {
  console.log("Synced db.");
  initialSampleData();
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// ---------------------- ROUTES ------------
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SaigonX Back-end." });
});
require("./app/routes/auth.route")(app); // auth route


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

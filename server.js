require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");

const { authenticateJWT } = require('./app/middleware/auth.middleware');

const db = require("./app/models");
const initialSampleData = require('./sampleData');


const app = express();
app.use(express.json());
app.use(cors({}))
app.use(cookieParser());  // for parsing cookies

// ---------------------- DATABASE
db.sequelize.sync({
    force: true
    // alter: true    // alter: true will update the table schema
})
.then(() => {
  console.log("Synced db.");
  // initialSampleData();
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// ---------------------- ROUTES ------------
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SaigonX Back-end." });
});

const authRouter = require("./app/routes/auth.route"); // /api/auth
app.use("/api/auth", authRouter);

const userRouter = require("./app/routes/user"); // /api/user
app.use('/api/user', authenticateJWT, userRouter);

const mapRouter = require("./app/routes/map.route"); // /api/map
app.use("/api/map", mapRouter);

const landRouter = require("./app/routes/land.route"); // /api/land
app.use("/api/land", landRouter);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express-session configuration
app.use(session({
    secret:  process.env.SESSION_SECRET, // Provide a secret key here
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// ---------------------- DATABASE
const db = require("./app/models");

db.sequelize.sync({
    force: true
    // alter: true    // alter: true will update the table schema
})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// uncomment to delete database
// drop the table if it already exists 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

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
// function initial() {
//   // examle code to add data to category table
//   const categoryData = [
//     handcraft,
//     Photography,
//     Business,
//     Data,
//     Marketing,
//     VideoAndAnimation,
//     MusicAndAudio,
//     ProgrammingAndTech,
//     WritingAndTranslation,
//     GraphicAndDesign
//   ]

//   const create_category = () => {
//     categoryData.forEach((category) => {
//       db.categories.create(
//         category,
//         { include: [ db.subcategories ] }
//       );
//     });
//   }

//   create_category;
// }

// // initial();
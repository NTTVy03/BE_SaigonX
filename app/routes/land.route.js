const express = require('express');
const router = express.Router();

const landController = require('../controllers/land.controller');

router.get("/:landId", landController.getLandDetailById);

module.exports = router;
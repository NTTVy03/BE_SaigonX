const express = require('express');
const router = express.Router();

const landController = require('../controllers/land.controller');

router.get("/", landController.getLandDetailById);
router.get('/:landId')

module.exports = router;
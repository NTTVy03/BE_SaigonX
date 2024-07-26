const express = require('express');
const router = express.Router();

const { UserLandController } = require('../../controllers/user') 
const { isOpenLand } = require('../../middleware/land.middleware');

router.get('/', (req, res) => {
    res.json({ message: 'User Land Route' });
});
router.get("/:landId"  , isOpenLand, UserLandController.getLandActiveDetailById);



module.exports = router;
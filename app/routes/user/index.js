const userInforRoute = require('./user.route');
const userMapRoute = require('./user.map.route');

const express = require('express');
const router = express.Router();

router.use('/', userInforRoute);
router.use('/map', userMapRoute);

module.exports = router;
const userInforRoute = require('./user.route');
const userMapRoute = require('./user.map.route');
const userResultRoute = require('./user.result.route');

const express = require('express');
const router = express.Router();

router.use('/', userInforRoute);
router.use('/map', userMapRoute);
router.use('/result', userResultRoute);

module.exports = router;
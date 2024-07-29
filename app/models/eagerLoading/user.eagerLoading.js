const db = require('../');

const players = {
    model: db.Player,
    required: true,
};

const userEagerLoading = {
    players
};

module.exports = userEagerLoading;
const NAME = "VStudent";

const createModel = (sequelize, Sequelize) => {
    const VStudent = sequelize.define('vstudent', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return VStudent;
}

module.exports = {
    createModel,
    NAME
}
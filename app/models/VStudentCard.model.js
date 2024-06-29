const NAME = "VStudentCard";

const createModel = (sequelize, Sequelize) => {
    const VStudentCard = sequelize.define('vstudent_card', {
        seri: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return VStudentCard;
}

module.exports = {
    createModel,
    NAME
}
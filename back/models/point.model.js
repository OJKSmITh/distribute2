module.exports = (sequelize, Sequelize) => {
    class Point extends Sequelize.Model {
        static initialize() {
            return this.init ({
                userPoint : {
                    type : Sequelize.INTEGER,
                },
            },
            {
                sequelize,
            })
        }
    }
    Point.initialize();
};
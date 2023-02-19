module.exports = (sequelize, Sequelize) => {
    class Picture extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    pictureIdx: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    picture: {
                        type: Sequelize.TEXT,
                        allowNull: true,
                    },
                },
                {
                    sequelize,
                }
            )
        }
        static associate(models) {
            this.belongsTo(models.Board, {
                foreignKey: "boardIdx",
            })
        }
    }
    Picture.initialize()
}

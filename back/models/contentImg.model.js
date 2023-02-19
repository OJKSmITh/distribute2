module.exports = (sequelize, Sequelize) => {
    class ContentImg extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    contentImage: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                        primaryKey: true,
                    }

                },
                {
                    sequelize,
                }
            )
        }
        static associate(models) {
            this.belongsTo(models.Board, {
                foreignKey: "boardIdx"
            })
        }
    }
    ContentImg.initialize();
}
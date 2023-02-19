module.exports = (sequelize, Sequelize) => {
    class Notify extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    boardWriter: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    mainCd: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    boardIdx: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                    },
                    cmdContent: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    cmdWriter: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    readCheck: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        defaultValue: 1,
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
            // this.belongsTo(models.User, {
            //     foreignKey: "userId",
            // })
            // this.hasMany(models.Recomment, {
            //     foreignKey: "cmdIdx",
            // })
        }
    }
    Notify.initialize()
}

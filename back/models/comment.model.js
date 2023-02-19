module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model {
        static initialize() {
            return this.init({
                cmdIdx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                cmdContent: {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            },
                {
                    sequelize,
                })

        }
        static associate(models) {
            this.belongsTo(models.Board, {
                foreignKey: "boardIdx",
            })
            this.belongsTo(models.User, {
                foreignKey: "userId"
            })
            this.hasMany(models.Recomment,{
                foreignKey : "cmdIdx"
            })
        }
    }
    Comment.initialize()
}

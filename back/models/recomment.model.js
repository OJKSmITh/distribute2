module.exports = (sequelize, Sequelize) => {
    class Recomment extends Sequelize.Model {
        static initialize() {
            return this.init({
                cmdIdx:{
                    type: Sequelize.INTEGER,
                    allowNull:false
                },
                reCmdIdx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                recmdContent: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                userId:{
                    type: Sequelize.STRING(255),
                    allowNull:false
                }
            },
                {
                    sequelize,
                })

        }
        static associate(models) {
            this.belongsTo(models.Comment, {
                foreignKey: "cmdIdx"
            })
            this.belongsTo(models.User,{
                foreignKey: "userId"
            })
            
        }
    }
    Recomment.initialize()
}

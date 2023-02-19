module.exports = (sequelize, Sequelize) => {
    class Category extends Sequelize.Model {
        static initialize() {
            return this.init({
                mainCd: {
                    type: Sequelize.STRING(8),
                    primaryKey: true,
                },
                subCd: {
                    type: Sequelize.STRING(8),
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING(32),
                    allowNull: false
                },
                type: {
                    type: Sequelize.STRING(32),
                    allowNull: false
                }
            },
                {
                    sequelize,
                    tableName: "Category",
                    autoIncrement: false,
                })
        }
        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: {
                    type: Sequelize.STRING(8),
                    name: "cateCd"
                }
            })
            // this.hasMany(models.Board, {
            //     foreignKey: "categorySub"
            // })
        }
    }
    Category.initialize();
};

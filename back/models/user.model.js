module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    userPic: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    userId: {
                        type: Sequelize.STRING(255),
                        primaryKey: true,
                    },
                    userPw: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    userName: {
                        type: Sequelize.STRING(30),
                        allowNull: false,
                    },
                    nickName: {
                        type: Sequelize.STRING(30),
                        unique: true,
                    },
                    address: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    gender: {
                        type: Sequelize.STRING(8),
                        allowNull: false,
                    },
                    phoneNum: {
                        type: Sequelize.STRING(30),
                        allowNull: false,
                    },
                    userEmail: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    userIntro: {
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    provider: {
                        type: Sequelize.ENUM("local", "kakao"),
                        allowNull: false,
                        defaultValue: "local",
                    },
                    snsId: {
                        type: Sequelize.STRING(64),
                        allowNull: true,
                    },
                    userLevel: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0,
                    },
                    personalNotice: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0
                    },
                    userPoint: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0,
                    },
                    userBoard: {
                        type: Sequelize.INTEGER,
                        defaultValue: 0
                    }
                },
                {
                    sequelize,
                }
            )
        }
        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: "userId",
            })
            this.hasMany(models.Comment, {
                foreignKey: "userId",
            })
            this.hasMany(models.Chat, {
                foreignKey: "userId",
            })
            this.belongsToMany(models.Board, {
                through: "Liked",
                foreignKey: "userId",
            })
            this.hasMany(models.Recomment,{
                foreignKey: "userId"
            })
        }
    }
    User.initialize()
}

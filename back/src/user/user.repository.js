class UserRepository {
    constructor({ User, sequelize, Sequelize }) {
        this.User = User
        this.Board = sequelize.models.Board
        this.Comment = sequelize.models.Comment
        this.Liked = sequelize.models.Liked
        this.sequelize = sequelize
        this.queryTypes = Sequelize.QueryTypes
        this.Sequelize = Sequelize
    }

    async hotValue() {
        try {
            const userHot = await this.User.findAll({ order: this.sequelize.literal("userPoint DESC"), limit: 3, raw: true })
            return userHot
        } catch (e) {
            throw new Error(e)
        }
    }

    async addUser(payload) {
        try {
            const user = await this.User.create(payload, { raw: true })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }


    async checkId({ userId }) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    userId,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
    async checkNick({ nickName }) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    nickName,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async getInfo(userId) {
        try {
            const user = await this.User.findOne({
                raw: true,
                where: {
                    userId,
                },
            })
            return user
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateInfo(payload) {
        try {
            const [count, affecteRows] = await this.User.update(payload, {
                where: { userId: payload.userId },
                returning: true,
            })
            if (affecteRows) {
                const response = await this.User.findOne({
                    raw: true,
                    where: {
                        userId: payload.userId,
                    },
                })
                return response
            }
            if (affecteRows === 0) throw new Error("User not found, Please redirect your webpage")
        } catch (e) {
            throw new Error(e)
        }
    }

    async findSearch({ search }) {
        try {
            const Op = this.Sequelize.Op
            const response = await this.User.findAll({
                where: {
                    userId: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            const userCount = await this.User.count({
                where: {
                    userId: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            const boardCount = await this.Board.findAll({
                where: {
                    userId: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            return { response, userCount, boardCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }
    

    async findWriting({ userId, page }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = page * 5 - 4 === 1 ? 0 : page * 5 - 5
            const response = await this.Board.findAll({
                where: {
                    userId,
                },
                raw: true,
            })
            const findMain = (await this.Board.findAndCountAll({
                limit : 5,
                offset: indexValue,
                where: {
                    userId,
                },
                raw: true,
            })).rows
            return { response, findMain }
        } catch (e) {
            throw new Error(`Error while find writing Value: ${e.message}`)
        }
    }


    async findReaction({userId}){
        try {
            const myBoardResponse = await this.sequelize.query(`SELECT A.* From Board A JOIN Comment B ON A.boardIdx = B.boardIdx Where B.userId = "${userId}"`,{type: this.queryTypes.SELECT,})
            // const myLikeResponse = await this.sequelize.query(`SELECT A.* FROM Board A JOIN (SELECT A.boardIdx From Liked A JOIN User B ON A.userId = B.userId WHERE A.userId = "${userId}") B ON A.boardIdx = B.boardIdx;`,{type: this.queryTypes.SELECT,})
            const myLikeResponse = await this.sequelize.query(`SELECT A.*, B.createdAt, (SELECT COUNT(*) FROM Liked WHERE boardIdx = A.boardIdx) AS likedCount FROM Board A JOIN (SELECT * FROM Liked WHERE userId = "${userId}") C ON A.boardIdx = C.boardIdx JOIN User B ON C.userId = B.userId;`,{type: this.queryTypes.SELECT,})
            const myCommentResponse = await this.sequelize.query(`SELECT A.*, B.createdAt FROM Board A JOIN Comment B ON A.boardIdx = B.boardIdx WHERE B.userId = "${userId}"`, { type: this.queryTypes.SELECT })
            console.log('11',myCommentResponse)
            return {myBoardResponse, myLikeResponse,myCommentResponse}
        } catch (e) {
            throw new Error(`Error while find Reaction: ${e.message}`)
        }
    }
}

module.exports = UserRepository

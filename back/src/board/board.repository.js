class BoardRepository {
    constructor({
        sequelize: {
            models: { User, Board, Comment, Liked, Hash, Hashtag, Picture, Category, Recomment, Notify },
        },
        Sequelize,
        sequelize,
    }) {
        this.User = User
        this.Board = Board
        this.comment = Comment
        this.liked = Liked
        this.hash = Hash
        this.hashtag = Hashtag
        this.picture = Picture
        this.category = Category
        this.notify = Notify
        this.queryTypes = Sequelize.QueryTypes
        this.sequelize = sequelize
        this.Sequelize = Sequelize
        this.recomment = Recomment
        this.hashMake = async (boardIdx, hashArray) => {
            const destroyHashtag = await await this.hash.destroy({
                where: {
                    boardIdx,
                },
            })
            const hashContent = []
            for (let i = 0; i < hashArray.length; i++) {
                const result = hashArray[i]
                const newHashTag = await this.hashtag.findOrCreate({ where: { tag: result }, raw: true })
                let hashVal = newHashTag[0].hashTagIdx
                const newHash = await this.hash.findOrCreate({
                    where: { boardIdx, hashTagIdx: hashVal },
                    raw: true,
                })
            }
        }
    }
    // 글쓰기
    async createBoard(payload) {
        try {
            const { subject, content, mainCdValue, subCdValue, hashArray, userId } = payload
            const newBoard = (await this.Board.create({ subject, content, userId, cateCd: `${mainCdValue}${subCdValue}` })).get({ plain: true })
            const newHashTagVal = []
            const userInfo = await this.User.findAll({ where: { userId }, raw: true })
            const userPic = userInfo[0].userPic
            if (hashArray[0] === "") {
                let hashValue = null
                return { newBoard, hashValue }
            } else {
            const { boardIdx } = newBoard
            const newHashTag = await this.hashMake(boardIdx, hashArray)
            const hashValue = await this.sequelize.query(`SELECT A.boardIdx, B.tag FROM Hash A JOIN Hashtag B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = ${boardIdx}`, {
                type: this.queryTypes.SELECT,
            })
            newBoard.userPic = userPic
            const addUserPoint = await this.User.increment({ userPoint: 10 }, { where: { userId } })
            return { newBoard, hashValue, addUserPoint }
        }
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`)
        }
    }

    // view 페이지
    async findValue(payload) {
        try {
            const { boardIdx } = payload
            const response = await this.Board.findOne({ where: { boardIdx }, raw: true })
            let viewCount = response.viewCount
            const hashResponse = await this.sequelize.query(`SELECT A.boardIdx, B.tag FROM Hash A JOIN Hashtag B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = ${boardIdx}`, {
                type: this.queryTypes.SELECT,
            })
            const updateViewCount = await this.Board.update({ viewCount: viewCount + 1 }, { where: { boardIdx } })
            const commentResponse = await this.sequelize.query(
                `SELECT B.cmdIdx, B.cmdContent, B.boardIdx, B.userId, B.createdAt from Board A JOIN Comment B On (A.boardIdx = B.boardIdx) where A.boardIdx =${boardIdx} order by B.cmdIdx DESC`,
                {
                    type: this.queryTypes.SELECT,
                }
            )
            const commentLength = commentResponse.length
            const likedTable = await this.liked.findAll({
                where: {
                    boardIdx,
                },
                raw: true,
            })
            const likedUser = likedTable.map((x) => x.userId)
            const recmd = await this.sequelize.query(
                `SELECT A.cmdIdx, A.recmdContent, A.createdAt , A.userId FROM Recomment A JOIN (SELECT A.cmdIdx FROM Comment A JOIN Board B ON A.boardIdx = B.boardIdx WHERE A.boardIdx = ${boardIdx}) B ON A.cmdIdx = B.cmdIdx ORDER BY A.createdAt DESC `,
                {
                    type: this.queryTypes.SELECT,
                }
            )
            return { response, hashResponse, commentResponse, commentLength, likedUser, recmd }
        } catch (e) {
            throw new Error(`Error while find status: ${e.message}`)
        }
    }

    // 게시글 수정하기
    async changeView(payload) {
        try {
            const { subject, content, mainCdValue, subCdValue, hashArray, userId, boardIdx } = payload
            const response = await this.Board.update(
                { subject, content, cateCd: `${mainCdValue}${subCdValue}`, userId },
                {
                    where: {
                        boardIdx,
                    },
                }
            )

            if (!hashArray) {
                const hashDelete = await this.hash.destroy({
                    where: {
                        boardIdx,
                    },
                })
            } else {
                const newHashTag = await this.hashMake(boardIdx, hashArray)
                return newHashTag
            }
        } catch (e) {
            throw new Error(`Error while change status: ${e.message}`)
        }
    }

    // 게시글 지우기
    async deleteValue(payload) {
        try {
            const { boardIdx } = payload
            const boardResponse = await this.Board.destroy({ where: { boardIdx }, raw: true })
            return boardResponse
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }
    // 랜덤값 추출
    async randomValue() {
        try {
            const boardRandom = await this.sequelize.query(
                `SELECT A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, A.cateCd ,MIN(B.picture) AS picture
                FROM (
                  SELECT userId, subject, viewCount, liked, content, boardIdx, cateCd 
                  FROM Board 
                  ORDER BY RAND() LIMIT 7
                ) A 
                JOIN Picture B ON A.boardIdx = B.boardIdx 
                GROUP BY A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, A.cateCd`,
                { type: this.queryTypes.SELECT }
            )
            const randomUser = []
            const randomHash = []
            for (let i = 0; i < boardRandom.length; i++) {
                const randomUserid = boardRandom[i].userId
                const randomboardIdx = boardRandom[i].boardIdx
                const randomUserinfo = await this.User.findOne({ where: { userId: randomUserid }, raw: true })
                randomUser.push(randomUserinfo)
                const randomhashtagValue = await this.sequelize.query(`SELECT A.tag FROM Hashtag A JOIN Hash B ON A.hashTagIdx = B.hashTagIdx WHERE B.boardIdx =${randomboardIdx}`, {
                    type: this.queryTypes.SELECT,
                })
                randomHash.push(randomhashtagValue)
            }

            return { boardRandom, randomUser, randomHash }
        } catch (e) {
            throw new Error(`error while finding randomValue: ${e.message}`)
        }
    }

    // 카테고리별 게시판
    async findMainValue({ mainCdValue, pageNumber }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 5
            const allMainCd = await this.Board.count({
                where: {
                    cateCd: {
                        [Op.like]: `${mainCdValue}%`,
                    },
                },
            })
            const findMain = await this.Board.findAll({
                limit: 5,
                offset: indexValue,
                where: {
                    cateCd: {
                        [Op.like]: `${mainCdValue}%`,
                    },
                },
                raw: true,
            })
            const findSub = await this.sequelize.query(`SELECT DISTINCT cateCd FROM Board WHERE cateCd LIKE '${mainCdValue}%'`, { type: this.queryTypes.SELECT })
            return { findMain, allMainCd, findSub }
        } catch (e) {
            throw new Error(`Error while find pagingValue: ${e.message}`)
        }
    }

    // subcategory 정렬
    async categoryValue({ findValue, pageNumber, mainCdValue }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 5
            const subcateLength = await this.Board.count({
                where: {
                    cateCd: {
                        [Op.like]: `%${findValue}%`,
                    },
                },
            })
            const correctValue = await this.Board.findAll({
                limit: 5,
                offset: indexValue,
                where: {
                    cateCd: {
                        [Op.like]: `%${findValue}%`,
                    },
                },
                raw: true,
            })
            const findSub = await this.sequelize.query(`SELECT DISTINCT cateCd FROM Board WHERE cateCd LIKE '${mainCdValue}%'`, { type: this.queryTypes.SELECT })
            return { correctValue, subcateLength, findSub }
        } catch (e) {
            throw new Error(`Error while find category: ${e.message}`)
        }
    }

    // 인기게시물
    async hotValue() {
        try {
            const boardHot = await this.Board.findAll({ order: this.sequelize.literal("liked DESC"), limit: 3, raw: true })
            return boardHot
        } catch (e) {
            throw new Error(`error while finding hotValue: ${e.message}`)
        }
    }

    // user 정보 찾기
    async findUserInfo(payload) {
        const { userId } = payload
        const userInfo = await this.User.findOne({ userId, raw: true })
        return userInfo
    }

    // 좋아요 추가&삭제
    async insertLike(payload) {
        try {
            // userId, boarIdx, mainCD payload 담기
            const { userId, boardIdx, mainCd } = payload
            // user, boardIdx 일치하는 게시물의 좋아요 확인
            const liked = await this.liked.findOne({
                where: { userId, boardIdx },
            })
            // 좋아요가 이미 있으면 좋아요 제거
            if (liked) {
                await liked.destroy()
            } // 좋아요가 없으면 좋아요 추가
            else {
                await this.liked.create({
                    userId,
                    boardIdx,
                })
            }
            // boardIdx 매칭되는 게시물 좋아요 개수 카운트
            const likeCount = await this.liked.count({
                where: {
                    boardIdx,
                },
            })
            // 게시물 좋아요 수 업데이트
            const response = await this.Board.update({ liked: likeCount }, { where: { boardIdx } })
            const likedTable = await this.liked.findAll({
                where: {
                    boardIdx,
                },
                raw: true,
            })
            return likedTable
        } catch (e) {
            throw new Error(`Error while inserting like: ${e.message}`)
        }
    }

    // 사진 값 정렬
    async pictureCreate(payload) {
        try {
            const { boardIdx, boardFile } = payload
            for (let i = 0; i < boardFile.length; i++) {
                const response = await this.picture.findOrCreate({ where: { boardIdx, picture: boardFile[i] } })
            }
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }

    // 리팩토링 시작
    async categorySubValue({ categoryMain, categorySub }) {
        try {
            const response = await this.Board.findAll({
                attributes: [
                    "boardIdx",
                    "subject",
                    "content",
                    "viewCount",
                    "categoryMain",
                    "categorySub",
                    "liked",
                    [this.sequelize.fn("DATE_FORMAT", this.sequelize.col("createdAt"), "%Y-%m-%d"), "createdAt"],
                ],
                where: { categoryMain, categorySub },
                raw: true,
                limit: 5,
            })

            const subCount = await this.Board.count({
                where: { categoryMain, categorySub },
            })
            return { response, subCount }
        } catch (e) {
            throw new Error(`Error while find subCategory: ${e.message}`)
        }
    }
    // 리팩토링 끝

    // 검색하기
    async findSearch({ search }) {
        try {
            const Op = this.Sequelize.Op
            const response = await this.Board.findAll({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            const boardCount = await this.Board.count({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            return { response, boardCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }

    //list 검색하기

    async listValue({ search, mainCdValue }) {
        try {
            const Op = this.Sequelize.Op
            const subjectResponse = await this.Board.findAll({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                    cateCd: { [Op.like]: `${mainCdValue}%` },
                },
                raw: true,
            })
            const adminResponse = await this.Board.findAll({
                where: {
                    userId: { [Op.like]: `%${search}%` },
                    cateCd: { [Op.like]: `${mainCdValue}%` },
                },
                raw: true,
            })
            return { subjectResponse, adminResponse }
        } catch (e) {
            throw new Error(`Error while find list Value: ${e.message}`)
        }
    }
    // 댓글 작성

    async postComment({ boardIdx, cmdContent, userId }) {
        try {
            const response = (await this.comment.create({ boardIdx, cmdContent, userId })).get({ plain: true })
            const count = await this.comment.count({ where: { boardIdx } })
            const addUserPoint = await this.User.increment({ userPoint: 5 }, { where: { userId } })
            const result = { response, count, addUserPoint }
            return result
        } catch (e) {
            throw new Error(`Error while create Comment Value: ${e.message}`)
        }
    }

    // 댓글 수정하기

    async updateComment({ cmdContent, cmdIdx }) {
        try {
            const response = await this.comment.update({ cmdContent }, { where: { cmdIdx } })
            return response
        } catch (e) {
            throw new Error(`Error while update Comment Value: ${e.message}`)
        }
    }

    // 댓글 삭제하기
    async dropComment({ cmdIdx }) {
        try {
            const deleteBoardIdx = await this.comment.findOne({ where: { cmdIdx }, raw: true })
            const response = await this.comment.destroy({
                where: {
                    cmdIdx,
                },
            })
            return deleteBoardIdx
        } catch (e) {
            throw new Error(`Error while delete Comment status: ${e.message}`)
        }
    }

    // 대댓글 달기
    async creReComment({ cmdIdx, recmdContent, userId }) {
        try {
            const response = (await this.recomment.create({ cmdIdx, recmdContent, userId })).get({ plain: true })
            const result = await this.recomment.findAll({ where: { cmdIdx }, raw: true })
            return result
        } catch (e) {
            throw new Error(`Error while create ReComment status: ${e.message}`)
        }
    }
    //알림
    async findNoti() {
        try {
            const result = await this.notify.findAll({ raw: true })
            return result
        } catch (e) {
            throw new Error(`Error while findNoti status: ${e.message}`)
        }
    }
    async createNotify({ boardWriter, boardIdx, writer, cmdContent, mainCd }) {
        try {
            const response = (await this.notify.create({ boardWriter, boardIdx, cmdWriter: writer, cmdContent, mainCd })).get({ plain: true })
            const result = await this.notify.findAll({ where: { boardWriter }, raw: true })
            return result
        } catch (e) {
            throw new Error(`Error while create createNofify status: ${e.message}`)
        }
    }
    async modifyNotify({ notiId, boardWriter }) {
        try {
            const response = await this.notify.update({ readCheck: 0 }, { where: { id: notiId } })
            const result = await this.notify.findAll({ where: { boardWriter }, raw: true })
            return result
        } catch (e) {
            throw new Error(`Error while modify modifyNotify status: ${e.message}`)
        }
    }
    //전체 게시물 조회 (Admin 전용)
    async getAllBoard() {
        try {
            const dateBoard = await this.Board.findAll()
            return dateBoard
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = BoardRepository

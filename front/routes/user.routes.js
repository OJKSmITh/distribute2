const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://3.34.194.23:3000",
    withCredentials: true,
})

router.use("/", (req, res, next) => {
    try {
        if (!req.userInfo) return next()
        const { userPic, userId, userPw, userName, nickName, provider } = req.userInfo
        const { boardHot, userHot } = req
        res.locals = { boardHot, userHot }
        res.locals = { ...res.locals, userPic, userId, userPw, userName, nickName, provider }
        next()
    } catch (e) {
        next(e)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const response = await request.post("/user/login", { ...req.body })
    } catch (e) {
        next(e)
    }
})

router.post("/join", upload.single("userPic"), async (req, res, next) => {
    try {
        const { boardHot } = req
        const { userHot } = req
        const response = await request.post("/user/join", { ...req.body, ...req.file })
        res.render("user/welcome.html", { ...response.data, boardHot, userHot })
    } catch (e) {
        next(e)
    }
})

router.get("/myview", async (req, res, next) => {
    try {
        const { userId } = req.user
        const { boardHot } = req
        const { userHot } = req
        let { page, mainCd } = req.query
        if (!page) {
            page = 1
        }
        const response = await request.post("/profile/myview/mywrite", { userId, page })
        const {
            data: { myLength, findMain, writeCdarray },
        } = response
        if (findMain.length === 0) {
            res.render("user/mywrite.html")
            return
        }
        const filteredFindMain = mainCd ? findMain.filter((item) => item.mainCd === mainCd) : findMain
        const totalPage = Math.ceil(filteredFindMain.length / 5)
        if (page > totalPage) {
            page = totalPage
        }
        const startIdx = (page - 1) * 5
        const endIdx = startIdx + 5
        const pagedFindMain = filteredFindMain.slice(startIdx, endIdx)
        res.render("user/mywrite.html", { myLength, listValue: pagedFindMain, subVal: writeCdarray, mainCd, currentPage: page, totalPage })
    } catch (e) {
        next(e)
    }
})

// 내가 좋아요 누른 글, 내가 쓴 글
router.get("/myview/reaction", async (req, res, next) => {
    try {
        const { userId } = req.user
        const response = await request.post("/user/myview/reaction", { userId })
        const {
            data: { myBoardResponse, myLikeResponse, myCommentResponse },
        } = response
        const mainCdMap = { "0001": "notice", "0002": "community", "0003": "qna" }
        const likeDataWithMainCd = myLikeResponse.map((obj) => ({ ...obj, mainCd: mainCdMap[obj.cateCd.slice(0, 4)] || "" }))
        const commentDataWithMainCd = myCommentResponse.map((obj) => ({ ...obj, mainCd: mainCdMap[obj.cateCd.slice(0, 4)] || "" }))
        const myBoardResponseCount = myBoardResponse.length
        const myLikeResponseCount = myLikeResponse.length
        res.render("user/reaction.html", { commentCount: myBoardResponseCount, commentValue: commentDataWithMainCd, likeCount: myLikeResponseCount, likeValue: likeDataWithMainCd })
    } catch (e) {
        next(e)
    }
})

// 나의 글 내의 Category 선택
router.get("/myview/:mainCd", async (req, res, next) => {
    try {
        const { userId } = req.user
        const { boardHot } = req
        const { userHot } = req
        let { page } = req.query
        const { mainCd } = req.params
        const response = await request.post("/profile/myview/mywrite", { userId, page })
        const boardData = response.data.boardData
        const result = boardData.map((obj) => {
            const mainCdMap = {
                "0001": "notice",
                "0002": "community",
                "0003": "qna",
            }
            const mainCd = mainCdMap[obj.cateCd.slice(0, 4)] || ""
            return { ...obj, mainCd }
        })
        const filteredFindMain = result.filter((item) => item.mainCd === mainCd)
        const totalPage = Math.ceil(filteredFindMain.length / 5)
        const totalLength = filteredFindMain.length
        if (!page) {
            page = 1
        } else if (page > totalPage) {
            page = totalPage
        }
        const startIdx = (page - 1) * 5
        const endIdx = startIdx + 5
        const pagedFindMain = filteredFindMain.slice(startIdx, endIdx)
        res.render("user/mywrite.html", { myLength: response.data.myLength, listValue: pagedFindMain, subVal: response.data.writeCdarray, mainCd, currentPage: page, totalPage, totalLength })
    } catch (e) {
        next(e)
    }
})

module.exports = router

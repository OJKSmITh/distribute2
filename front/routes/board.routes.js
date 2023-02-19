const express = require("express")
const router = express.Router()
const axios = require("axios")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
//
router.use((req, res, next) => {
    try {
        if (!req.userInfo) return next()
        const { userPic, userId, userPw, userName, nickName, provider } = req.userInfo
        const { boardHot, userHot } = req
        res.locals = { boardHot, userHot }
        res.locals = { ...res.locals, userPic, userId, userPw, userName, nickName, provider }
        next()
    } catch (e) {
        next()
    }
})
router.post("/:mainCd/search", async (req, res, next) => {
    try {
        const { mainCd } = req.params
        const { search } = req.body
        const { boardHot } = req
        const result = await request.post("/board/list/search", { mainCd, search })
        const {
            data: { subjectResponse, adminResponse, subjectlength, userlength, boardIdx },
        } = result
        res.render("board/search.list.html", { subjectlength, userlength, subjectResponse, adminResponse, search, boardIdx, mainCd })
    } catch (e) {
        next(e)
    }
})
router.post("/reply/:cmdIdx", async (req, res, next) => {
    try {
        const { cmdIdx } = req.params
        const { userId } = req.query
        const url = req.header("referer").slice(21)
        const { recmdContent } = req.body
        const result = await request.post(`/board/reply/${cmdIdx}`, { recmdContent, userId })
        res.redirect(url)
    } catch (e) {
        next(e)
    }
})
router.get("/search", async (req, res, next) => {
    try {
        const { search } = req.query
        console.log("123ff", response)
        const result = await request.post(`/board/search`, { search })
        console.log("ff123", result)
        const { response, boardCount } = result.data
        res.render("board/subList.html", { listValue: response, boardCount })
    } catch (e) {
        next(e)
    }
})
router.get("/:mainCd", async (req, res, next) => {
    try {
        const { mainCd } = req.params
        const { page } = req.query
        const result = await request.get(`/board/${mainCd}/${page}`)
        const { listValue, cateLength, subVal } = result.data
        res.render("board/subList.html", { mainCd, listValue, cateLength, subVal })
    } catch (e) {
        next(e)
    }
})
///:mainCd/:subCd 라우터와 안 겹치려면 위로
router.get("/:mainCd/write", (req, res, next) => {
    try {
        const { mainCd } = req.params
        res.render("board/write.html", { mainCd })
    } catch (e) {
        next(e)
    }
})

// 수정 불러오기
router.get("/:mainCd/view/:boardIdx/modify", async (req, res, next) => {
    try {
        const { mainCd, boardIdx } = req.params
        const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
        const boardData = result.data
        const tagObjects = boardData.hashResponse.map((tag) => {
            return { value: tag.tag }
        })
        res.render("board/write.modify.html", { mainCd, boardData, tagObjects })
    } catch (e) {
        next(e)
    }
})

// 수정완료하기
router.post("/:mainCd/view/:boardIdx/modify", async (req, res, next) => {
    try {
        const { mainCd, boardIdx } = req.params
        let data = {
            subCd: req.body.categorySub,
            userId: req.body.writer,
            subject: req.body.subject,
            content: req.body.content,
            hash: req.body["tags-outside"],
        }
        const result = await request.put(`/board/${mainCd}/${boardIdx}`, { data })
        const { updatedBoard } = result.data
        res.redirect(`/board/${mainCd}/view/${boardIdx}`)
    } catch (e) {
        next(e)
    }
})
// 게시물 1개 확인
router.get("/:mainCd/view/:boardIdx", async (req, res, next) => {
    try {
        const { mainCd, boardIdx } = req.params
        const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
        const {
            data: { response, hashResponse, commentResponse, commentLength, likedUser, recmd },
        } = result
        res.render("board/view.html", { newBoard: response, newHashTagVal: hashResponse, commentResponse, commentLength, likedUser, recmd })
    } catch (e) {
        next(e)
    }
})
// 게시물 작성 후 확인하기
router.get("/:mainCd/viewcheck/:boardIdx", async (req, res, next) => {
    try {
        const { mainCd, boardIdx } = req.params
        const result = await request.get(`/board/${mainCd}/view/${boardIdx}`)
        const {
            data: { response, hashResponse },
        } = result
        res.render("board/view.check.html", { mainCd, newBoard: response, newHashTagVal: hashResponse })
    } catch (e) {
        next(e)
    }
})
// 댓글 삭제하기
router.get("/:mainCd/comment/:cmdIdx", async (req, res, next) => {
    try {
        const { mainCd, cmdIdx } = req.params
        const result = await request.delete(`/board/comment/${cmdIdx}`)
        const {
            data: { boardIdx },
        } = result
        res.redirect(`/board/${mainCd}/view/${boardIdx}`)
    } catch (e) {
        next(e)
    }
})

// 댓글 수정하기
router.post("/:mainCd/comment/:cmdIdx", async (req, res, next) => {
    try {
        const { cmdContent } = req.body
        const { boardIdx } = req.query
        const { mainCd, cmdIdx } = req.params
        const result = await request.put(`/board/comment/${cmdIdx}`, { cmdContent })
        res.redirect(`/board/${mainCd}/view/${boardIdx}`)
    } catch (e) {
        next(e)
    }
})

//제일 밑으로 내려가자
router.get("/:mainCd/:subCd", async (req, res, next) => {
    try {
        const { mainCd, subCd } = req.params
        const { page } = req.query
        const result = await request.get(`/board/${mainCd}/${subCd}/${page}`)
        const {
            data: { correctValue, subVal },
        } = result
        const cateArray = result.data.cateLength
        const cateLength = Array.from({ length: cateArray }, (_, i) => i + 1)
        res.render("board/subList.html", { mainCd, listValue: correctValue, cateLength, subVal })
    } catch (e) {
        next(e)
    }
})

/////////////

module.exports = router

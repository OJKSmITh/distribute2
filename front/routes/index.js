const express = require("express")
const router = express.Router()
const axios = require("axios")
const user = require("./user.routes")
const profile = require("./profile.routes")
const board = require("./board.routes")
const upload = require("../midlewares/upload")
const config = require("../config")
const admin = require("./admin.routes")
const request = axios.create({
    baseURL: "http://3.34.194.23:3000",
    withCredentials: true,
})

router.use("/", async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (token === undefined) {
            req.user = { userId: "guest" }
            const boardResponse = await request.get("/board/hot")
            const boardHot = boardResponse.data
            req.boardHot = boardHot
            const userResponse = await request.get("/user/hot")
            const userHot = userResponse.data
            req.userHot = userHot
            res.cookie("token", "guest")
        } else {
            const [header, payload, signature] = token.split(".")
            const pl = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"))
            req.user = pl
            const { userId } = req.user
            const response = await request.post("/user/check", { userId })
            const { data } = response
            req.userInfo = data
            const boardResponse = await request.get("/board/hot")
            const boardHot = boardResponse.data
            req.boardHot = boardHot
            const userResponse = await request.get("/user/hot")
            const userHot = userResponse.data
            req.userHot = userHot
        }
    } catch (error) {
    } finally {
        next()
    }
})

router.get("/login", (req, res, next) => {
    try {
        const { boardHot } = req
        const { userHot } = req
        res.render("user/login.html", { boardHot, userHot })
    } catch (e) {
        next(e)
    }
})

router.use("/user", user)
router.use("/profile", profile)
router.use("/board", board)

router.get("/token/:token", async (req, res, next) => {
    try {
        const { token } = req.params
        res.cookie("token", token)
        res.redirect("/")
    } catch (e) {
        next(e)
    }
})

router.get("/oauth/kakao", (req, res, next) => {
    try {
        const redirectURL = `${config.kakaoHOST}/oauth/authorize?client_id=${config.kakaoREST_API_KEY}&redirect_uri=${config.kakaoREDIRECT_URI}&response_type=code`
        res.redirect(redirectURL)
    } catch (e) {
        next(e)
    }
})

router.get("/manage", async (req, res, next) => {
    try {
        const response = await request.get("/board/manage")
        const boards = response.data
        const counts = {}
        const likes = {}

        // console.log(boards)
        // console.log(counts)
        for (const board of boards) {
            const createdAt = new Date(board.createdAt)
            const date = createdAt.toISOString().slice(0, 10)
            if (!counts[date]) {
                counts[date] = 0
                likes[date] = 0
            }
            counts[date]++
            likes[date] += board.liked
        }

        const hours = {}

        for (const board of boards) {
            const createdAt = new Date(board.createdAt)
            const hour = createdAt.toISOString().slice(11, 13)
            if (!hours[hour]) {
                hours[hour] = 0
            }
            hours[hour]++
        }
        let countArray = Object.entries(counts)
        let likesArray = Object.entries(likes)
        let hoursArray = Object.entries(hours)
        console.log(countArray)
        console.log(likesArray)
        console.log(hoursArray)
        res.render("user/management.html", { count: countArray, like: likesArray, hour: hoursArray })
    } catch (e) {
        next(e)
    }
})

router.get("/search", async (req, res, next) => {
    try {
        const userInfo = req.userInfo
        const { boardHot } = req
        const { userHot } = req
        const { search } = req.query
        const boardResponse = await request.post("/board/search", { search })
        const { boardCount } = boardResponse.data
        const boardValue = boardResponse.data.response
        const categoryMap = { "0001": "notice", "0002": "community", "0003": "qna" }
        const data1 = []
        boardValue.forEach((x) => {
            const { createdAt, ...rest } = x
            const date = createdAt.substring(0, 10)
            const time = createdAt.substring(11, 19)
            rest.cateCd = rest.cateCd.substring(0, 4)
            rest.mainCd = categoryMap[rest.cateCd] || ""
            data1.push({ ...rest, createdAt: date, createdTime: time })
        })

        const userResponse = await request.post("/user/search", { search })
        const { userCount } = userResponse.data
        const userValue = userResponse.data.response
        const countB = userResponse.data.userCount
        userValue.forEach((user) => {
            user.userBoard = countB
        })
        res.render("board/search.html", { ...userInfo, boardHot, userHot, search, boardCount, data1, userCount, userValue })
    } catch (e) {
        next(e)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const userInfo = req.userInfo
        const { boardHot } = req
        const { userHot } = req
        const response = await request.get("/board/random")
        const { listValue, randomUser, randomHash } = response.data
        res.render("index.html", { ...userInfo, boardHot, userHot, boardRandom: listValue, randomUser, randomHash })
    } catch (e) {
        next(e)
    }
})

module.exports = router

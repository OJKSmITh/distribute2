const express = require("express")
const router = express.Router()
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

router.get("/:userId", async (req, res, next) => {
    try{
        const { userId } = req.params
        const { boardHot } = req
        const { userHot } = req
        const response = await request.post("/user/check", {userId})
        const { data } = response
        res.render("user/mypage.html", {...data,boardHot,userHot,})
    }catch(e){
        next(e)
    }
})

router.get("/modify/:userId", async (req, res, next) => {
    try{
        const { userId } = req.params
        const { boardHot } = req
        const { userHot } = req
        const response = await request.post("/user/check", {userId})
        const { data } = response
        res.render("user/mypage.modify.html", {...data,boardHot,userHot,})
    }catch(e){
        next(e)
    }
})

router.post("/modify/:id", upload.single("userPic"), async (req, res, next) => {
    try{
        const { id } = req.params
        const { boardHot } = req
        const { userHot } = req
        const data = { ...req.body }
        if (req.file) {data.userPic = req.file.filename}
        const response = await request.put(`/profile/${id}`, data)
        res.render("user/mypage.html", { ...response.data, boardHot, userHot })
    }catch(e){
        next(e)
    }
})

module.exports = router

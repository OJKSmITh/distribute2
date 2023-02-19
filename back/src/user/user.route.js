const express = require("express")
const router = express.Router()
const { userController: controller } = require("./user.module")

router.get("/", (req, res, next) => controller.getSignIn(req, res, next))
router.get("/hot", (req, res, next) => controller.getHot(req, res, next))
router.get("/login", (req, res, next) => controller.getSignIn(req, res, next))

router.post("/login", (req, res, next) => controller.getSignIn(req, res, next))
router.post("/join", (req, res, next) => controller.postSignUp(req, res, next))
router.post("/search", (req, res, next) => controller.searchValue(req, res, next))
router.post("/myview/mywrite", (req, res, next) => controller.myWriting(req, res, next))
router.post("/myview/reaction", (req,res,next)=> controller.myReaction(req,res,next))
router.get("/myview/mywrite/:mainCd", (req, res, next) => controller.myMainCd(req, res, next))

router.put("/:userId", (req, res, next) => controller.putUpdateUser(req, res, next))

router.post("/check", (req, res, next) => controller.checkUserid(req, res, next))
router.post("/checkNick", (req, res, next) => controller.checkNick(req, res, next))

module.exports = router

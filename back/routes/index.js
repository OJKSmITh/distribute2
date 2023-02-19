const express = require("express")
const router = express.Router()
const auth = require("../src/auth/auth.route")
const user = require("../src/user/user.route")
const board = require("../src/board/board.route")
const admin = require("../src/admin/admin.route")

router.use("/auth", auth)
router.use("/user", user)
router.use("/profile", user)
router.use("/board", board)
router.use("/admin", admin)

module.exports = router

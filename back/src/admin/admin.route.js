const express = require("express")
const router = express.Router()
const { adminController : controller } = require("./admin.module")

router.get("/admin/users", (req,res,next)=>controller.getUsers(req,res,next))
router.put("/admin/users/:id",(req,res,next)=> controller.updateUser(req,res,next))
router.get("/admin/boards", (req, res, next) => controller.getBoards(req, res, next))
router.put("/admin/boards/:id", (req,res,next)=>controller.updateBoardLevel(req,res,next))
router.get("/admin/categories", (req,res,next)=>controller.getCategories(req,res,next))
router.post("/admin/categories", (req,res,next)=>controller.createCategory(req,res,next))
router.put("/admin/categories/:id", (req,res,next)=>controller.updateCategory(req,res,nest))
router.delete("/admin/categories/:id", (req,res,next)=>controller.deleteCategory(req,res,next))

console.log("222@")

module.exports = router
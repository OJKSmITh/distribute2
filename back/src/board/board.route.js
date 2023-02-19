const express = require("express")
const router = express.Router()
const { boardController: controller } = require("./board.module")

//알림
router.get("/notify", (req, res, next) => controller.findNoti(req, res, next))
router.post("/notify", (req, res, next) => controller.createNotify(req, res, next))
router.put("/notify", (req, res, next) => controller.modifyNotify(req, res, next))

//admin 통계용
router.get("/manage", (req,res,next) => controller.getAllBoard(req,res,next))

router.post("/picture", (req, res, next) => controller.pictureInsert(req, res, next))
router.get("/random", (req, res, next) => controller.getRandom(req, res, next))
router.get("/hot", (req, res, next) => controller.getHot(req, res, next))
router.post("/search", (req, res, next) => controller.searchValue(req, res, next))
router.post("/list/search", (req, res, next) => controller.searchListValue(req, res, next))
router.post("/:mainCd/view/:boardIdx/like", (req, res, next) => controller.likeBoard(req, res, next))

//comment crud 작성하기
router.post("/comment/:boardIdx", (req, res, next) => controller.postComment(req, res, next))
router.put("/comment/:cmdIdx", (req, res, next) => controller.putComment(req, res, next))
router.delete("/comment/:cmdIdx", (req, res, next) => controller.deleteComment(req, res, next))

// reply comment
router.post("/reply/:cmdIdx", (req, res, next) => controller.createReComment(req, res, next))

// 기본 CRUD
router.post("/:mainCd/write", (req, res, next) => controller.postWrite(req, res, next))
router.get("/:mainCd/view/:boardIdx", (req, res, next) => controller.findBoard(req, res, next))
router.put("/:mainCd/:boardIdx", (req, res, next) => controller.changeBoard(req, res, next))
router.delete("/:mainCd/view/:boardIdx", (req, res, next) => controller.deleteBoard(req, res, next))

// 기본 CRUD 끝

// 카테고리별 내용 불러오기
router.get("/:mainCd/:pageNumber", (req, res, next) => controller.findMainCd(req, res, next))
router.get("/:mainCd/:subCd/:pageNumber", (req, res, next) => controller.findCategorySub(req, res, next))

// 좋아요 버튼
// router.post("/:mainCd/view/like", (req, res, next) => controller.infoLike(req, res, next))

// 댓글 게시물 삭제
// router.get("/:categoryMain", (req, res, next) => controller.findCategory(req, res, next))

module.exports = router

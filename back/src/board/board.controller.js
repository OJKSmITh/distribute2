class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }

    // 글쓰기
    async postWrite(req, res, next) {
        try {
            const {
                data: { subject, content, userId, mainCd, subCd, hash },
            } = req.body
            const result = await this.boardService.MakeWrite({ subject, content, mainCd, subCd, userId, hash })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 게시판 글 보기 //view (viewcheck XXXXX)
    async findBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const result = await this.boardService.FindValue({ boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 게시판 글 수정하기
    async changeBoard(req, res, next) {
        try {
            const { boardIdx, mainCd } = req.params
            console.log(boardIdx, mainCd)
            const {
                data: { subject, content, userId, hash, subCd },
            } = req.body
            const result = await this.boardService.ChangeView({ boardIdx, subject, content, userId, mainCd, subCd, hash })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 게시판 삭제하기
    async deleteBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const result = await this.boardService.DeleteValue({ boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 메인카테고리 분류
    async findMainCd(req, res, next) {
        try {
            const { mainCd, pageNumber } = req.params
            const result = await this.boardService.FindMainValue({ mainCd, pageNumber })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 서브카테고리 분류
    async findCategorySub(req, res, next) {
        try {
            const { mainCd, subCd, pageNumber } = req.params
            const result = await this.boardService.CategoryValue({ mainCd, subCd, pageNumber })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 인덱스 페이지 랜덤으로 값 뿌려주기
    async getRandom(req, res, next) {
        try {
            const response = await this.boardService.RandomValue()
            console.log(response)
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    // 인기 게시물
    async getHot(req, res, next) {
        try {
            const response = await this.boardService.HotValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    // 좋아요 값 추가
    async likeBoard(req, res, next) {
        try {
            // boardIdx, userId 구조분해할당 후 담기
            const { boardIdx } = req.params
            const { userId } = req.body
            console.log("11 Con", req.body)
            console.log("22 Con", req.params)
            // service likeBoard method 호출 및 값 담기
            const response = await this.boardService.likeBoard({ boardIdx, userId })
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }
    // async infoLike(req, res, next) {
    //     try {
    //         const { categoryMain, boardIdx, userInfo } = req.body
    //         console.log(categoryMain, userInfo.userId, boardIdx)
    //         const result = await this.boardService.InsertLike({ userId: userInfo.userId, boardIdx, categoryMain })
    //         res.status(201).json(result)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    // 사진 저장하기
    async pictureInsert(req, res, next) {
        try {
            const { arr, boardIdx } = req.body
            const result = await this.boardService.PictureCreate({ arr, boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 검색 알고리즘
    async searchValue(req, res, next) {
        try {
            const { search } = req.body
            const result = await this.boardService.FindSearch({ search })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // list 검색
    async searchListValue(req, res, next) {
        try {
            const { search, mainCd } = req.body
            const result = await this.boardService.ListValue({ search, mainCd })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 댓글 작성하기
    async postComment(req, res, next) {
        try {
            const { boardIdx } = req.params
            const { cmdContent, userId } = req.body
            const result = await this.boardService.PostComment({ boardIdx, cmdContent, userId })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 댓글 수정하기
    async putComment(req, res, next) {
        try {
            const { cmdIdx } = req.params
            const { cmdContent } = req.body
            const result = await this.boardService.UpdateComment({ cmdContent, cmdIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 댓글 삭제하기
    async deleteComment(req, res, next) {
        try {
            const { cmdIdx } = req.params
            const result = await this.boardService.DropComment({ cmdIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 대댓글 만들기
    async createReComment(req, res, next) {
        try {
            let { cmdIdx } = req.params
            cmdIdx = Number(cmdIdx)
            const { recmdContent, userId } = req.body
            const result = await this.boardService.CreReComment({ cmdIdx, recmdContent, userId })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    //알림 조회
    async findNoti(req, res, next) {
        try {
            const result = await this.boardService.FindNoti()
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    //알림 생성
    async createNotify(req, res, next) {
        try {
            const { boardWriter, boardIdx, writer, cmdContent, mainCd } = req.body
            const result = await this.boardService.CreateNotify({ boardWriter, boardIdx, writer, cmdContent, mainCd })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    //알림 수정
    async modifyNotify(req, res, next) {
        try {
            const { notiId, boardWriter } = req.body
            console.log(boardWriter, "chekcmodify")
            const result = await this.boardService.ModifyNotify({ notiId, boardWriter })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    async getAllBoard(req, res, next) {
        try {
            const allBoard = await this.boardService.getAllBoard()
            res.status(201).json(allBoard)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

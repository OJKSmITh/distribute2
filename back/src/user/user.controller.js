class UserController {
    constructor({ userService }) {
        this.userService = userService
    }

    async getHot(req, res, next) {
        try {
            const response = await this.userService.HotValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async postSignUp(req, res, next) {
        try {
            const { userId, userPw, userName, nickName, address1, address2, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel, filename } = req.body
            const user = await this.userService.SignUp({ filename, userId, userPw, userName, nickName, address1, address2, gender, phoneNum, userEmail, userIntro, provider, snsId, userLevel })
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async checkUserid(req, res, next) {
        try {
            const { userId } = req.body
            const user = await this.userService.CheckId({ userId })
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }
    async checkNick(req, res, next) {
        try {
            const { nickName } = req.body
            const user = await this.userService.CheckNick({ nickName })
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getSignIn(req, res, next) {
        try {
            if (!req.headers.authorization) throw new Error("SignIn is Invalid, Please Sign in your account")
            const [type, token] = req.headers.authorization.split(" ")
            if (type.toLowerCase() !== "bearer") throw new Error("Error occurred Invalid Authorization. Please close the browser and then try again.")
            const user = await this.userService.SignIn(token)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async putUpdateUser(req, res, next) {
        try {
            const { userId } = req.params
            const data = req.body
            const updateUser = await this.userService.SignUpdate(data)
            res.status(200).json(updateUser)
        } catch (e) {
            next(e)
        }
    }

    async searchValue(req, res, next) {
        try {
            const { search } = req.body
            const result = await this.userService.FindSearch({ search })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 내가 쓴글
    async myWriting(req, res, next) {
        let boardData
        try {
            const { userId, page } = req.body
            const result = await this.userService.FindWriting({ userId, page })
            boardData = result
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async myReaction(req, res, next) {
        try {
            const {userId} = req.body
            const response = await this.userService.FindReaction({userId})
            console.log(response)

            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    // 내가 쓴 글 메인 카테고
}

module.exports = UserController

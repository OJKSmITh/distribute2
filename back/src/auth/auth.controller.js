class AuthController {
    constructor({ authService }) {
        this.authService = authService
    }

    async postSignIn(req, res, next) {
        try {
            const { userId, userPw } = req.body
            const token = await this.authService.token({ userId, userPw })
            res.json({ userId, token })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = AuthController

const dotenv = require("dotenv").config({ path: "../../.env" })
const SALT = process.env.SALT || "test"

class AuthService {
    constructor({ authRepository, jwt, crypto }) {
        this.authRepository = authRepository
        this.jwt = jwt
        this.crypto = jwt.crypto
    }

    async token({ userId, userPw }) {
        try {
            if (!userId || !userPw) throw "Invalid or empty User ID or Password, Please enter your ID or Password"
            const hash = this.crypto.createHmac("sha256", SALT).update(userPw).digest("hex")
            const user = await this.authRepository.getSignIn({ userId, userPw: hash })
            if (!user) throw "Your provided ID or Password is incorrect. Confirm your account"
            const token = this.jwt.Sign(user)
            return token
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = AuthService

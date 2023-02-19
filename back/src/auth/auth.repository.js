class AuthRepository {
    constructor({ User }) {
        this.User = User
    }

    async getSignIn({ userId, userPw }) {
        try {
            const user = await this.User.findOne({
                raw: true,
                attributes: ["userPic", "userId", "userPw", "provider"],
                where: {
                    userId,
                    // userPw,
                },
            })
            console.log(user)
            return user
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = AuthRepository

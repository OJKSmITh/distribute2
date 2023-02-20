const dotenv = require("dotenv").config()
const kakaoHOST = process.env.kakaoHOST
const kakaoREDIRECT_URI = process.env.kakaoREDIRECT_URI
const kakaoREST_API_KEY = process.env.kakaoREST_API_KEY
const kakaoCLIENT_SECRET = process.env.kakaoCLIENT_SECRET
const port = process.env.PORT || "3000"
const router = require("./routes/index")
const app = require("./app")
const qs = require("qs")
const { sequelize } = require("./models")
const axios = require("axios")
const JWT = require("./lib/jwt")
const crypto = require("crypto")
const SALT = process.env.SALT
const SocketIO = require("./routes/socketIO")
const jwt = new JWT({ crypto })
const userPw = "11"
const hash = jwt.crypto.createHmac("sha256", SALT).update(userPw).digest("hex")
const {
    models: { User, Board, Comment, Hashtag, Point, Liked, Hash, Counterimg, Category, Recomment },
} = sequelize

app.use(router)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send(error.message)
})

app.get("/oauth/kakao", async (req, res, next) => {
    try {
        const { code } = req.query
        const host = `${kakaoHOST}/oauth/token`
        const header = {
            "Content-type": "application/x-www-form-urlencoded",
        }
        const body = qs.stringify({
            grant_type: "authorization_code",
            client_id: kakaoREST_API_KEY,
            redirect_uri: kakaoREDIRECT_URI,
            code,
            client_secret: kakaoCLIENT_SECRET,
        })
        const response = await axios.post(host, body, header)
        const { access_token } = response.data

        const hostUser = `https://kapi.kakao.com/v2/user/me`
        const user = await axios.post(hostUser, null, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${access_token}`,
            },
        })

        const userPwHash = jwt.crypto.createHmac("sha256", SALT).update(`${user.data.id}`).digest("hex")

        const sns = {
            userPic: user.data.properties["profile_image"],
            userId: `${user.data.id}`,
            userPw: userPwHash,
            userName: user.data.properties.nickname,
            nickName: user.data.id,
            address: user.data["kakao_account"].email,
            gender: user.data["kakao_account"].gender,
            phoneNum: user.data.id,
            userEmail: user.data["kakao_account"].email,
            provider: "kakao",
            userIntro: "회원정보를 수정해 주세요",
            snsId: user.data["kakao_account"].email,
        }
        const [snsCreate] = await User.findOrCreate({
            where: { snsId: sns.snsId },
            defaults: sns,
        })
        const bodys = sns
        const result = await axios.post("http://52.78.193.209:3000/auth", bodys)
        res.redirect(`http://52.78.193.209:3005/token/${result.data.token}`)
    } catch (error) {
        next(error)
    }
})

const http = app.listen(
    port,
    async () => {
        console.log("connecting to backend and Database...")
        await sequelize.sync({ force: false })
    }

    // console.log(category.getInstance())
    // await User.create({
    //     userId: `guest`,
    //     userPw: hash,
    //     userName: "123",
    //     nickName: `guest`,
    //     address: "11",
    //     gender: "11",
    //     phoneNum: "11",
    //     userEmail: "11",
    //     userIntro: "11",
    //     userPic: `1.png`,
    // })
    // console.log(`Starting Server with port Number is ${port}`)}
)
SocketIO(http, app)

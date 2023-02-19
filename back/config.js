const dotenv = require("dotenv").config()
const kakaoHOST = process.env.kakaoHOST
const kakaoREDIRECT_URI = process.env.kakaoREDIRECT_URI
const kakaoREST_API_KEY = process.env.kakaoREST_API_KEY
const kakaoCLIENT_SECRET = process.env.kakaoCLIENT_SECRET

const config = {
    kakaoHOST: process.env.kakaoHOST,
    kakaoREDIRECT_URI: process.env.kakaoREDIRECT_URI,
    kakaoREST_API_KEY: process.env.kakaoREST_API_KEY,
    kakaoCLIENT_SECRET: process.env.kakaoCLIENT_SECRET,
    db: {
        development: {
            database: process.env.DB_DATABASE || "test",
            username: process.env.DB_USER || "test",
            password: process.env.DB_PASSWORD || "test",
            host: process.env.DB_HOST || "test",
            port: process.env.DB_PORT || "test",
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: true,
            },
            timezone : "Asia/Seoul",
            dialectOptions : {
                charset : "utf8mb4",
                dataStrings : "true",
                typeCast : "true"
            }
        },
        test: {
            database: process.env.DB_DATABASE || "test",
            username: process.env.DB_USER || "test",
            password: process.env.DB_PASSWORD || "test",
            host: process.env.DB_HOST || "test",
            port: process.env.DB_PORT || "test",
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: true,
            },
            timezone : "Asia/Seoul",
            dialectOptions : {
                charset : "utf8mb4",
                dataStrings : "true",
                typeCast : "true"
            }
        },
        
    },
}

module.exports = config

const express = require("express")
const app = express()
const nunjucks = require("nunjucks")
const axios = require("axios")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const router = require("./routes")

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.set("view engine", "html")
nunjucks.configure("views", { express: app })

app.use(express.json({ limit: "1024mb" }))
app.use(express.urlencoded({ limit: "1024mb", extended: false }))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/image", express.static("./uploads"))
app.use(router)

app.use((req, res, next) => {
    const error = new Error(`요청한 페이지를 찾을 수 없습니다`)
    error.statusCode = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    const message = error.message || "Something went wrong!"
    if (statusCode >= 400) {
        return res.status(statusCode).render("error.html", { message })
    }
    res.status(statusCode).render("error.html", { message })
})

module.exports = app

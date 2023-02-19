const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: "1024mb" }))
app.use(express.urlencoded({ limit: "1024mb", extended: false }))
app.use((req,res,next,error) => {
    const statusCode = error.statusCode || 500
    if (statusCode >= 400) {
        return res.status(statusCode).render("error.html", { message })
    }
    res.status(500).send(error.message)
    res.render("error.html")
})

module.exports = app

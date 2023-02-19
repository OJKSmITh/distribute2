const SocketIO = require("socket.io")
const axios = require("axios")

module.exports = async (server, app) => {
    const io = SocketIO(server, { path: "/socket.io" })
    const noti = io.of("/notify")
    io.on("connection", (socket) => {
        //data 이벤트 발생시
        socket.on("data", ({ data, userNick }) => {
            const json = {
                chunk: userNick,
                data,
            }
            console.log(JSON.stringify(json))
            socket.broadcast.emit("reply", JSON.stringify(json))
        })
    })
    noti.on("connection", (socket) => {
        socket.on(`notify`, ({ userId, data }) => {
            const json = {
                userId,
                data,
            }
            console.log(json, 1249867124978)
            socket.broadcast.emit("noti", JSON.stringify(json))
        })
    })
}

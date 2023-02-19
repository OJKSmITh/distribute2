import request from "/js/lib/request.js"
const nav = document.querySelector("#nav")
const gnb = document.querySelector("#gnb")
const arrow = document.querySelector("#nav > img")
const userInfo = document.querySelector("#userInfo")
const infoGnb = document.querySelector("#infoGnb")
const search = document.querySelector("#search")
const searchBtn = document.querySelector("#searchBtn")
const chatIcon = document.querySelector("#chatIcon")
const chatWindow = document.querySelector("#chatWindow")
const closeBtn = document.querySelector("#closeBtn")
const chat = document.querySelector("#chat")
const frm = document.querySelector("#frm")
const userId = document.querySelector("input[name=userId]").value
const notiWindow = document.querySelector("#notification")
const notification = document.querySelector("#innerNotification")
const notifyIcon = document.querySelector("#notifyIcon")
const card = document.querySelectorAll(".flexCard > div")
const socket = io.connect("http://3.34.194.23:3000", {
    path: "/socket.io",
    transports: ["websocket"],
})
const notify2 = io.connect(`http://3.34.194.23:3000/notify`, {
    path: "/socket.io",
    transports: ["websocket"],
})

const cardHandler = (e) => {
    setTimeout(function () {
        for (let i = 0; i < card.length; i++) {
            console.log(card[`${i}`].style)
            card[`${i}`].style.transform = "rotate(0deg)"
            card[`${i}`].style.transition = "all 2s"
            setTimeout(() => (card[2].style.bottom = "0"), 200)
            setTimeout(() => {
                card[5].style.right = "0"
                card[5].style.bottom = "0"
            }, 700)
            setTimeout(() => {
                card[3].style.bottom = "0"
                card[3].style.right = "0"
            }, 300)
            setTimeout(() => {
                card[1].style.bottom = "0"
                card[1].style.right = "0"
                card[1].style.transition = "all 1s"
            }, 500)
        }
    }, 1500)
}
const navfunction = (e) => {
    gnb.classList.toggle("off")
    arrow.classList.toggle("deg")
    arrow.classList.toggle("deg2")
}
const gnbfunction = async (e) => {
    e.preventDefault()
    gnb.classList.toggle("off")
    arrow.classList.toggle("deg")
    arrow.classList.toggle("deg2")
    const response = await request.get(e.target.pathname)
    location.href = `http://3.34.194.23:3005${e.target.pathname}`
    console.log(response)
}
const userInfoClick = (e) => {
    console.log(infoGnb.classList.toString())
    infoGnb.classList.toggle("off2")
}
const logoutFunction = (e) => {
    e.preventDefault()
    document.cookie = "token=; path=/; expires=Thum 01 Jan 1970 00:00:01 GMT"
    location.href = "/"
}
const searchFunction = (e) => {
    search.classList.toggle("off3")
}

const chatHandler = (e) => {
    chatWindow.classList.toggle("open")
    chatWindow.classList.toggle("close")
    chat.scrollTop = chat.scrollHeight
}
const chatCHandler = (e) => {
    chatWindow.classList.toggle("open")
    chatWindow.classList.toggle("close")
    chat.scrollTop = chat.scrollHeight
}
const drawing = (data) => {
    notification.innerHTML = ""
    for (const list of data) {
        if (list.boardWriter !== list.cmdWriter) {
            console.log(list.boardWriter)
            const ul = document.createElement("ul")
            ul.classList.add("notilist")
            if (list.readCheck === 0) {
                ul.classList.add("check")
            }
            ul.innerHTML = `<li>${list.boardWriter}님의 게시물</li>
                <span>게시물 번호 ${list.boardIdx}</span>
                <li>에</li>
                <span>${list.cmdWriter}</span>
                <li>님이</li>
                <span class="cmdContent">${list.cmdContent}</span>
                <li>댓글이 달렸습니다.</li>
                <input type="hidden" name="mainCd" value="${list.mainCd}">
                <input type="hidden" name="boardIdx" value="${list.boardIdx}">
                <input type="hidden" name="mainCd" value="${list.id}">
                <input type="hidden" name="mainCd" value="${list.boardWriter}">
                 `
            notification.append(ul)
            notification.scrollTop = notification.scrollHeight
        }
    }
}
const notificationHandler = async (e) => {
    notiWindow.classList.toggle("none")
    const result = await request.get("/board/notify")
    drawing(result.data)
}
const chatSubmitHandler = (e) => {
    e.preventDefault()
    const { message, nickName } = e.target
    const data = message.value
    const userNick = nickName.value
    if (data === "") {
        alert("메세지 내용이 없습니다")
    } else {
        const li = document.createElement("li")
        li.classList.add("right")
        li.innerHTML = `<span class="flex-center"> ${data} </span>`
        chat.append(li)
        chat.scrollTop = chat.scrollHeight
        socket.emit("data", { data, userNick })
        e.target.reset()
        message.focus()
    }
}

socket.on("reply", (data1) => {
    const json = JSON.parse(data1)
    const { chunk, data } = json
    const li = document.createElement("li")
    li.classList.add("left")
    li.innerHTML = `<p >${chunk}</p>
    <span class="flex-center reply"><p>${data}</p></span>`
    chat.append(li)
    chat.scrollTop = chat.scrollHeight
})

console.log(userId)
notify2.on("noti", (dataz) => {
    const json = JSON.parse(dataz)
    const boardWriter = [...new Set(json.data.map((v) => v.boardWriter))]
    console.log(boardWriter)
    if (boardWriter[0] === userId) {
        console.log(json.data)
        drawing(json.data)
        notifyIcon.children[0].classList.remove("none")
    }
})

nav.addEventListener("click", navfunction)
gnb.addEventListener("click", gnbfunction)
window.addEventListener("load", cardHandler)
userInfo.addEventListener("click", userInfoClick)
searchBtn.addEventListener("click", searchFunction)
notifyIcon.addEventListener("click", notificationHandler)

for (let i = 0; i < notification.children.length; i++) {
    notification.addEventListener("click", async (e) => {
        if (e.target.localName !== "ul") {
            const mainCd = e.target.parentElement.getElementsByTagName("input")[0].value
            const boardIdx = e.target.parentElement.getElementsByTagName("input")[1].value
            const notiId = e.target.parentElement.getElementsByTagName("input")[2].value
            const boardWriter = e.target.parentElement.getElementsByTagName("input")[3].value
            const result = await request.put("/board/notify", { notiId, boardWriter })
            drawing(result.data)
            location.href = `/board/${mainCd}/view/${boardIdx}`
        } else {
            const mainCd = e.target.getElementsByTagName("input")[0].value
            const boardIdx = e.target.getElementsByTagName("input")[1].value
            const notiId = e.target.getElementsByTagName("input")[2].value
            const boardWriter = e.target.getElementsByTagName("input")[3].value
            const result = await request.put("/board/notify", { notiId, boardWriter })
            drawing(result.data)
            location.href = `/board/${mainCd}/view/${boardIdx}`
        }
    })
}

chatIcon.addEventListener("click", chatHandler)
closeBtn.addEventListener("click", chatCHandler)
frm.addEventListener("submit", chatSubmitHandler)
const logout = document.querySelector("#logout")
logout.addEventListener("click", logoutFunction)

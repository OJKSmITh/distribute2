let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const boardHeaderA = document.querySelector("#boardHeader > a")
const writeBtn = document.querySelector("#writeBtn")
const hidden = document.querySelector("#hidden")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const pageNum = document.querySelector("#pageNum")
const pagePath = boardHeaderA.pathname
let pathname2 = pagePath.replace("/board", "")
let pathname3 = pathname2 === "/notice" ? "공지사항" : pathname2 === "/community" ? "커뮤니티" : "질문과 답변"
console.log(pathname2)

console.log(location)

boardHeaderA.innerHTML = `${pathname3}`
// <div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const searchParams = location.search
const nowPage = new URLSearchParams(searchParams).get("page")
let boardCount = hidden.value
const checkNum = 5 * nowPage - 4
let pageBlock = Math.ceil(nowPage / 5)
const page = Math.ceil(boardCount / 5)
const maxPageBlock = Math.ceil(page / 5)

for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
    if (i <= page) {
        const tag = document.createElement("a")
        tag.innerHTML = `${i}`
        tag.setAttribute("href", `${pathname}?page=${i}`)
        pageNum.append(tag)
    }
}
prev.addEventListener("click", () => {
    if (pageBlock > 1) {
        pageBlock--
        pageNum.innerHTML = ""
        for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
            if (i <= page) {
                const tag = document.createElement("a")
                tag.innerHTML = `${i}`
                tag.setAttribute("href", `${pagePath}?page=${i}`)
                pageNum.append(tag)
            }
        }
    }
})

next.addEventListener("click", () => {
    if (pageBlock < maxPageBlock) {
        pageBlock++
        pageNum.innerHTML = ""
        for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
            if (i <= page) {
                const tag = document.createElement("a")
                tag.innerHTML = `${i}`
                tag.setAttribute("href", `${pagePath}?page=${i}`)
                pageNum.append(tag)
            }
        }
    }
})

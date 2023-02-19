const pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const boardHeaderA = document.querySelector("#boardHeader > a")
const writeBtn = document.querySelector("#writeBtn")
const hidden1 = document.querySelector("#hidden1")
const hidden2 = document.querySelector("#hidden2")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const pageNum = document.querySelector("#pageNum")

const searchParams = location.search
const nowPage = new URLSearchParams(searchParams).get("page")
let boardCount = hidden2.value || hidden1.value 
const checkNum = 5 * nowPage - 4
let pageBlock = Math.ceil(nowPage / 5)
const page = Math.ceil(boardCount / 5)
const maxPageBlock = Math.ceil(page / 5)
const pagePath = hidden2.value ? `${pathname}/${hidden2.value}` : pathname 
const getPageUrl = (page) => {
    let url = pathname;
    if (hidden2.value){next} url += `?page=${page}`
    return url
}
for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
    if (i <= page) {
        const tag = document.createElement("a")
        tag.innerHTML = `${i}`
        tag.setAttribute("href", getPageUrl(i))
        pageNum.appendChild(tag)
    }}
  
prev.addEventListener("click", () => {
    if (pageBlock > 1) {
        pageBlock--
        pageNum.innerHTML = ""
        for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
            if (i > 0) {
                const tag = document.createElement("a")
                tag.innerHTML = `${i}`
                tag.setAttribute("href", getPageUrl(i))
                pageNum.appendChild(tag)
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
                tag.setAttribute("href", getPageUrl(i))
                pageNum.appendChild(tag)
            }
        }
    }
})
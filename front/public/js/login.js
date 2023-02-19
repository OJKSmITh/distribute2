const request = axios.create({
    baseURL: "http://3.34.194.23:3000",
    withCredentials: true,
})

const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
const container = document.getElementById("container")
const form = document.querySelector("#form")
const idCheck = document.querySelector("input[name='userId']")
const idFocus = document.querySelector("input[name='userPw']")
const nickCheck = document.querySelector("input[name='nickName']")
const nickFocus = document.querySelector("input[name='address1']")
const address = document.querySelector("wrap_tf_keyword > input")
const joinFrm = document.querySelector("#userinfo")
const termsCheckbox = document.getElementById("termsCheckbox")
const iFrameContainer = document.getElementById("iFrameContainer")
const agreeBtn = document.getElementById("agreeBtn")
const cancelBtn = document.getElementById("cancelBtn")
const agreeText = document.getElementById("agreetext")
const kakao = document.querySelector("#kakao")
const checkId = document.getElementById("checkId")
const checkNick = document.getElementById("checkNick")

joinFrm.addEventListener("input", async (e) => {
    const valueFocus = e.target
    const check = e.target.name
    const checkValue = e.target.value
    if (check === "userId") {
        const response = await request.post(
            "/user/check",
            {
                userId: checkValue,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const { data } = response
        if (data) {
            checkId.style.display = "block"
        } else {
            checkId.style.display = "none"
        }
    } else if (check === "nickName") {
        const response = await request.post(
            "/user/checkNick",
            {
                nickName: checkValue,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const { data } = response

        if (data) {
            checkNick.style.display = "block"
        } else {
            checkNick.style.display = "none"
        }
    }
})

idFocus.addEventListener("focus", (e) => {
    let idOver = idFocus.parentNode.previousSibling.previousSibling
    let overValue = idOver.lastChild.innerHTML
    let checkVal = "중복된 아이디가 존재합니다."
    if (overValue === checkVal) {
        idCheck.focus()
    }
})

nickFocus.addEventListener("focus", (e) => {
    let nickOver = nickFocus.parentNode.previousSibling.previousSibling
    let overValue = nickOver.lastChild.innerHTML
    let checkVal = "중복된 닉네임이 존재합니다."
    if (overValue === checkVal) {
        nickCheck.focus()
    }
    address.addEventListener("click", (e) => {
        e.target.focus()
    })
})

form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const { userId, userPw } = e.target
        const response = await request.post("/auth", {
            userId: userId.value,
            userPw: userPw.value,
        })

        if (response.status === 200) {
            document.cookie = `token=${response.data.token}; path=/`
            location.href = "/"
        }
    } catch (e) {
        alert("아이디와 패스워드가 다름")
    }
})
const HOST = `https://kauth.kakao.com`
const REDIRECT_URI = `http://3.34.194.23:3000/oauth/kakao`
const REST_API_KEY = `6f3af7393558bd75aa668cd31cc22396`

kakao.addEventListener("click", async (e) => {
    try {
        location.href = "/oauth/kakao"
    } catch (e) {}
})

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active")
    termsCheckLayout()
    iFrameContainer.style.display = "block"
})

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active")
})

agreeBtn.addEventListener("click", () => {
    termsCheckbox.checked = true
    iFrameContainer.style.display = "none"
})

cancelBtn.addEventListener("click", () => {
    termsCheckbox.checked = false
    iFrameContainer.style.display = "none"
    container.classList.remove("right-panel-active")
})

const termsCheckLayout = () => {
    const width = 400
    const height = 500
    const borderWidth = 0

    iFrameContainer.style.width = `${width}px`
    iFrameContainer.style.height = `${height}px`
    iFrameContainer.style.border = `${borderWidth}px solid`
    iFrameContainer.style.backgroundColor = "white"
    iFrameContainer.style.left = `${((window.innerWidth || document.documentElement.clientWidth) - width) / 1.5 - borderWidth}px`
    iFrameContainer.style.top = `${((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth}px`
}

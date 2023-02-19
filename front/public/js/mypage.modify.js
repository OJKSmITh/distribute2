const request = axios.create({
    baseURL: "http://3.34.194.23:3000",
    withCredentials: true,
})
const submitBtn = document.querySelector("#submitBtn")
const userPic = document.getElementById("userPic")
const fileInput = document.querySelectorAll("input[name='userPic']")[0]

userPic.addEventListener("click", (e) => {
    console.log(e)
    fileInput.click()
})

fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        userPic.style.backgroundImage = `url(${reader.result})`
    }
})
const form = document.querySelector("#welcomeFrm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const id = e.target.action.split("/").pop()
    const request = new XMLHttpRequest()

    request.open("POST", `/profile/modify/${id}`, true)
    request.send(formData)
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                window.location.href = `/profile/${id}`
            } else {
                console.error("Error:", request.response)
            }
        }
    }
})

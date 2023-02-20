const request = axios.create({
    baseURL: "http://3.38.214.112:3000",
    withCredentials: true,
})
const modifyBtn = document.querySelector("#modifyBtn")
const submitBtn = document.querySelector("#submitBtn")
const backBtn = document.getElementById("backBtn")
const userId = document.querySelector(".userId").innerHTML
const input = document.querySelectorAll("input")

const modifyHandler = async (e) => {
    location.href = `http://3.38.214.112:3005/profile/modify/${userId}`
    console.log(response.data)
}

const backBtnHandler = () => {
    location.href = `http://3.38.214.112:3005/`
}

// console.log(input)
// const submitHandler = async (e) => {
//     e.perventDefault()
//     console.log(e.target)
// }
modifyBtn.addEventListener("click", modifyHandler)
backBtn.addEventListener("click", backBtnHandler);
// submitBtn.addEventListener("submit", submitHandler)



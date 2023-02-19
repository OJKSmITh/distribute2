const request = axios.create({
    baseURL: "http://3.34.194.23:3000",
    withCredentials: true,
})
const dailyGraph = document.querySelector("#dailyGraph")
const timeGraph = document.querySelector("#TimeGraph")
const likedGraph = document.querySelector("#likedGraph")
const hashtagGraph = document.querySelector("#hashtagGraph")
const graph = document.querySelector(".graph")
const chart = document.getElementById("chart")
const bars = document.querySelectorAll(".bar")
const hours = document.querySelectorAll(".bar2")
const likes = document.querySelectorAll(".bar3")
const countValue = document.querySelectorAll("#dateValue")
const hourValue = document.querySelectorAll("#hourValue")
const likeValue = document.querySelectorAll("#likeValue")
const dateStatistic = document.querySelectorAll("#dateCount")
const likeStatistic = document.querySelectorAll("#likeCount")
const hourStatistic = document.querySelectorAll("#hourCount")

console.log(likeStatistic)

let countArray = []
for (let i = 0; i < countValue.length; i++) {
    countArray.push(Number(countValue[i].innerHTML))
}

let sumCount = countArray.reduce((acc, cur, idx) => {
    return (acc += cur)
}, 0)

countArray = countArray.map((x) => {
    let result = (x / sumCount) * 100
    return result
})
console.log(countArray)

let hourArray = []
for (let i = 0; i < hourValue.length; i++) {
    hourArray.push(Number(hourValue[i].innerHTML))
}

let sumHour = hourArray.reduce((acc, cur, idx) => {
    return (acc += cur)
}, 0)

hourArray = hourArray.map((x) => {
    let result = (x / sumHour) * 100
    return result
})

let likeArray = []
for (let i = 0; i < likeValue.length; i++) {
    likeArray.push(Number(likeValue[i].innerHTML))
}

let sumLike = likeArray.reduce((acc, cur, idx) => {
    return (acc += cur)
}, 0)

likeArray = likeArray.map((x) => {
    let result = (x / sumLike) * 100
    return result
})

console.log(countArray)
dailyGraph.addEventListener("click", () => {
    for (let i = 0; i < bars.length; i++) {
        dateStatistic[i].style.display = "block"
        hourStatistic[i].style.display = "none"
        likeStatistic[i].style.display = "none"
        dateStatistic[i].style.height = `${countArray}%`
    }
})

timeGraph.addEventListener("click", () => {
    for (let i = 0; i < bars.length; i++) {
        dateStatistic[i].style.display = "none"
        hourStatistic[i].style.display = "block"
        likeStatistic[i].style.display = "none"
        hourStatistic[i].style.height = `${hourArray}%`
    }
})
console.log(likeStatistic)
likedGraph.addEventListener("click", () => {
    for (let i = 0; i < bars.length; i++) {
        dateStatistic[i].style.display = "none"
        hourStatistic[i].style.display = "none"
        likeStatistic[i].style.display = "block"
        likeStatistic[i].style.height = `${likeArray}`
    }
})

// hashtagGraph.addEventListener('click', () =>{
//     bar2.style.height = '200px'
// })

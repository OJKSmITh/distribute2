const cardHeader = document.querySelectorAll(".cardHeader");
const cardBox = document.querySelectorAll(".content_box");
const contentCard = document.querySelectorAll(".contentCard");
const contentImg = document.querySelectorAll(".cardBody > img");
const a = document.querySelector("#a");
const cardSubject = document.querySelectorAll(".cardSubject > span");
const textSub = document.querySelectorAll(".textSub");
const indexBoardIdx = document.querySelectorAll("#indexBoardIdx");
const content1 = document.querySelector(".textCon1");
const content2 = document.querySelector(".textCon2");
const content3 = document.querySelector(".textCon3");
const content4 = document.querySelector(".textCon4");
const content5 = document.querySelector(".textCon5");
const content6 = document.querySelector(".textCon6");
const hidden1 = document.querySelector("#hidden1");
const hidden2 = document.querySelector("#hidden2");
const hidden3 = document.querySelector("#hidden3");
const hidden4 = document.querySelector("#hidden4");
const hidden5 = document.querySelector("#hidden5");
const hidden6 = document.querySelector("#hidden6");
const contentValue1 = hidden1.value;
const contentValue2 = hidden2.value;
const contentValue3 = hidden3.value;
const contentValue4 = hidden4.value;
const contentValue5 = hidden5.value;
const contentValue6 = hidden6.value;
content1.innerHTML = `${contentValue1}`
content2.innerHTML = `${contentValue2}`
content3.innerHTML = `${contentValue3}`
content4.innerHTML = `${contentValue4}`
content5.innerHTML = `${contentValue5}`
content6.innerHTML = `${contentValue6}`

let arr = [];
let arr1 = [];
for (let i = 0; i < indexBoardIdx.length; i++) {
    const arr2 = indexBoardIdx[i].value.split(",")[0];
    const arr3 = indexBoardIdx[i].value.split(",")[1];
    arr.push(arr2);
    arr1.push(arr3);
}

for (let i = 0; i < cardHeader.length; i++) {
    cardHeader[i].addEventListener("click", (e) => {
        // console.log(e.target)
        cardBox[i].classList.toggle("clickEvent");
    });
    contentImg[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`;
    });
    cardSubject[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`;
    });
    textSub[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`;
    });
}

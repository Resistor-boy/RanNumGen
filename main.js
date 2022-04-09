const numberStorage = document.querySelector(".submit-box");
const numberInput = document.querySelector(".submit-box input");
const numberButton = document.querySelector(".submit-box button");
const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");
const message3 = document.querySelector(".message3");
const successIMG = document.querySelector("#success")
const failIMG = document.querySelector("#fail");

numberList = [];

const RANDOM_NUMBER = "Random Number";
const TYPED_NUMBER = "typed Number";

const randomNumber = Math.floor(Math.random() * 100 + 1);
localStorage.setItem("Random Number", randomNumber);

function savedNumbers(event) {
    event.preventDefault();
    const typedNumber = numberInput.value;
    numberList.push(typedNumber);
    localStorage.setItem("Typed Number", numberList);
    numberInput.value = "";
    checkArray(typedNumber);
    checkString(typedNumber);
    checkNumber(typedNumber);
    leftChance(typedNumber);
    printNumber();
}

function checkNumber(typedNumber) {
    if(randomNumber == typedNumber) {
        alert(`나이스`)
        message1.style.display = "none"
        message2.style.display = "none";
        message3.style.display = "none";
        successIMG.classList.remove("hidden");
    } else if(randomNumber > typedNumber) {
        message1.innerText = (`힌트: ${typedNumber} 보다 큼`);
    } else {
        message1.innerText = (`힌트: ${typedNumber} 보다 작음`);
    }
}

function checkString(typedNumber) {
    const changeType = parseInt(typedNumber);
    const isNumber = isNaN(changeType);
    if (isNumber == true) {
        alert(`숫자를 맞춰야지`);
        message2.style.display = "none";
        numberList.splice(-1, 1);
    }
}

function checkArray(typedNumber) {
    const notDupList = numberList.filter((typedNumber, index) => {
        return numberList.indexOf(typedNumber) === index;
    });

    if(numberList.length != notDupList.length) {
        numberList.splice(-1, 1);
        alert(`${typedNumber}는 아니라고 했잖아`);
    }
}

function printNumber() {
    message3.innerText = (`You tried ${numberList}`);
}

const arrayItem = localStorage.getItem(TYPED_NUMBER);

function leftChance() {
    const maxArray = 7;
    let chance = maxArray - numberList.length;
    if(numberList.length > 7) {
        failIMG.classList.remove("hidden");
        alert(`땡! 넌 틀렸어, 답은 ${randomNumber}야`);
    } else {
        message2.innerText = (`${chance} 번 남았다^^`)
    }
}

numberStorage.addEventListener("submit", savedNumbers);
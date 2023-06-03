let wordParagraph = document.getElementById("word");
let userInput = document.getElementById("inputGuessBox");
let getRandomWordButton = document.getElementById("getWord");
let checkWordButton = document.getElementById("checkWord");
let resultElement = document.getElementById("result");
let chanceElement = document.getElementById("chance");
let scoreElement = document.getElementById("score");
let GuessBox = document.getElementById("guess-box");
let final = document.getElementById("final");
let copyright = document.getElementById("copyright");
let gameOver = document.getElementById("gameOver");
let finalScore = document.getElementById("final-score-count")
let restartTimer = document.getElementById("timer");

let wordFrom;
let chances = 10;
let score = 0;
let year = new Date().getFullYear()
console.log(year)


function addRemove() {
    GuessBox.classList.add("remove");
    gameOver.classList.add("add");
    count=4
    let id=setInterval(timer,1000)
    function timer(){
        restartTimer.innerHTML=`Game is restarting in ${count} seconds.`
        count--
        if(count===-1){
            clearInterval(id)
            location.reload()
        }
    }
}

let ownerNameAndCopyright = document.createElement("p");
ownerNameAndCopyright.classList.add("copyright")
ownerNameAndCopyright.style.color = "#ffffff"
ownerNameAndCopyright.textContent = "Created by Amrendra Singh. © 2023"
copyright.appendChild(ownerNameAndCopyright)

getWord()
async function getWord() {
    const options = {
        method: "GET"
    }

    const response = await fetch("https://random-word-api.vercel.app/api?words=1&type=capitalized", options)
    const fetchedWord = await response.json()
    const wordFromTheServer = fetchedWord[0]
    wordFrom = wordFromTheServer
    const wordFromTheArray = wordFromTheServer.split("")
    const splittedWord = wordFromTheArray.sort((a, b) => 0.5 - Math.random())
    const sortedWord = splittedWord.join("")
    wordParagraph.textContent = sortedWord;
    resultElement.textContent = "";
    userInput.value = "";
}


gameOver.classList.add("remove");

function checkWord() {
    if (userInput.value === "") {
        resultElement.textContent = "Input field can't be empty.";
        resultElement.style.color = "#FFFF00";
    }
    else {
        if (chances > 0) {
            if (userInput.value === wordFrom) {
                resultElement.textContent = "Woah! you guessed it right";
                resultElement.style.color = "#5ced73";
                userInput.value = ""
                chances = chances - 1;
                chanceElement.textContent = chances;
                score = score + 1;
                scoreElement.textContent = score;
                setTimeout(getWord, 1000)
                if (chances === 0) {
                    setTimeout(addRemove, 2000)

                }
            } else {
                resultElement.textContent = "Wrong guess please try again";
                resultElement.style.color = "#fb3b1e";
                userInput.value = ""
                chances = chances - 1;
                chanceElement.textContent = chances;
                score = score - 0.5;
                scoreElement.textContent = score;
                if (chances === 0) {
                    setTimeout(addRemove, 2000)

                }
            }
        }
    }
    finalScore.textContent = score
}


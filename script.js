const cardsDeck = [
    { name: "6", value: 6, img: "Dpoint.jpg" },
    { name: "7", value: 7, img: "flot.jpg" },
    { name: "8", value: 8, img: "turms.jpg" },
    { name: "9", value: 9, img: "suharik.jpg" },
    { name: "10", value: 10, img: "thomas.jpg" },
    { name: "Jack", value: 2, img: "t58.jpg" },
    { name: "Queen", value: 3, img: "bmp.jpg" },
    { name: "King", value: 4, img: "mls.jpg" },
    { name: "Ace", value: 11, img: "maxcartatuz.jpg" }
];
const cardBackImg = "rpu.jpg";
const maxAttempts = 3;
const userNameEl = document.getElementById("user-name");
const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const userCardEl = document.getElementById("user-card");
const computerCardEl = document.getElementById("computer-card");
const userCardLabel = document.getElementById("user-card-label");
const computerCardLabel = document.getElementById("computer-card-label");
const attemptCounterEl = document.getElementById("attempt-counter");
const generateBtn = document.getElementById("generate-btn");
const resultMessageEl = document.getElementById("result-message");
const userColumnEl = document.getElementById("user-column");
const computerColumnEl = document.getElementById("computer-column");
const modalOverlayEl = document.getElementById("modal-overlay");
const modalTitleEl = document.getElementById("modal-title");
const modalGifEl = document.getElementById("modal-gif");
const modalRestartBtn = document.getElementById("modal-restart-btn");
let userScore = 0;
let computerScore = 0;
let currentAttempt = 0;
let playerName = "User";
function askUserName() {
    let inputName = prompt("Enter your name to start the game '21':", "");
    while (!inputName || inputName.trim() === "") {
        alert("Validation error: Name cannot be empty!");
        inputName = prompt("Enter your name to start the game '21':", "");
    }
    playerName = inputName.trim();
    userNameEl.textContent = playerName;
}
function setInitialCardStyles() {
    userCardEl.style.cssText = `background-image: url('${cardBackImg}')`;
    computerCardEl.style.cssText = `background-image: url('${cardBackImg}')`;
}
function getRandomCard() {
    return cardsDeck[Math.floor(Math.random() * cardsDeck.length)];
}
function playRound() {
    currentAttempt++;
    attemptCounterEl.textContent = `Attempt ${currentAttempt} of ${maxAttempts}`;
    const userCard = getRandomCard();
    const compCard = getRandomCard();
    userScore += userCard.value;
    computerScore += compCard.value;
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;
    userCardLabel.textContent = `${userCard.name} (${userCard.value} pts.)`;
    computerCardLabel.textContent = `${compCard.name} (${compCard.value} pts.)`;
    userCardEl.style.backgroundImage = `url('${userCard.img}')`;
    computerCardEl.style.backgroundImage = `url('${compCard.img}')`;
    if (userCard.value === compCard.value) {
        userCardEl.style.borderColor = "#FBC02D";
        computerCardEl.style.borderColor = "#FBC02D";
        userCardEl.style.transform = "scale(1)";
        computerCardEl.style.transform = "scale(1)";
    } else {
        const userWonRound = userCard.value > compCard.value;
        userCardEl.style.borderColor = userWonRound ? "#388E3C" : "#D32F2F";
        computerCardEl.style.borderColor = userWonRound ? "#D32F2F" : "#388E3C";
        userCardEl.style.transform = userWonRound ? "scale(1.04)" : "scale(0.98)";
        computerCardEl.style.transform = userWonRound ? "scale(0.98)" : "scale(1.04)";
    }
if (currentAttempt >= maxAttempts) {
        generateBtn.disabled = true; 
        setTimeout(finishGame, 500);
    }
}
function finishGame() {
    generateBtn.disabled = true;
    generateBtn.style.backgroundColor = "#546E7A";
    generateBtn.style.color = "#CFD8DC";
    generateBtn.style.boxShadow = "none";
    generateBtn.style.cursor = "not-allowed";
    if (userScore > computerScore) {
        resultMessageEl.textContent = `${playerName} wins!`;
        resultMessageEl.style.color = "#2E7D32";
        userScoreEl.style.backgroundColor = "#388E3C";
        computerScoreEl.style.backgroundColor = "#D32F2F";
        userColumnEl.style.backgroundColor = "rgba(56, 142, 60, 0.15)";
        modalTitleEl.textContent = "VICTORY!";
        modalTitleEl.style.color = "#388E3C";
        modalGifEl.src = "warthundernuke.gif"; 
    } else if (computerScore > userScore) {
        resultMessageEl.textContent = "Computer wins!";
        resultMessageEl.style.color = "#C62828";
        computerScoreEl.style.backgroundColor = "#388E3C";
        userScoreEl.style.backgroundColor = "#D32F2F";
        computerColumnEl.style.backgroundColor = "rgba(211, 47, 47, 0.1)";
        modalTitleEl.textContent = "DEFEAT!";
        modalTitleEl.style.color = "#D32F2F";
        modalGifEl.src = "warthunderplane.gif"; 
    } else {
        resultMessageEl.textContent = "Draw!";
        resultMessageEl.style.color = "#F57F17";
        userScoreEl.style.backgroundColor = "#FBC02D";
        computerScoreEl.style.backgroundColor = "#FBC02D";
        modalTitleEl.textContent = "DRAW!";
        modalTitleEl.style.color = "#FBC02D";
        modalGifEl.src = "daliaxezwarthunder.gif"; 
    }
    modalOverlayEl.style.display = "flex";
}
function resetGame() {
    modalOverlayEl.style.display = "none";
    modalGifEl.src = "";
    userScore = 0;
    computerScore = 0;
    currentAttempt = 0;
    userScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    attemptCounterEl.textContent = `Attempt 0 of ${maxAttempts}`;
    resultMessageEl.textContent = "";
    userCardLabel.textContent = "?";
    computerCardLabel.textContent = "?";
    userScoreEl.style = "";
    computerScoreEl.style = "";
    userColumnEl.style = "";
    computerColumnEl.style = "";
    generateBtn.style = "";
    generateBtn.disabled = false;
    setInitialCardStyles();
}
setInitialCardStyles();
setTimeout(askUserName, 100);
generateBtn.addEventListener("click", playRound);
modalRestartBtn.addEventListener("click", resetGame);

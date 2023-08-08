const playerChoices = ["rock", "paper", "scissor"];
const resultText = document.getElementById("resultText");
const playerChoiceImg = document.getElementById("playerChoice");
const botChoiceImg = document.getElementById("botChoice");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const historyList = document.getElementById("historyList");
let gameHistory = [];

playerChoiceImg.addEventListener("click", function () {
    const choiceIndex = playerChoices.indexOf(this.id);
    const nextChoiceIndex = (choiceIndex + 1) % playerChoices.length;
    this.id = playerChoices[nextChoiceIndex];
    this.src = `../images/${this.id}.png`;
});

playButton.addEventListener("click", playGame);
resetButton.addEventListener("click", resetGame);

function playGame() {
    const playerChoice = playerChoiceImg.id;
    const botChoice = playerChoices[Math.floor(Math.random() * 3)];

    botChoiceImg.src = `../images/${botChoice}.png`;
    const result = determineWinner(playerChoice, botChoice);
    resultText.textContent = result;

    gameHistory.push(result);
    updateHistory();
}

function determineWinner(player, bot) {
    if (player === bot) {
        return "It's a tie!";
    } else if (
        (player === "rock" && bot === "scissor") ||
        (player === "paper" && bot === "rock") ||
        (player === "scissor" && bot === "paper")
    ) {
        return "You win!";
    } else {
        return "Bot wins!";
    }
}

function updateHistory() {
    historyList.innerHTML = "";
    gameHistory.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = result;
        historyList.appendChild(listItem);
    });
}

function resetGame() {
    playerChoiceImg.id = "rock";
    playerChoiceImg.src = `../images/rock.png`;
    botChoiceImg.src = `../images/rock.png`;
    resultText.textContent = "Choose an option";
    gameHistory = [];
    updateHistory();
}
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const pvpBtn = document.getElementById("pvp");
const aiBtn = document.getElementById("ai");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let vsAI = false;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function startGame(aiMode) {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    vsAI = aiMode;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    if (vsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins!`;
            gameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function aiMove() {
    let emptyCells = board.map((val, index) => val === "" ? index : null)
                          .filter(val => val !== null);

    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");

    if (checkWinner()) return;

    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}

function restartGame() {
    startGame(vsAI);
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
pvpBtn.addEventListener("click", () => startGame(false));
aiBtn.addEventListener("click", () => startGame(true));
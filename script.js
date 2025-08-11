const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn;
const scoreXElement = document.getElementById('score-x');
const scoreCircleElement = document.getElementById('score-circle');
const scoreDrawElement = document.getElementById('score-draw');
const playerXCard = document.getElementById('player-x');
const playerOCard = document.getElementById('player-o');
let scoreX = 0;
let scoreCircle = 0;
let scoreDraw = 0;
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS, CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessageElement.classList.remove('show');
    updateTurnIndicator();
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateTurnIndicator();
    }
}
function endGame(draw) {
    if (draw) {
        scoreDraw++;
        winningMessageTextElement.innerText = 'Empate!';
        winningMessageTextElement.style.color = 'white';
    } else {
        if (circleTurn) {
            scoreCircle++;
            winningMessageTextElement.innerText = "Círculo Venceu!";
        } else {
            scoreX++;
            winningMessageTextElement.innerText = "X Venceu!";
        }
        const winnerColor = circleTurn ? 'var(--cor-o)' : 'var(--cor-x)';
        winningMessageTextElement.style.color = winnerColor;
    }
    updateScoreboard();
    playerXCard.classList.remove('active-turn');
    playerOCard.classList.remove('active-turn');
    winningMessageElement.classList.add('show');
}
function updateScoreboard() {
    scoreXElement.innerText = scoreX;
    scoreCircleElement.innerText = scoreCircle;
    scoreDrawElement.innerText = scoreDraw;
}
function updateTurnIndicator() {
    playerXCard.classList.remove('active-turn');
    playerOCard.classList.remove('active-turn');
    if (circleTurn) {
        playerOCard.classList.add('active-turn');
    } else {
        playerXCard.classList.add('active-turn');
    }
}
function isDraw() {
    return [...cellElements].every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS));
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurns() {
    circleTurn = !circleTurn;
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => cellElements[index].classList.contains(currentClass));
    });
}
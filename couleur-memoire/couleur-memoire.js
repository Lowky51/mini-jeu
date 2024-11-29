const colors = ['red', 'blue', 'green', 'darkgreen', 'purple', 'orange', 'violet', 'darkblue', 'brown'];
const gameBoard = document.querySelector('.game-board');
const resultText = document.getElementById('result-text');
const startButton = document.getElementById('start-button');

let sequence = [];
let userSequence = [];
let level = 0;
let canClick = false;

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function flashColor(color) {
    const colorButton = document.getElementById(color);
    colorButton.classList.add('flash');
    setTimeout(() => {
        colorButton.classList.remove('flash');
    }, 600); // Durée du clignotement
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            canClick = true;
            return;
        }
        flashColor(sequence[i]);
        i++;
    }, 800); // Délai entre les clignotements
}

function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            resultText.textContent = `Perdu! Vous avez atteint le niveau ${level}.`;
            startButton.disabled = false;
            canClick = false;
            return;
        }
    }

    if (userSequence.length === sequence.length) {
        level++;
        resultText.textContent = `Niveau ${level} réussi!`;
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}

function nextLevel() {
    sequence.push(getRandomColor());
    userSequence = [];
    canClick = false;
    resultText.textContent = `Niveau ${level + 1}`;
    setTimeout(() => {
        playSequence();
    }, 1000);
}

function handleColorClick(event) {
    if (!canClick) return;
    const colorButton = event.target;
    colorButton.classList.add('clicked');
    setTimeout(() => {
        colorButton.classList.remove('clicked');
    }, 300); // Durée de l'animation de clic
    const color = event.target.dataset.color;
    userSequence.push(color);
    checkSequence();
}

function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    canClick = false;
    resultText.textContent = 'Le jeu commence...';
    startButton.disabled = true;
    nextLevel();
}

gameBoard.addEventListener('click', handleColorClick);
startButton.addEventListener('click', startGame);

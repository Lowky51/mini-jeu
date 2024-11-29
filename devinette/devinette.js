const words = ["javascript", "programmation", "developpement", "internet", "ordinateur"];
let selectedWord = "";
let guessedLetters = [];
let attemptsLeft = 6;

const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const resultText = document.getElementById('result-text');
const attemptsText = document.getElementById('attempts-text');
const resetButton = document.getElementById('reset-button');

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function updateWordDisplay() {
    let display = '';
    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + ' ';
        } else {
            display += '_ ';
        }
    }
    wordDisplay.textContent = display.trim();
}

function checkGuess() {
    const letter = letterInput.value.toLowerCase();
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        resultText.textContent = "Veuillez entrer une lettre valide.";
        return;
    }

    if (guessedLetters.includes(letter)) {
        resultText.textContent = "Vous avez déjà deviné cette lettre.";
        return;
    }

    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        resultText.textContent = "Bonne devinette!";
    } else {
        resultText.textContent = "Mauvaise devinette!";
        attemptsLeft--;
    }

    updateWordDisplay();
    attemptsText.textContent = `Tentatives restantes: ${attemptsLeft}`;
    letterInput.value = '';

    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        resultText.textContent = "Félicitations! Vous avez deviné le mot!";
        guessButton.disabled = true;
    } else if (attemptsLeft === 0) {
        resultText.textContent = `Désolé, vous avez perdu. Le mot était: ${selectedWord}`;
        guessButton.disabled = true;
    }
}

function resetGame() {
    selectedWord = selectRandomWord();
    guessedLetters = [];
    attemptsLeft = 6;
    wordDisplay.textContent = '_ '.repeat(selectedWord.length).trim();
    letterInput.value = '';
    resultText.textContent = '';
    attemptsText.textContent = `Tentatives restantes: ${attemptsLeft}`;
    guessButton.disabled = false;
}

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);

// Initialiser le jeu
resetGame();

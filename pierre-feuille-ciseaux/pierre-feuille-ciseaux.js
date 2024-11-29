let userScore = 0;
let computerScore = 0;

const resultText = document.getElementById('result-text');
const userScoreText = document.getElementById('user-score');
const computerScoreText = document.getElementById('computer-score');
const resetButton = document.getElementById('reset');

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'Égalité !';
    } else if (didUserWin(userChoice, computerChoice)) {
        userScore++;
        return 'Vous avez gagné !';
    } else {
        computerScore++;
        return 'Vous avez perdu !';
    }
}

function didUserWin(userChoice, computerChoice) {
    return (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    );
}

function updateScores() {
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    resultText.textContent = `Vous avez choisi ${userChoice}. L'ordinateur a choisi ${computerChoice}. ${result}`;
    updateScores();
}

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

resetButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    resultText.textContent = 'Faites votre choix !';
    updateScores();
});

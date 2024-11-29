const icons = ['🍎', '🍌', '🍒', '🍓', '🍇', '🍈', '🍉', '🍊'];
const gameBoard = document.getElementById('game-board');
const resultText = document.getElementById('result-text');
const resetButton = document.getElementById('reset-button');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffleCards() {
    const shuffledIcons = [...icons, ...icons].sort(() => 0.5 - Math.random());
    return shuffledIcons.map((icon, index) => ({ icon, index, flipped: false, matched: false }));
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = card.index;
    cardElement.addEventListener('click', () => flipCard(card));
    return cardElement;
}

function renderCards() {
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (shouldReturn(card)) return;

    card.flipped = true;
    flippedCards.push(card);
    const cardElement = document.querySelector(`[data-index="${card.index}"]`);
    cardElement.textContent = card.icon;
    cardElement.classList.add('flipped');

    if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkForMatch, 1000);
    }
}

function shouldReturn(card) {
    return lockBoard || card.flipped || card.matched;
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.icon === card2.icon;

    if (isMatch) {
        card1.matched = true;
        card2.matched = true;
        matchedPairs++;
        if (matchedPairs === icons.length) {
            resultText.textContent = 'Félicitations! Vous avez trouvé toutes les paires!';
        }
    } else {
        card1.flipped = false;
        card2.flipped = false;
        const cardElement1 = document.querySelector(`[data-index="${card1.index}"]`);
        const cardElement2 = document.querySelector(`[data-index="${card2.index}"]`);
        cardElement1.textContent = '';
        cardElement2.textContent = '';
        cardElement1.classList.remove('flipped');
        cardElement2.classList.remove('flipped');
    }

    flippedCards = [];
    lockBoard = false;
}

function resetGame() {
    cards = shuffleCards();
    matchedPairs = 0;
    resultText.textContent = '';
    renderCards();
}

resetButton.addEventListener('click', resetGame);

// Initialiser le jeu
resetGame();

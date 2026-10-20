// --- Game Data & State ---
const DECK_COMPOSITION = [
    { type: 'safe', value: 0, label: '+0', color: 'green' },
    { type: 'safe', value: 1, label: '+1', color: 'green' },
    { type: 'safe', value: 1, label: '+1', color: 'green' },
    { type: 'safe', value: 1, label: '+1', color: 'green' },
    { type: 'safe', value: 1, label: '+1', color: 'green' },
    { type: 'safe', value: 1, label: '+1', color: 'green' },
    { type: 'safe', value: 2, label: '+2', color: 'green' },
    { type: 'safe', value: 2, label: '+2', color: 'green' },
    { type: 'safe', value: 3, label: '+3', color: 'green' },
    { type: 'pop',  value: 1, label: 'POP! +1', color: 'red' },
    { type: 'pop',  value: 2, label: 'POP! +2', color: 'red' },
    { type: 'uno',  value: 0, label: 'UNO!', color: 'gold' }
];

const state = {
    deck: [],
    drawnCards: [],
    accumulation: 0,
    activeCard: null,
    isGameOver: false,
    statusText: 'Siap bermain',
    statusType: 'ready'
};

// --- DOM References ---
const DOM = {
    deckCount: document.getElementById('deck-count'),
    accumCount: document.getElementById('accum-count'),
    gameStatus: document.getElementById('game-status'),
    activeCard: document.getElementById('active-card'),
    activeCardValue: document.getElementById('active-card-value'),
    btnDraw: document.getElementById('btn-draw'),
    btnReset: document.getElementById('btn-reset'),
    historyList: document.getElementById('history-list'),
    historyCount: document.getElementById('history-count')
};

// --- Core Functions ---
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initGame() {
    state.deck = shuffleArray(DECK_COMPOSITION);
    state.drawnCards = [];
    state.accumulation = 0;
    state.activeCard = null;
    state.isGameOver = false;
    state.statusText = 'Siap bermain';
    state.statusType = 'ready';
    render();
}

function drawCard() {
    if (state.isGameOver || state.deck.length === 0) return;

    const card = state.deck.pop();
    state.drawnCards.push(card);
    state.activeCard = card;

    if (card.type === 'safe') {
        state.accumulation += card.value;
        state.statusText = 'AMAN';
        state.statusType = 'safe';
        
        if (state.deck.length === 0) {
            state.statusText = 'Deck habis — Round selesai';
            state.statusType = 'ready';
            state.isGameOver = true;
        }
    } 
    else if (card.type === 'pop') {
        const penalty = state.accumulation + card.value;
        state.statusText = `POP! — Ambil ${penalty} kartu!`;
        state.statusType = 'danger';
        state.isGameOver = true;
    } 
    else if (card.type === 'uno') {
        state.statusText = 'UNO! — Buang kartu hingga sisa 1!';
        state.statusType = 'warning';
        state.isGameOver = true;
    }

    render();
}

function render() {
    DOM.deckCount.textContent = `${state.deck.length}/12`;
    DOM.accumCount.textContent = state.accumulation;
    DOM.gameStatus.textContent = state.statusText;
    DOM.gameStatus.className = `status-message ${state.statusType}`;

    if (state.activeCard) {
        DOM.activeCard.className = `card ${state.activeCard.color}`;
        DOM.activeCardValue.innerHTML = state.activeCard.label.replace(' ', '<br>');
    } else {
        DOM.activeCard.className = 'card empty';
        DOM.activeCardValue.innerHTML = '?';
    }

    DOM.btnDraw.disabled = state.isGameOver || state.deck.length === 0;
    DOM.historyCount.textContent = state.drawnCards.length;
    DOM.historyList.innerHTML = '';
    
    state.drawnCards.forEach(c => {
        const span = document.createElement('span');
        span.className = `history-item ${c.color}`;
        span.textContent = c.label;
        DOM.historyList.appendChild(span);
    });
}

// --- Event Listeners & Init ---
DOM.btnDraw.addEventListener('click', drawCard);
DOM.btnReset.addEventListener('click', initGame);

initGame();

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

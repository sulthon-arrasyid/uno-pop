// ==========================================
// 1. Inisialisasi Audio (Dengan Pengaman)
// ==========================================
const sfxDraw = new Audio('assets/audio/draw.mpeg');
const sfxPop = new Audio('assets/audio/pop.mpeg');
const sfxUno = new Audio('assets/audio/uno.mpeg');

// Fungsi pembantu agar error audio lokal tidak membuat web crash
function playAudioSafe(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.warn("Audio belum siap atau file tidak ditemukan, abaikan.", error);
    });
}

// ==========================================
// 2. Deklarasi State & Variabel Global
// ==========================================
const STORAGE_KEY = 'unoPopSaveData';

const state = {
    deck: [],
    drawnCards: [],
    accumulation: 0,
    activeCard: null,
    isGameOver: false,
    statusText: 'Siap bermain',
    statusType: 'ready'
};

const DOM = {
    deckCount: document.getElementById('deck-count'),
    accumCount: document.getElementById('accum-count'),
    gameStatus: document.getElementById('game-status'),
    activeCard: document.getElementById('active-card'),
    activeCardValue: document.getElementById('active-card-value'),
    btnDraw: document.getElementById('btn-draw'),
    btnReset: document.getElementById('btn-reset'),
    btnToggleSettings: document.getElementById('btn-toggle-settings'),
    btnSaveDeck: document.getElementById('btn-save-deck'),
    deckBuilderPanel: document.getElementById('deck-builder-panel'),
    historyList: document.getElementById('history-list'),
    historyCount: document.getElementById('history-count'),
    appContainer: document.querySelector('.app-container')
};

// ==========================================
// Efek Confetti (hand-rolled, tanpa dependency)
// ==========================================
function fireConfetti() {
    // Hormati preferensi reduce-motion (CSS tidak bisa menghentikan animasi canvas)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999';
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const rect = DOM.activeCard.getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    // Palet condong ke emas (momen UNO!)
    const colors = ['#F2B705', '#FFD400', '#F2B705', '#FFD400', '#1FA35A', '#E23B3B'];

    const parts = Array.from({ length: 100 }, () => ({
        x: ox, y: oy,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() * -12) - 4,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        size: 5 + Math.random() * 6,
        color: colors[(Math.random() * colors.length) | 0]
    }));

    const start = performance.now();
    const DURATION = 1600;
    let raf;

    function frame(now) {
        const t = now - start;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        parts.forEach(p => {
            p.vy += 0.35;      // gravitasi
            p.x += p.vx;
            p.y += p.vy;
            p.r += p.vr;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.r);
            ctx.globalAlpha = Math.max(0, 1 - t / DURATION);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });
        if (t < DURATION) {
            raf = requestAnimationFrame(frame);
        } else {
            cancelAnimationFrame(raf);
            canvas.remove();   // bersihkan — hindari kebocoran
        }
    }
    raf = requestAnimationFrame(frame);
}

// ==========================================
// 3. Sistem LocalStorage
// ==========================================
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        Object.assign(state, JSON.parse(savedData));
        return true;
    }
    return false;
}

// ==========================================
// 4. Logika Pembuatan Deck Custom
// ==========================================
function buildCustomDeck() {
    const qtyPlus1 = parseInt(document.getElementById('input-plus1').value) || 0;
    const qtyPlus2 = parseInt(document.getElementById('input-plus2').value) || 0;
    const qtyPlus3 = parseInt(document.getElementById('input-plus3').value) || 0;
    const qtyPop1 = parseInt(document.getElementById('input-pop1').value) || 0;
    const qtyPop2 = parseInt(document.getElementById('input-pop2').value) || 0;
    const qtyUno = parseInt(document.getElementById('input-uno').value) || 0;

    const newDeck = [];
    
    // Minimal 1 kartu +0 sebagai standar aman
    newDeck.push({ type: 'safe', value: 0, label: '+0', color: 'green' });
    
    for(let i=0; i<qtyPlus1; i++) newDeck.push({ type: 'safe', value: 1, label: '+1', color: 'green' });
    for(let i=0; i<qtyPlus2; i++) newDeck.push({ type: 'safe', value: 2, label: '+2', color: 'green' });
    for(let i=0; i<qtyPlus3; i++) newDeck.push({ type: 'safe', value: 3, label: '+3', color: 'green' });
    for(let i=0; i<qtyPop1; i++) newDeck.push({ type: 'pop', value: 1, label: 'POP! +1', color: 'red' });
    for(let i=0; i<qtyPop2; i++) newDeck.push({ type: 'pop', value: 2, label: 'POP! +2', color: 'red' });
    for(let i=0; i<qtyUno; i++) newDeck.push({ type: 'uno', value: 0, label: 'UNO!', color: 'gold' });

    return newDeck;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==========================================
// 5. Logika Utama Permainan
// ==========================================
function initGame(forceReset = false) {
    // Jika tidak dipaksa reset dan memori ada, muat ulang
    if (!forceReset && loadState()) {
        render();
        return;
    }

    // Jika force reset, mulai dari awal dengan settingan deck baru
    state.deck = shuffleArray(buildCustomDeck());
    state.drawnCards = [];
    state.accumulation = 0;
    state.activeCard = null;
    state.isGameOver = false;
    state.statusText = 'Siap bermain';
    state.statusType = 'ready';
    
    saveState();
    render();
}

function drawCard() {
    if (state.isGameOver || state.deck.length === 0) return;

    const card = state.deck.pop();
    
    // Haptic Feedback (Getar HP) — dibungkus rAF agar tidak blokir audio di Android PWA
    if (navigator.vibrate) {
        requestAnimationFrame(() => navigator.vibrate(card.type === 'safe' ? 50 : 200));
    }

    // Mainkan Audio dengan fungsi pengaman
    if (card.type === 'safe') playAudioSafe(sfxDraw);
    else if (card.type === 'pop') playAudioSafe(sfxPop);
    else if (card.type === 'uno') playAudioSafe(sfxUno);

    state.drawnCards.push(card);
    state.activeCard = card;

    // Kalkulasi Logika Permainan
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

    saveState();

    render();
    
    // Animasi Muncul Kartu
    DOM.activeCard.classList.remove('animate-flip');
    void DOM.activeCard.offsetWidth; // Trigger reflow animasi
    DOM.activeCard.classList.add('animate-flip');

    // Efek "momen besar"
    if (card.type === 'pop') {
        // Goyangan layar (retrigger via reflow, seperti flip)
        DOM.appContainer.classList.remove('shake');
        void DOM.appContainer.offsetWidth;
        DOM.appContainer.classList.add('shake');
    } else if (card.type === 'uno') {
        fireConfetti();
    }
}

// ==========================================
// 6. UI Renderer
// ==========================================
function render() {
    DOM.deckCount.textContent = `${state.deck.length} / ${state.deck.length + state.drawnCards.length}`;
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
    
    state.drawnCards.forEach((c, i) => {
        const span = document.createElement('span');
        span.className = `history-item ${c.color}`;
        // Hanya chip terbaru yang beranimasi masuk (render() membangun ulang seluruh daftar)
        if (i === state.drawnCards.length - 1 && state.activeCard) {
            span.classList.add('chip-in');
        }
        span.textContent = c.label;
        DOM.historyList.appendChild(span);
    });
}

// ==========================================
// 7. Event Listeners & Bootstrapping
// ==========================================

// Label tombol pengaturan mengikuti status panel (buka/tutup)
function setPanelLabel(open) {
    DOM.btnToggleSettings.textContent = open ? '✕ Tutup Pengaturan' : '⚙️ Atur Deck Custom';
    DOM.btnToggleSettings.classList.toggle('is-active', open);
}

// Tombol Panel Setting — buka/tutup via class (bukan inline display)
DOM.btnToggleSettings.addEventListener('click', () => {
    const open = DOM.deckBuilderPanel.classList.toggle('is-open');
    setPanelLabel(open);
});

// Tombol Simpan Setting Deck
DOM.btnSaveDeck.addEventListener('click', () => {
    initGame(true); // Param `true` akan memaksa game reset
    DOM.deckBuilderPanel.classList.remove('is-open');
    setPanelLabel(false);
});

// Tombol stepper +/- (delegasi) — ubah nilai input yang sama dengan clamp [0, max]
DOM.deckBuilderPanel.addEventListener('click', (e) => {
    const btn = e.target.closest('.step');
    if (!btn) return;
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    const step = parseInt(btn.dataset.step, 10) || 0;
    const max = parseInt(input.max, 10) || 30;
    const current = parseInt(input.value, 10) || 0;
    input.value = Math.min(max, Math.max(0, current + step));
});

// Tombol Main & Reset
DOM.btnDraw.addEventListener('click', drawCard);
DOM.btnReset.addEventListener('click', () => initGame(true));

// Mulai Game
initGame();

// Registrasi PWA (Abaikan pesan error jika sw.js belum ada di lokal)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .catch(err => console.log('Info: Service Worker tidak aktif di local mode.', err));
    });
}
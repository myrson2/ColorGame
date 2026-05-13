//global variable
let balance = null;
let bet = 0;

let getColorsInRoulette = null;
let rouletteIntervalId = null;

const betTiles = {
    red: null, 
    yellow: null,
    green: null,
    blue: null,
    purple: null,
    pink: null,
};

function getTotalBet() {
    return Object.values(betTiles).reduce((sum, value) => sum + value, 0);
}

const getColor = () => {
    return Object.keys(betTiles).filter(value => betTiles[value] != null && betTiles[value] > 0);
}

const colorMap = {
    'rgb(239, 68, 68)': 'red',     // #ef4444
    'rgb(245, 158, 11)': 'yellow',  // #f59e0b
    'rgb(16, 185, 129)': 'green',   // #10b981
    'rgb(59, 130, 246)': 'blue',    // #3b82f6
    'rgb(139, 92, 246)': 'purple',  // #8b5cf6
    'rgb(244, 114, 182)': 'pink'     // #f472b6
};

// Roulette Grid
const reel1Element = document.querySelector(".reel-1");
const reel2Element = document.querySelector(".reel-2");
const reel3Element = document.querySelector(".reel-3");

const menu_card = document.querySelector(".menu-card");
const save_play = document.querySelector(".input-play");
const setBet = document.querySelector(".bet-tiles-grid");
const input = document.querySelector('input[type="number"]');
const bet_grid = document.querySelector(".bet-grid");
const play_button = document.querySelector(".play-button");

function clickSaveGame() {
    const balance_value = document.querySelector(".balance-value");
    const bet_value = document.querySelector(".bet-value");
    console.log("Game Start!");
    menu_card.classList.toggle("hidden");

    balance_value.innerText = `Php ${balance}`;
}

//random roulette color feature
function colorRoulette() {
    const colors = [
        "#ef4444",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#8b5cf6",
        "#f472b6",
    ];

    const intervalId = setInterval(() => {
        let n1 = Math.floor(Math.random() * colors.length);
        let n2 = Math.floor(Math.random() * colors.length);
        let n3 = Math.floor(Math.random() * colors.length);

        reel1Element.style.backgroundColor = colors[n1];
        reel2Element.style.backgroundColor = colors[n2];
        reel3Element.style.backgroundColor = colors[n3];
    }, 300);

    return intervalId;
}

save_play.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".input-play")) {
        if (balance === null) {
            return alert("Enter your balance first!");
        }
        if (balance <= 100) {
            return alert("Balance should be more than 100");
        } else if (balance >= 10000) {
            return alert("Max Bet is 10000 only");
        } else if (bet === 0) {
            return alert("Select Quick Bet.");
        } else {
            clickSaveGame();
        }
    }
});

setBet.addEventListener("click", (e) => {
    bet = Number(e.target.dataset.value);
    console.log(`Set Bet: ${bet}`);
});

input.addEventListener("input", (e) => {
    const target = e.target.value.trim();
    if (target === "") {
        balance = null;
    } else {
        const value = Number(target);
        balance = Number.isFinite(value) ? value : null;
        console.log(`Balance: ${balance}`);
    }
});

bet_grid.addEventListener("click", (e) => {
    const tile = e.target.closest(".bet-tile");

    if (!tile) return; // clicked outside a tile
    if (bet <= 0) return;

    const color = tile.dataset.color;
    betTiles[color] += bet;

    if (getTotalBet() > balance) {
        betTiles[color] -= bet;
        return alert("You do not have enough balance");
    }

    tile.dataset.bet = betTiles[color];
    tile.textContent = tile.dataset.bet;
});

const betOccurrences = {} // storage of occurrence
const result = {} // result

play_button.addEventListener("click", () => {
    if (getTotalBet() === 0) return alert("Place your bet first");

    setTimeout(() => {
        clearInterval(rouletteIntervalId)
        const reels = [reel1Element.style.backgroundColor, reel2Element.style.backgroundColor, reel3Element.style.backgroundColor];
        getColorsInRoulette = reels.map(color => colorMap[color]);
        colorOccurrences(getColorsInRoulette)
        document.querySelector('.play-button').style.display = 'block';
        document.querySelector('.rolling-btn').style.display = 'none';
        setTimeout(() => {
           displayResult(result);
        }, 2000)
    }, 3000)

    rouletteIntervalId = colorRoulette();
    document.querySelector('.play-button').style.display = 'none';
    document.querySelector('.rolling-btn').style.display = 'block';
    
})


function colorOccurrences(colorsInRoulette) {
    const colors = getColor();
    console.log(colors);
    colors.forEach((color) => {
        const count = colorsInRoulette.filter((reelColor) => reelColor === color).length;
        betOccurrences[color] = count;
    });
    calculateResult(betOccurrences)
}

function calculateResult(betOccurrences) {
    Object.entries(betOccurrences).forEach(([color, count]) => {
        if(count === 0) {
            result[color] = betTiles[color] * -1;
        } else {
            result[color] = betTiles[color] * count;
        }
    });
}

// if no occurrences it will subtract to the bet itself

function displayResult(result) {
    displayInTableBody(result);
    displayInTotal(result);
    document.getElementById('resultModal').setAttribute('class', 'modal-overlay');
}

function displayInTableBody(result) {
    const betTableBody = document.getElementById('betTableBody'); 
    betTableBody.innerHTML = '';
    Object.entries(result).forEach(([color, amount]) => {
        const row = document.createElement('div');
        row.className = 'table-row';
        const label = color.charAt(0).toUpperCase() + color.slice(1);
        const stake = betTiles[color] ?? 0;
        const winLoseClass = amount >= 0 ? 'win-text' : 'lose-text';
        row.innerHTML = `
            <span class="row-color">${label}</span>
            <span class="row-bet">${stake}</span>
            <span class="row-winlose ${winLoseClass}">${amount}</span>
        `;
        betTableBody.appendChild(row);
    });
}

function displayInTotal(result) {
    let total = 0;
    Object.values(result).forEach((amount) => {
        total += amount;
    })
    document.getElementById('finalPayout').innerText = total;
    document.querySelector('.current-balance'). innerText = balance + total;
}

function closeModal() {
    document.getElementById('resultModal').setAttribute('class', 'modal-overlay-hidden');
}

function cashout() {
    document.getElementById('resultModal').setAttribute('class', 'modal-overlay-hidden');
}

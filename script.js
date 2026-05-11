//global variable
let balance = null;
let bet = 0;

let getColorsInRoulette = null;

const betTiles = {
    red: 0, 
    yellow: 0,
    green: 0,
    blue: 0,
    purple: 0,
    pink: 0,
};

function getTotalBet() {
    return Object.values(betTiles).reduce((sum, value) => sum + value, 0);
}

const getColor = () => {
    return Object.keys(betTiles).filter(value => betTiles[value] > 0);
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

play_button.addEventListener("click", () => {
    setTimeout(() => {
        clearInterval(rouletteIntervalId)
        const reels = [reel1Element.style.backgroundColor, reel2Element.style.backgroundColor, reel3Element.style.backgroundColor];
        getColorsInRoulette = reels.map(color => colorMap[color]);
        colorOccurrences(getColor(), reels);
    }, 3000)
    // Run some ui that shows that the rolling is happening
})

function colorOccurrences(userColors, reels) {
    userColors.forEach(colors => {
        const isFind = reels.find(color => color === colors);
        if (isFind) {
            const count = reels.filter(color => color === colors).length;
            console.log(`${colors} : ${count}`);
        }
    });
}

/*
Roll Feature and Result Display
- User Clicks Roll It
- The Roulette will take 3 secs to 
*/


let rouletteIntervalId = colorRoulette();  // call to always run this

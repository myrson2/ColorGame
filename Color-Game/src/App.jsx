import { useEffect, useState } from 'react';
import './css/App.css';
import './css/Rules.css'

const userSettings = {
  'startingBalance': 0,
  'betIncrements': 0
}

const validateSettings = () => {
  // Returns true only if both are positive numbers
  return userSettings.startingBalance > 0 && userSettings.betIncrements > 0;
}



const DescriptionComponent = ({ isOpen, onSave }) => {
  if (!isOpen) return null;

  function getBalance(event) {
    console.log(event.target.value);
    userSettings.startingBalance = Number(event.target.value);
  }

  function getIncrements(event) {
    console.log(event.target.dataset.value);
    userSettings.betIncrements = Number(event.target.dataset.value);
  }


  return (
    <>
      <section class="menu-card">
        <div class="menu">
          <div class="menu-container">
            <div class="welcome-header">
              <h1 className="welcome-title"><span style={{ fontSize: '24px' }}>WELCOME TO</span> <br /> <span style={{ fontSize: '70px' }}>COLORGAME</span></h1>
              <p class="welcome-subtitle">
                A high-fidelity simulation of the classic carnival color-betting game.
                Set your balance, place your chips, and test your luck!
              </p>
            </div>
            <div class="input-balance">
              <h2>Set Starting Balance</h2>
              <input type="number" placeholder="Enter starting balance" id="init-balance" onChange={getBalance} />
            </div>
            <div class="input-bet">
              <div class="bet-tiles-header">
                <span>Bet Increments</span>
                <hr />
              </div>
              <div class="bet-tiles-grid">
                <button class="bet red" data-value="5" onClick={getIncrements}>05</button>
                <button class="bet pink" data-value="10" onClick={getIncrements}>10</button>
                <button class="bet purple" data-value="50" onClick={getIncrements}>50</button>
                <button class="bet yellow" data-value="100" onClick={getIncrements}>100</button>
              </div>
            </div>
            <div class="input-play">
              <button id="start-game-btn" onClick={onSave}>Save & Play</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const RulesComponent = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="rules-overlay">
      <div className="rules-card">
        <h2 className="rules-title">Rules of the Game</h2>
        <p className="rules-desc">
          Place your bets on any of the color tiles. Click <strong>Roll It!</strong> to spin the reels.
          If the color you bet on matches any of the reels, you win a payout based on the number of matches!
        </p>

        <div className="rules-divider">
          <span>Payout Multipliers</span>
        </div>

        <div className="rules-payout-list">
          <div className="payout-item">
            <span className="match-count">1 Match</span>
            <span className="multiplier-value">x1 Payout</span>
          </div>
          <div className="payout-item">
            <span className="match-count">2 Matches</span>
            <span className="multiplier-value">x2 Payout</span>
          </div>
          <div className="payout-item">
            <span className="match-count">3 Matches</span>
            <span className="multiplier-value">x3 Payout</span>
          </div>
        </div>

        <button className="rules-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const ReelComponent = ({ colors, isSpinning }) => {
  const [color1, setColor1] = useState(0);
  const [color2, setColor2] = useState(0);
  const [color3, setColor3] = useState(0);

  useEffect(() => {
    if (!colors || colors.length === 0) return;

    if (!isSpinning) return;
    
    const interval = setInterval(() => {
      let color_reel1 = Math.floor(Math.random() * colors.length);
      let color_reel2 = Math.floor(Math.random() * colors.length);
      let color_reel3 = Math.floor(Math.random() * colors.length);

      setColor1(color_reel1);
      setColor2(color_reel2);
      setColor3(color_reel3);
    }, 300);
    return () => clearInterval(interval);
  }, [colors, isSpinning]);

      return (
        <>
          <div className={`reel-1 ${colors[color1]}`} ></div>
          <div className={`reel-2 ${colors[color2]}`}></div>
          <div className={`reel-3 ${colors[color3]}`}></div>
        </>
      );
}

function App() {
  const colors = ['red', 'yellow', 'green', 'blue', 'purple', 'pink'];

  const [showDescription, setShowDescription] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [isRolling, setIsRolling] = useState(true);

  const handleSave = () => {
    if (validateSettings()) {
      setShowDescription(false); // Hide the overlay
      // TODO: Set the React state for starting balance here so it shows in the footer!
    } else {
      alert("Please enter a starting balance and select a bet increment!");
    }
  };

  return (
    <>
      <DescriptionComponent isOpen={showDescription} onSave={handleSave} />
      <div className="game-container">
        <div className="header">
          <h1 class="logo">COLORGAME</h1>
          <button class="settings-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path
                d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
              />
            </svg>
          </button>
        </div>

        <div className="reels-container">
          <ReelComponent colors={colors} isSpinning={isRolling}/>
        </div>
        <div className="bet-section">
          <div class="bet-header">
            <span>Place Bet</span>
            <hr />
          </div>

          <div class="bet-grid">
            <button class="bet-tile red" data-betRed="0" data-color="red"></button>
            <button class="bet-tile green" data-betGreen="0" data-color="green"></button>
            <button class="bet-tile purple" data-betPurple="0" data-color="purple"></button>
            <button class="bet-tile yellow" data-betYellow="0" data-color="yellow"></button>
            <button class="bet-tile blue" data-betBlue="0" data-color="blue"></button>
            <button class="bet-tile pink" data-betPink="0" data-color="pink"></button>
          </div>
        </div>

        <div className="footer">
          <div class="info-group">
            <span class="label">Balance</span>
            <span class="balance-value">Php {(userSettings.startingBalance).toFixed(2)}</span>
          </div>
          <div class="info-group play-button">
            <button>Roll It!</button>
          </div>
          <div class="info-group align-right">
            <span class="label">Total Bet</span>
            <span class="bet-value">00</span>
          </div>
        </div>
      </div>
      <div className="rules">
        <button onClick={() => setShowRules(true)}> view rules </button>
      </div>
      <RulesComponent isOpen={showRules} onClose={() => setShowRules(false)} />
    </>
  );
}

export default App

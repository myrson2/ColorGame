import { useEffect, useState } from 'react';
import './css/App.css';
import './css/Rules.css'


//Components
const DescriptionComponent = ({ isOpen, onSave }) => {
  console.log('Description Component is running now.....');
  // 1. Add temporary local states to hold inputs
  const [tempBalance, setTempBalance] = useState(0);
  const [tempIncrement, setTempIncrement] = useState(0);

  if (!isOpen) return null;

  // 2. Update functions to set state instead of modifying objects
  function getBalance(event) {
    console.log('Setting Balance...');
    setTempBalance(Number(event.target.value));
  }
  function getIncrements(event) {
    console.log('Setting Increment...');
    setTempIncrement(Number(event.target.dataset.value));
  }

  return (
    <>
      <section className="menu-card">
        <div className="menu">
          <div className="menu-container">
            <div className="welcome-header">
              <h1 className="welcome-title"><span style={{ fontSize: '24px' }}>WELCOME TO</span> <br /> <span style={{ fontSize: '70px' }}>COLORGAME</span></h1>
              <p className="welcome-subtitle">
                A high-fidelity simulation of the classic carnival color-betting game.
                Set your balance, place your chips, and test your luck!
              </p>
            </div>
            <div className="input-balance">
              <h2>Set Starting Balance</h2>
              <input type="number" placeholder="Enter starting balance" id="init-balance" onChange={getBalance} />
            </div>
            <div className="input-bet">
              <div className="bet-tiles-header">
                <span>Bet Increments</span>
                <hr />
              </div>
              <div className="bet-tiles-grid">
                <button className="bet red" data-value="5" onClick={getIncrements}>05</button>
                <button className="bet pink" data-value="10" onClick={getIncrements}>10</button>
                <button className="bet purple" data-value="50" onClick={getIncrements}>50</button>
                <button className="bet yellow" data-value="100" onClick={getIncrements}>100</button>
              </div>
            </div>
            <div className="input-play">
              <button id="start-game-btn" onClick={() => onSave(tempBalance, tempIncrement)}>Save & Play</button>
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

const ReelComponent = ({ colors, isSpinning, finalValues }) => {
  const [tempColor1, setTempColor1] = useState(0);
  const [tempColor2, setTempColor2] = useState(0);
  const [tempColor3, setTempColor3] = useState(0);

  useEffect(() => {
    if (!colors || colors.length === 0) return;
    if (!isSpinning) return;

    // Shuffle colors while spinning
    const interval = setInterval(() => {
      setTempColor1(Math.floor(Math.random() * colors.length));
      setTempColor2(Math.floor(Math.random() * colors.length));
      setTempColor3(Math.floor(Math.random() * colors.length));
    }, 300);

    return () => clearInterval(interval);
  }, [colors, isSpinning]);

  // Determine what to display: shuffling values if spinning, final values if stopped
  const display1 = isSpinning ? tempColor1 : finalValues[0];
  const display2 = isSpinning ? tempColor2 : finalValues[1];
  const display3 = isSpinning ? tempColor3 : finalValues[2];

  return (
    <>
      <div className={`reel-1 ${colors[display1]}`} ></div>
      <div className={`reel-2 ${colors[display2]}`}></div>
      <div className={`reel-3 ${colors[display3]}`}></div>
    </>
  );
}

const SettingsComponent = ({ isOpen, onClose, onSave, balance, betIncrement }) => {

  const [tempBalance, setTempBalance] = useState(0);
  const [tempIncrement, setTempIncrement] = useState(0);

  if(!isOpen) return null;

   function getBalance(event) {
    console.log('Setting Balance...');
    setTempBalance(Number(event.target.value));
  }
  function getIncrements(event) {
    console.log('Setting Increment...');
    setTempIncrement(Number(event.target.dataset.value));
  }

  return (
    <>
      <div className="settings-overlay" id="settings-modal">
        <div className="settings-card">
          <div className="settings-header">
            <h2>Game Settings</h2>
          </div>
          <div className="settings-body">
            <div className="settings-group">
              <label>Current Balance</label>
              <div className="current-info-box">
                <span>Active Balance:</span>
                <span className="current-info-val" id="current-balance-display">Php {(Number(balance) || 0).toFixed(2)}</span>
              </div>
              <label htmlFor="edit-balance" style={{ marginTop: '6px' }}>New Balance Amount</label>
              <input type="number" className="settings-input" id="edit-balance" placeholder="Enter new balance..." onChange={getBalance}/>
            </div>

            <div className="settings-group">
              <label>Current Bet Increment</label>
              <div className="current-info-box">
                <span>Active Increment:</span>
                <span className="current-info-val" id="current-increment-display">Php {(Number(betIncrement) || 0).toFixed(2)}</span>
              </div>
              <label style={{ marginTop: '6px' }}>Select New Bet Increment</label>
              <div className="bet-increments-grid">
                <button type="button" className="bet-chip-btn red active" data-value="5" onClick={getIncrements}>05</button>
                <button type="button" className="bet-chip-btn pink" data-value="10" onClick={getIncrements}>10</button>
                <button type="button" className="bet-chip-btn purple" data-value="50" onClick={getIncrements}>50</button>
                <button type="button" className="bet-chip-btn yellow" data-value="100" onClick={getIncrements}>100</button>
              </div>
            </div>

            <div className="settings-actions">
              <button type="button" className="settings-btn-cancel" id="cancel-settings-btn" onClick={onClose}>Cancel</button>
              <button type="button" className="settings-btn-save" id="save-settings-btn" onClick={() => onSave(tempBalance, tempIncrement)}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//Main Components
function App() {
  console.log("App Component is Running.");

  let [betTiles, setBetTiles] = useState({});
  const [balance, setBalance] = useState(0);
  const [betIncrement, setBetIncrement] = useState(0);
  const [reelValues, setReelValues] = useState([0, 0, 0]); // Stores index of red, yellow, green, etc.
  const [showDescription, setShowDescription] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const colors = ['red', 'yellow', 'green', 'blue', 'purple', 'pink'];

  const showAppearedTiles = {}

  const validateSettings = (tempBalance, tempIncrement) => {
    // Returns true only if both are positive numbers
    return Number(tempBalance) > 0 && Number(tempIncrement) > 0;
  }

  const handleSave = (tempBalance, tempIncrement) => {
  console.log("Saving Balance and Increment....");
    if (validateSettings(tempBalance, tempIncrement)) {
      setBalance(tempBalance);
      setBetIncrement(tempIncrement);
      setShowDescription(false); // Hide the overlay
      setShowSettings(false);
      // TODO: Set the React state for starting balance here so it shows in the footer!
      setIsRolling(true);
    } else {
      alert("Please enter a starting balance and select a bet increment!");
      console.log("Failed saving Balance and Increment....");
    }
    console.log("Successfull saving Balance and Increment...");
    console.log(tempBalance);
    console.log(tempIncrement);
  };

  const handleRoll = () => {
    setIsRolling(true);

    // 1. Determine the final outcome indices (0 to 5) before rolling stops
    const final1 = Math.floor(Math.random() * colors.length);
    const final2 = Math.floor(Math.random() * colors.length);
    const final3 = Math.floor(Math.random() * colors.length);

    console.log(final1);
    console.log(final2);
    console.log(final3);

    setTimeout(() => {
      setIsRolling(false);

      // 2. Save the final results to App state
      setReelValues([final1, final2, final3]);

      // 3. Now you have access to the final colors to update showAppearedTiles or calculate payouts!
      showAppearedTiles.color1 = colors[final1];
      showAppearedTiles.color2 = colors[final2];
      showAppearedTiles.color3 = colors[final3];

      console.log("Appeared colors:", showAppearedTiles);
    }, 1500);
  };

  const handleBetTiles = (event) => {
    const color = event.target.dataset.color;
    setBetTiles((betTiles) => ({
      ...betTiles,
      [color]: (betTiles[color] || 0) + Number(betIncrement)
    }))
  }

  const handleSettingsBtn = () => {
    setShowSettings(true);
  } 

  return (
    <>
      <DescriptionComponent isOpen={showDescription} onSave={handleSave} />
      <div className="game-container">
        <div className="header">
          <h1 className="logo">COLORGAME</h1>
          <button className="settings-btn" onClick={handleSettingsBtn}>
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
        <SettingsComponent isOpen={showSettings} onClose={() => setShowSettings(false)} onSave={handleSave} balance={balance} betIncrement={betIncrement}/>

        <div className="reels-container">
          <ReelComponent colors={colors} isSpinning={isRolling} finalValues={reelValues} />

        </div>
        <div className="bet-section">
          <div className="bet-header">
            <span>Place Bet</span>
            <hr />
          </div>

          <div className="bet-grid">
            <button className="bet-tile red" data-color="red" onClick={handleBetTiles}>{betTiles.red > 0 && `${betTiles.red}`}</button>
            <button className="bet-tile green" data-color="green" onClick={handleBetTiles}>{betTiles.green > 0 && `${betTiles.green}`}</button>
            <button className="bet-tile purple" data-color="purple" onClick={handleBetTiles}>{betTiles.purple > 0 && `${betTiles.purple}`}</button>
            <button className="bet-tile yellow" data-color="yellow" onClick={handleBetTiles}>{betTiles.yellow > 0 && `${betTiles.yellow}`}</button>
            <button className="bet-tile blue" data-color="blue" onClick={handleBetTiles}>{betTiles.blue > 0 && `${betTiles.blue}`}</button>
            <button className="bet-tile pink" data-color="pink" onClick={handleBetTiles}>{betTiles.pink > 0 && `${betTiles.pink}`}</button>
          </div>
        </div>

        <div className="footer">
          <div className="info-group">
            <span className="label">Balance</span>
            <span className="balance-value">Php {(balance).toFixed(2)}</span>
          </div>
          <div className="info-group play-button">
            <button onClick={handleRoll}>Roll It!</button>
          </div>
          <div className="info-group align-right">
            <span className="label">Total Bet</span>
            <span className="bet-value">00</span>
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

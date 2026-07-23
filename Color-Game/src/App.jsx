import { useState } from 'react';
import DescriptionComponent from './components/DescriptionComponent';
import ReelComponent from './components/ReelComponent';
import RulesComponent from './components/RuleComponent';
import SettingsComponent from './components/SettingsComponent';
import './css/App.css';
import './css/Rules.css'

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
    return (Number(tempBalance) > 0 && Number(tempIncrement) > 0);
  }

  const handleSave = (tempBalance, tempIncrement) => {
    console.log("Saving Balance and Increment....");
    if (validateSettings(tempBalance, tempIncrement)) {
      setBalance(tempBalance);
      setBetIncrement(tempIncrement);
      setShowDescription(false); // Hide the overlay
      setShowSettings(false);
      setIsRolling(false);
    } else {
      alert("Please enter a starting balance greater than 0 and select a bet increment!");
      console.log("Failed saving Balance and Increment....");
    }
  };

  const handleRoll = () => {
    setIsRolling(true);

    // 1. Determine the final outcome indices (0 to 5) before rolling stops
    const final1 = Math.floor(Math.random() * colors.length);
    const final2 = Math.floor(Math.random() * colors.length);
    const final3 = Math.floor(Math.random() * colors.length);

    setTimeout(() => {
      setIsRolling(false);

      // 2. Save the final results to App state
      setReelValues([final1, final2, final3]);

      showAppearedTiles.color1 = colors[final1];
      showAppearedTiles.color2 = colors[final2];
      showAppearedTiles.color3 = colors[final3];

      console.log("Appeared colors:", showAppearedTiles);
    }, 1500);
  };

  const handleBetTiles = (event) => {
    const color = event.currentTarget.dataset.color;
    if (!color) return;
    setBetTiles((prev) => ({
      ...prev,
      [color]: (prev[color] || 0) + Number(betIncrement)
    }))
  }

  const handleSettingsBtn = () => {
    setShowSettings(true);
  }

  // Calculate total bet placed across all tiles
  const totalBet = Object.values(betTiles).reduce((sum, amount) => sum + amount, 0);

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
                d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103-78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
              />
            </svg>
          </button>
        </div>
        <SettingsComponent isOpen={showSettings} onClose={() => setShowSettings(false)} onSave={handleSave} balance={balance} betIncrement={betIncrement} />

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
            <button onClick={handleRoll} disabled={totalBet === 0 || isRolling}>
              {isRolling ? (
                <span className="spinner-container">
                  <span className="spinner"></span> Rolling...
                </span>
              ) : (
                "Roll It!"
              )}
            </button>
          </div>
          <div className="info-group align-right">
            <span className="label">Total Bet</span>
            <span className="bet-value">Php {totalBet.toFixed(2)}</span>
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

export default App;

import {useState} from "react";

const DescriptionComponent = ({ isOpen, onSave }) => {

  // 1. Add temporary local states to hold inputs
  const [tempBalance, setTempBalance] = useState(0);
  const [tempIncrement, setTempIncrement] = useState(0);

  if (!isOpen) return null;

  console.log('Description Component is running now.....');
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
              <input type="number" placeholder="Enter starting balance (min: PHP 1000)" id="init-balance" onChange={getBalance} />
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
              <button id="start-game-btn" onClick={() => onSave(tempBalance, tempIncrement)} disabled={tempBalance < 1000 || tempIncrement === 0} >Save & Play</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DescriptionComponent;
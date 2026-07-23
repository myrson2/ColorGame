import { useState } from "react";

const SettingsComponent = ({ isOpen, onClose, onSave, balance, betIncrement }) => {

  const [tempBalance, setTempBalance] = useState(0);
  const [tempIncrement, setTempIncrement] = useState(0);

  console.log(tempBalance);
  console.log(tempIncrement);

  if (!isOpen) return null;

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
              <input type="number" className="settings-input" id="edit-balance" placeholder="Enter new balance..." onChange={getBalance} />
            </div>

            <div className="settings-group">
              <label>Current Bet Increment</label>
              <div className="current-info-box">
                <span>Active Increment:</span>
                <span className="current-info-val" id="current-increment-display">Php {(Number(betIncrement) || 0).toFixed(2)}</span>
              </div>
              <label style={{ marginTop: '6px' }}>Select New Bet Increment</label>
              <div className="bet-increments-grid">
                <button type="button" className={`bet-chip-btn red ${tempIncrement === 5 ? 'active' : ''}`} data-value="5" onClick={getIncrements}>05</button>
                <button type="button" className={`bet-chip-btn pink ${tempIncrement === 10 ? 'active' : ''}`} data-value="10" onClick={getIncrements}>10</button>
                <button type="button" className={`bet-chip-btn purple ${tempIncrement === 50 ? 'active' : ''}`} data-value="50" onClick={getIncrements}>50</button>
                <button type="button" className={`bet-chip-btn yellow ${tempIncrement === 100 ? 'active' : ''}`} data-value="100" onClick={getIncrements}>100</button>
              </div>
            </div>

            <div className="settings-actions">
              <button type="button" className="settings-btn-cancel" id="cancel-settings-btn" onClick={onClose}>Cancel</button>
              <button type="button" className="settings-btn-save" id="save-settings-btn" onClick={() => onSave(tempBalance, tempIncrement)} disabled={tempBalance === 1000 || tempIncrement === 0}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsComponent;
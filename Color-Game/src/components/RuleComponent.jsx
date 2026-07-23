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

export default RulesComponent;
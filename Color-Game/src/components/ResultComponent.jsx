import "../css/Result.css";

const ResultBoardComponent = ({ color, bet, winLose }) => {
  return (
    <>
      <tr>
        <td>{color.toUpperCase()}</td>
        <td className="center">₱{bet}</td>
        <td className={`right ${winLose <= 0 ? "color-red" : "color-green"}`}>₱{winLose}</td>
      </tr>
    </>
  );
};

const ResultComponent = ({ isOpen, result, overallResult, balance, betTiles, onClose }) => {
  if (!isOpen) return null;

  console.log(result);
  return (
    <div className="result-overlay">
      <div className="result-section">
        <h1 className="result-title">Result:</h1>

        <div className="cards-container">
          <div className="card">
            <h2 className="card-title">Your Bet</h2>
            <div className="bet-table-container">
              <table className="bet-table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Color</th>
                    <th className="center" style={{ width: "30%" }}>
                      Bet
                    </th>
                    <th className="right" style={{ width: "30%" }}>
                      Win/Lose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result).map(([color, value]) => {
                    const betAmount = betTiles[color] || 0;
                    return (
                      <ResultBoardComponent
                        key={color}
                        color={color}
                        bet={betAmount}
                        winLose={value}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="right-column">
            <div className="card">
              <h2 className="card-title">Total</h2>
              <div className="total-display">
                <div className="total-amount">₱{balance + (overallResult)}</div>
                <div className="formula-text">
                  Formula: Balance = Current Balance + Total
                </div>
                <div className="stake-box">
                  <span className="stake-label">Calculated Stake:</span>
                  <span className={`stake-value ${overallResult <= 0 ? "color-red" : "color-green"}`}>₱{overallResult}</span>
                </div>
              </div>
            </div>

            <button className="action-btn btn-bet-again" onClick={onClose}>Bet Again</button>
            {/* <button className="action-btn btn-cashout">Cashout</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;

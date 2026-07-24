# 🛠️ Color Game — Implementation Issues & Action Plan

This document outlines identified logic edge cases, validation bugs, and React performance enhancements for the **Color Game** project so you can easily reference and implement them later.

---

## 🚩 1. Starting Balance Validation Logic

### Files Affected:
* [src/components/DescriptionComponent.jsx](file:///C:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/src/components/DescriptionComponent.jsx#L51)
* [src/components/SettingsComponent.jsx](file:///C:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/src/components/SettingsComponent.jsx#L57)

### Problem Description:
* In `DescriptionComponent.jsx`:
  ```jsx
  disabled={tempBalance <= 1000 || tempIncrement === 0}
  ```
  The placeholder states `(min: PHP 1000)`, but using `<=` prevents starting with exactly `1000`.
* In `SettingsComponent.jsx`:
  ```jsx
  disabled={tempBalance === 1000 || tempIncrement === 0}
  ```
  Disables saving when balance is `1000`, while allowing `<= 0` or invalid balances.

### Fix Instructions:
1. In `DescriptionComponent.jsx`: change `tempBalance <= 1000` to `tempBalance < 1000`.
2. In `SettingsComponent.jsx`: change `tempBalance === 1000` to `tempBalance <= 0`.

---

## 🚩 2. Bet vs. Balance Safeguard

### File Affected:
* [src/App.jsx](file:///C:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/src/App.jsx#L96-L103)

### Problem Description:
Currently, `handleBetTiles` increments tile bets without checking available balance. A user can place bets exceeding their active balance or bet when balance is `0`.

### Fix Instructions:
Update `handleBetTiles` in `App.jsx` to validate available funds:
```javascript
const handleBetTiles = (event) => {
  const color = event.currentTarget.dataset.color;
  if (!color) return;

  const currentBet = betTiles[color] || 0;
  const inc = Number(betIncrement);

  // Safeguard: Ensure total bet does not exceed current balance
  if (totalBet + inc > balance) {
    alert("Insufficient balance to place this bet!");
    return;
  }

  setBetTiles((prev) => ({
    ...prev,
    [color]: currentBet + inc
  }));
};
```

---

## 🚩 3. Unstable React Keys in Result Component

### File Affected:
* [src/components/ResultComponent.jsx](file:///C:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/src/components/ResultComponent.jsx#L45)

### Problem Description:
Using `key={crypto.randomUUID()}` inside `.map()` generates a new key on every single component render, forcing React to unmount and remount row items needlessly.

### Fix Instructions:
Replace `crypto.randomUUID()` with the item's unique `color` string:
```jsx
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
```

---

## 🚩 4. Reel Animation Frequency

### File Affected:
* [src/components/ReelComponent.jsx](file:///C:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/src/components/ReelComponent.jsx#L17)

### Problem Description:
The shuffle interval during spinning is set to `300ms`, making the reel roll look slow/choppy.

### Fix Instructions:
Change `300` to `80` or `100` for a smoother, faster arcade reel spinning experience:
```javascript
const interval = setInterval(() => {
  setTempColor1(Math.floor(Math.random() * colors.length));
  setTempColor2(Math.floor(Math.random() * colors.length));
  setTempColor3(Math.floor(Math.random() * colors.length));
}, 90);
```

---

## 💡 Optional Enhancements (Future Sprints)
- **Sound Effects**: Play audio cues when placing chips or spinning reels.
- **Clear Bets Button**: Add a button to reset current placed bets without needing to roll.
- **Streak / Win-Loss History**: Track win streaks across multiple rolls.

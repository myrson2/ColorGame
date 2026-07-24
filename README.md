# 🎨 Color Game Website

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6%2B-JavaScript-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-Educational-green)](#-license)

An interactive, high-fidelity web simulation of the traditional carnival **Color Betting Game** (popularly known as *Perya Color Game*). Built with **React 19** and **Vite**, this application features a sleek dark glassmorphism design system, state-synchronized color reel animations, and an automated multi-color payout calculation engine.

---

## 🌟 Features

- 🎲 **3-Reel Animated Spin Mechanism:** Experience visual reel spin animations with 6 vibrant colors (*Red, Yellow, Green, Blue, Purple, Pink*).
- 💰 **Dynamic Balance & Bet Allocation:** Set custom starting funds, configure bet increments, place bets across multiple colors, and clear bets with a single click.
- 📊 **Automated Payout Engine:** Real-time payout calculations based on reel matches (1x match = 1:1, 2x match = 2:1, 3x match = 3:1 payout).
- 🏆 **Comprehensive Result Breakdown:** Interactive result modal displaying color-by-color bet allocations, match multipliers, net gains/losses, and updated total balance.
- ⚙️ **Customizable Game Settings:** Modify balance and bet increments on the fly via the Settings modal.
- 📖 **Interactive Game Rules Modal:** In-game guide detailing rules, bet placement, and payout mechanics.
- 🎨 **Modern Dark Glassmorphic Design:** Polished UI featuring smooth CSS animations, hover scales, crisp typography, and fluid responsive layouts.

---

## 🎮 How to Play

1. **Initial Setup:**
   - Launch the application and enter your **Starting Balance** and **Bet Increment** amount in the welcome modal.
2. **Place Bets:**
   - Click on any of the 6 color tiles (*Red, Green, Purple, Yellow, Blue, Pink*). Each click adds your configured bet increment to that color.
   - Use **Clear Bets** if you want to reset your tile allocations before rolling.
3. **Roll It!:**
   - Click the **Roll It!** button to trigger the 3-reel color spin animation.
4. **Claim Results:**
   - Upon spin completion, a summary modal details your winnings or losses per color, calculates net earnings, and updates your balance.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) (Hooks, Functional Components, Dynamic Modals)
- **Build Tool:** [Vite 8](https://vitejs.dev/) (Lightning-fast HMR and bundling)
- **Styling:** Custom CSS3 (CSS Variables, Flexbox, Grid, Glassmorphic overlays & Keyframe Animations)
- **Code Quality:** [ESLint 10](https://eslint.org/) (Strict React hooks & refresh rules)

---

## 📂 Project Structure

```text
Color Game Website/
├── Color-Game/                 # React 19 + Vite Project Core
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images and SVG icons
│   │   ├── components/         # Modular React UI components
│   │   │   ├── DescriptionComponent.jsx  # Welcome / Initial Balance setup modal
│   │   │   ├── ReelComponent.jsx         # Animated 3-reel slot spinner
│   │   │   ├── ResultComponent.jsx       # Round result & payout breakdown modal
│   │   │   ├── RuleComponent.jsx         # Game rules & payout guide modal
│   │   │   └── SettingsComponent.jsx     # In-game balance & bet settings modal
│   │   ├── css/                # Modular stylesheet files
│   │   │   ├── App.css         # Main layout, betting grid, and controls styling
│   │   │   ├── Result.css      # Result modal layout and badges styling
│   │   │   ├── Rules.css       # Rules modal styling
│   │   │   └── index.css       # Global base styles
│   │   ├── App.jsx             # Main game logic, state controller & engine
│   │   └── main.jsx            # Application root entry point
│   ├── eslint.config.js        # Linter configuration
│   ├── package.json            # Dependencies and scripts
│   └── vite.config.js          # Vite build configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Color-Game-Website.git
   ```

2. **Navigate to the app directory:**
   ```bash
   cd "Color Game Website/Color-Game"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to the local URL provided by Vite (e.g., `http://localhost:5173`).

---

## 📜 Available Scripts

Inside the `Color-Game` directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local Vite development server with HMR. |
| `npm run build` | Compiles and builds the production bundle into `dist/`. |
| `npm run preview` | Previews the local production build. |
| `npm run lint` | Runs ESLint to check for code quality and syntax errors. |

---

## 🔮 Future Enhancements

- 💾 **Persistent State:** Integrate `localStorage` to save player balance and history across sessions.
- 🎵 **Sound Effects:** Add audio feedback for reel spinning, bet clicks, and victory fanfares using HTML5 Web Audio API.
- 🪙 **Multi-Denomination Chips:** Selectable betting chips (e.g., $1, $5, $25, $100) for more versatile betting.
- 📈 **Stats & Analytics:** Visual dashboard tracking total spins, win/loss ratio, and biggest payouts.

---

## 📝 License

This project is open-source and created for educational purposes. Feel free to explore, modify, and build upon it!

# 📄 AI Agent Instructions: Color Game Project

Welcome, AI Agent! This file defines the behavior, boundaries, and guidelines for developing and maintaining the **Color Game** codebase. Always reference this document and other files in the `.agents/` directory before proposing changes.

---

## 1. Professional Project Description

**Color Game Website** is an interactive, high-fidelity web-based simulation of the traditional carnival color-betting game (popularly known as "Perya Color Game"). It is engineered as an educational sandbox designed for learning and mastering modern React development, dynamic state synchronization, component encapsulation, and polished user interface transitions.

The game simulates the excitement of a live betting table:
1. **Core Gameplay Loop:** Players manage a virtual chip balance, allocate bets across a grid of six vibrant colors (Red, Green, Purple, Yellow, Blue, Pink), and trigger a spin of three color reels.
2. **Payout Logic:** Winnings are calculated based on matches between the player's bets and the color combination rolled on the reels, dynamically updating the player's total balance.
3. **Interactive Control Panels:** Interfaces for adjusting input balances, placing custom bets, viewing game rules, and tweaking settings.

---

## 2. Technical Stack
* **Framework:** React 19 (Functional Components, Hooks)
* **Build Tool:** Vite
* **Language:** ES6+ JavaScript
* **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid, Glassmorphic overlays)
* **Code Standards:** ESLint configuration with strict React rules

---

## 3. Core Implementation Guidelines

> [!IMPORTANT]
> All code contributions must align with the files in the [.agents/](file:///c:/Users/JoseMyrsonOBeros/Documents/Projects/Color%20Game%20Website/Color-Game/.agents/) directory. 

### State Management & Sync
* **Single Source of Truth:** Game values (current balance, placed bets, total bet amount, reel values, and spin state) must live in a unified React state structure.
* **No UI/State Desync:** Ensure state updates trigger appropriate rendering. When bets are placed, the total bet and player balance must update reactively.
* **Spin Animation Lifecycle:** Manage the spin animations using React state triggers, ensuring that payout calculations are only performed *after* the reels finish their visual spin sequence.

### Component Architecture
Keep the code modular and maintainable. App layouts should be split into discrete components:
* `Header`: Houses the title and settings trigger.
* `ReelsContainer`: Renders the three individual spinning reel slots.
* `BetSection`: Renders the grid of color tiles where players place their bets.
* `Footer`: Displays balance, total bet, and houses the primary roll trigger.
* `Modal / Menu Overlay`: Manages game instructions, initial balance settings, and game options.

### UI & Styling Guidelines
* **Glassmorphism & Contrast:** Maintain a premium dark theme with vibrant colored tiles (Red, Yellow, Green, Blue, Purple, Pink).
* **Responsive Layout:** The game container should remain centered and scale fluidly for mobile viewports using CSS media queries.
* **Micro-interactions:** Add satisfying click scales, hover states, and smooth transitions to buttons and betting tiles.

---

## 4. How to Collaborate (Rules of Engagement)
As an AI developer, you must act as a **Senior Mentor** to the user:
* **Pedagogical Approach:** Rather than writing the entire solution out of the gate, explain the underlying React logic (e.g., how to handle state arrays or timers) and guide the user to write code.
* **State Audits:** If the user encounters bugs, ask them to trace the state using `console.log` before suggesting patches.
* **Incremental Steps:** Break down complex changes (like adding a betting multiplier or sound effects) into small, testable sprints.

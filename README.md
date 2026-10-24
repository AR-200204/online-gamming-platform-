<div align="center">

# 🎮 PlayZone - Free Online Games

### 🕹️ Play Instantly. No Downloads. No Sign-ups. 100% Free.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🚀 Live Demo](#-live-demo) • [🎯 Features](#-features) • [🎲 Games](#-games) • [⚡ Quick Start](#-quick-start) • [🌐 Deploy](#-deployment)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Built-in Games
- 🐍 Snake Classic
- 🔢 2048 Puzzle
- 🧠 Memory Match
- ⭕ Tic Tac Toe
- 🐦 Flappy Bird
- 🧱 Breakout
- 🔨 Whack-a-Mole

</td>
<td width="50%">

### 🌐 Online Games
- 🏃 Neon Jump
- 🏀 Basketball Target
- 🎨 Color Block Away
- 🔫 Circle Shooter 3D
- 🏎️ Crazy Long Runner
- 🧩 Tile Connect Puzzle
- 🧊 Block Sort

</td>
</tr>
</table>

### 🌟 What Makes PlayZone Special

- ⚡ **Instant Play** — Games load immediately in your browser
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile
- 🎨 **Modern UI** — Dark theme with purple/pink gradients
- 🔍 **Smart Search** — Find games instantly
- 🏷️ **Category Filter** — Browse by genre (Action, Puzzle, Racing, etc.)
- 🚫 **No Downloads** — Everything runs in-browser
- 💯 **100% Free** — No subscriptions, no hidden fees
- 🎯 **23+ Playable Games** — Mix of custom and embedded titles

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| 🎨 **Frontend** | React 18 + TypeScript |
| ⚡ **Build Tool** | Vite 6 |
| 💅 **Styling** | Tailwind CSS 4 |
| 🎮 **Games Engine** | HTML5 Canvas API |
| 🖼️ **Images** | Unsplash + Y8.com CDN |
| 📦 **Package Manager** | npm |

---

## 🎲 Games Included

### 🏗️ Built-in Games (Custom Code)

| Game | Type | Description |
|------|------|-------------|
| 🐍 **Snake Classic** | Classic/Arcade | Eat food, grow longer, don't crash! |
| 🔢 **2048 Puzzle** | Puzzle | Merge tiles to reach 2048 |
| 🧠 **Memory Match** | Puzzle | Flip cards, find matching pairs |
| ⭕ **Tic Tac Toe** | Classic | Play X and O with a friend |
| 🐦 **Flappy Bird** | Arcade | Tap to fly through pipes |
| 🧱 **Breakout** | Arcade | Break bricks with a bouncing ball |
| 🔨 **Whack-a-Mole** | Action | Whack moles in 30 seconds |

### 🌐 Online Games (Y8.com Embed)

| Game | Category | Players |
|------|----------|---------|
| 🏃 Neon Jump | Action/Racing | 67.8K |
| 🏀 Basketball Target | Sports | 89.2K |
| 🎨 Color Block Away | Puzzle | 34.5K |
| 🔫 Circle Shooter 3D | Shooter | 28.3K |
| 🏎️ Crazy Long Runner | Racing | 72.1K |
| 🧩 Tile Connect Puzzle | Puzzle | 41.6K |
| 🧊 Block Sort | Puzzle | 25.8K |
| 🏍️ Moto Flip Race | Racing | 33.7K |
| 🧗 Wall Jump | Action | 19.4K |
| 🟣 Jelly Shift | Action | 44.2K |
| ⚡ Spikes | Classic | 16.8K |
| 🐦 Flappy Shooter | Shooter | 38.9K |
| 🧟 Zombie FPS Survival | Horror | 51.3K |
| 👥 Crowd Hunt 3D | Action | 29.6K |
| 🎯 Perfect Shot | Shooter | 35.1K |
| 🔷 Shape Race 3D | Racing | 22.7K |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 📥 Clone the repository
git clone https://github.com/yourusername/playzone.git
cd playzone

# 📦 Install dependencies
npm install

# 🚀 Start development server
npm run dev

# 🏗️ Build for production
npm run build

# 👀 Preview production build
npm run preview
```

### Project Structure

```
playzone/
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Navigation & search
│   │   ├── CategoryFilter.tsx # Genre filter buttons
│   │   ├── GameGrid.tsx       # Games grid layout
│   │   ├── GameCard.tsx       # Individual game card
│   │   ├── GamePlayer.tsx     # Game modal/player
│   │   └── Footer.tsx         # Site footer
│   ├── games/
│   │   └── BuiltInGames.tsx   # 7 custom HTML5 games
│   ├── data/
│   │   └── games.ts           # Games data & types
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
└── README.md                  # This file 📖
```

---

## 🌐 Deployment

### 🚀 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

### 🎈 Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

Or drag & drop the `dist/` folder at [netlify.com](https://netlify.com).

### ☁️ Deploy to Cloudflare Pages

1. Push code to GitHub
2. Connect repo at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy! 🎉

### 📄 Deploy to GitHub Pages

Add to `vite.config.ts`:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

Then push and enable GitHub Pages in repo settings.

---

## 🎨 Customization

### Add Your Own Game

1. Create a new game component in `src/games/BuiltInGames.tsx`:
```tsx
export function MyAwesomeGame() {
  // Your game logic here
  return <div>...</div>
}
```

2. Add it to `src/data/games.ts`:
```ts
{
  id: 999,
  title: '🎮 My Awesome Game',
  rating: 95,
  image: 'your-image-url',
  categories: ['Action'],
  playable: true,
  type: 'builtin',
  component: 'mygame',
}
```

3. Register in `src/components/GamePlayer.tsx`:
```tsx
case 'mygame': return <MyAwesomeGame />
```

### Add Embedded Games

Just add an iframe URL to `src/data/games.ts`:
```ts
{
  id: 998,
  title: 'Cool Game',
  type: 'iframe',
  embedUrl: 'https://y8.com/embed/game-name',
  // ... other fields
}
```

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Mobile | ✅ iOS & Android |

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-game`
3. Commit your changes: `git commit -m 'Add amazing game'`
4. Push to the branch: `git push origin feature/amazing-game`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- 🎮 Built-in games — Custom HTML5 Canvas implementations
- 🌐 Embedded games — Provided by [Y8.com](https://y8.com)
- 🖼️ Thumbnails — [Unsplash](https://unsplash.com) & Y8 CDN
- 🎨 Icons — Font Awesome & Emoji
- ⚡ Powered by [Vite](https://vitejs.dev) & [React](https://reactjs.org)

---

## 📬 Contact

- 🐙 **GitHub:** [yourusername](https://github.com/yourusername)
- 🐦 **Twitter:** [@yourhandle](https://twitter.com/yourhandle)
- 📧 **Email:** your@email.com

---

<div align="center">

### ⭐ If you like this project, give it a star on GitHub! ⭐

**Made with ❤️ and lots of 🎮**

[🔝 Back to Top](#-playzone---free-online-games)

</div>

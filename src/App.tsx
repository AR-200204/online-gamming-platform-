import { useState } from 'react'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import GameGrid from './components/GameGrid'
import GamePlayer from './components/GamePlayer'
import Footer from './components/Footer'
import { games, categories, Game } from './data/games'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGame, setActiveGame] = useState<Game | null>(null)

  const filteredGames = games.filter((game) => {
    const matchesCategory = activeCategory === 'All' || game.categories.includes(activeCategory)
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePlayGame = (game: Game) => {
    if (game.playable) {
      setActiveGame(game)
    }
  }

  const playableGames = games.filter(g => g.playable)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Playable Games Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-sm">▶</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Play Now</h2>
            <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium border border-green-500/30">
              {playableGames.length} GAMES
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {playableGames.map((game) => (
              <GameCardInline key={game.id} game={game} onPlay={handlePlayGame} />
            ))}
          </div>
        </section>

        {/* All Games Section */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <GameGrid games={filteredGames} onPlay={handlePlayGame} />
      </main>
      <Footer />

      {/* Game Player Modal */}
      {activeGame && (
        <GamePlayer
          game={activeGame}
          onClose={() => setActiveGame(null)}
        />
      )}
    </div>
  )
}

// Inline GameCard for the playable section
function GameCardInline({ game, onPlay }: { game: Game; onPlay: (game: Game) => void }) {
  return (
    <div
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 cursor-pointer"
      onClick={() => onPlay(game)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 flex gap-1">
          {game.isHot && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              🔥
            </span>
          )}
          {game.isNew && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
          )}
        </div>

        {/* Type badge */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {game.type === 'builtin' ? '🎮' : '🌐'}
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <h4 className="font-bold text-white text-xs mb-0.5 truncate group-hover:text-green-300 transition-colors">
          {game.title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-[10px] text-gray-400">
            <svg className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{game.rating}</span>
          </div>
          <span className="text-[10px] text-green-400 font-medium">▶ Play</span>
        </div>
      </div>
    </div>
  )
}

export default App

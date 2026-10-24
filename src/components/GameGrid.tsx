import { Game } from '../data/games'
import GameCard from './GameCard'

interface GameGridProps {
  games: Game[]
}

export default function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">No games found</h3>
        <p className="text-gray-500">Try a different search or category</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          🕹️ {games.length} Games Available
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Sort by:</span>
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Popular</option>
            <option>Newest</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

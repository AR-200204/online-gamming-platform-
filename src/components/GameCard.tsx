import { Game } from '../data/games'
import { useState } from 'react'

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Now
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {game.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              NEW
            </span>
          )}
          {game.isHot && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              🔥 HOT
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {game.rating}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="font-bold text-white text-sm mb-1 truncate group-hover:text-purple-300 transition-colors">
          {game.title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span>{game.players} playing</span>
          </div>
          <div className="flex items-center gap-1">
            {game.categories.slice(0, 1).map((cat) => (
              <span key={cat} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { Game } from '../data/games'
import { SnakeGame, Game2048, MemoryGame, TicTacToe, FlappyBird, BreakoutGame, WhackAMole } from '../games/BuiltInGames'

interface GamePlayerProps {
  game: Game | null
  onClose: () => void
}

export default function GamePlayer({ game, onClose }: GamePlayerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!game) return null

  const renderGame = () => {
    if (game.type === 'builtin') {
      switch (game.component) {
        case 'snake': return <SnakeGame />
        case '2048': return <Game2048 />
        case 'memory': return <MemoryGame />
        case 'tictactoe': return <TicTacToe />
        case 'flappy': return <FlappyBird />
        case 'breakout': return <BreakoutGame />
        case 'whack': return <WhackAMole />
        default: return <div className="text-white">Game not found</div>
      }
    } else if (game.type === 'iframe' && game.embedUrl) {
      return (
        <div className="w-full max-w-4xl">
          <div className="relative" style={{ paddingBottom: '75%', height: 0 }}>
            <iframe
              src={game.embedUrl}
              className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
              allow="fullscreen; autoplay; gamepad"
              allowFullScreen
              title={game.title}
            />
          </div>
          <p className="text-gray-400 text-xs mt-2 text-center">
            Game loaded from external source. Click inside the game to interact.
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎮</span>
            </div>
            <h2 className="text-lg font-bold text-white">{game.title}</h2>
            {game.type === 'builtin' && (
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                Built-in
              </span>
            )}
            {game.type === 'iframe' && (
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
                Online
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Game Content */}
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          {renderGame()}
        </div>
      </div>
    </div>
  )
}

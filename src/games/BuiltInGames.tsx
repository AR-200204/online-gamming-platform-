import { useState, useEffect, useCallback, useRef } from 'react'

// ============== SNAKE GAME ==============
export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const gameLoopRef = useRef<number | null>(null)
  const directionRef = useRef({ x: 1, y: 0 })
  const snakeRef = useRef([{ x: 10, y: 10 }])
  const foodRef = useRef({ x: 15, y: 15 })
  const gridSize = 20

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }]
    directionRef.current = { x: 1, y: 0 }
    foodRef.current = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) }
    setScore(0)
    setGameOver(false)
    setStarted(true)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellSize = canvas.width / gridSize

    // Background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid
    ctx.strokeStyle = '#16213e'
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }

    // Food
    ctx.fillStyle = '#ff6b6b'
    ctx.beginPath()
    ctx.arc(
      foodRef.current.x * cellSize + cellSize / 2,
      foodRef.current.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // Snake
    snakeRef.current.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * cellSize, segment.y * cellSize,
        segment.x * cellSize + cellSize, segment.y * cellSize + cellSize
      )
      if (index === 0) {
        gradient.addColorStop(0, '#4ecdc4')
        gradient.addColorStop(1, '#44bd63')
      } else {
        gradient.addColorStop(0, '#2ecc71')
        gradient.addColorStop(1, '#27ae60')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2)
    })
  }, [])

  const gameLoop = useCallback(() => {
    if (gameOver) return

    const snake = snakeRef.current
    const dir = directionRef.current
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

    // Wall collision
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      setGameOver(true)
      return
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      setGameOver(true)
      return
    }

    snake.unshift(head)

    // Food collision
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(prev => prev + 10)
      foodRef.current = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      }
    } else {
      snake.pop()
    }

    draw()
    gameLoopRef.current = window.setTimeout(gameLoop, 120) as unknown as number
  }, [draw, gameOver])

  useEffect(() => {
    if (started && !gameOver) {
      gameLoop()
    }
    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current)
    }
  }, [started, gameOver, gameLoop])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = directionRef.current
      switch (e.key) {
        case 'ArrowUp': if (dir.y !== 1) directionRef.current = { x: 0, y: -1 }; break
        case 'ArrowDown': if (dir.y !== -1) directionRef.current = { x: 0, y: 1 }; break
        case 'ArrowLeft': if (dir.x !== 1) directionRef.current = { x: -1, y: 0 }; break
        case 'ArrowRight': if (dir.x !== -1) directionRef.current = { x: 1, y: 0 }; break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => { draw() }, [draw])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-bold text-white">Score: {score}</div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-purple-500 rounded-lg"
      />
      {!started && (
        <button onClick={resetGame} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold">
          🐍 Start Snake
        </button>
      )}
      {gameOver && (
        <div className="text-center">
          <p className="text-red-400 font-bold text-lg mb-2">Game Over! Score: {score}</p>
          <button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold">
            Play Again
          </button>
        </div>
      )}
      <p className="text-gray-400 text-sm">Use arrow keys to move</p>
    </div>
  )
}

// ============== 2048 GAME ==============
export function Game2048() {
  const [grid, setGrid] = useState<number[][]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const initGrid = useCallback(() => {
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0))
    addRandom(newGrid)
    addRandom(newGrid)
    setGrid(newGrid)
    setScore(0)
    setGameOver(false)
  }, [])

  function addRandom(g: number[][]) {
    const empty: [number, number][] = []
    g.forEach((row, i) => row.forEach((cell, j) => { if (cell === 0) empty.push([i, j]) }))
    if (empty.length === 0) return
    const [r, c] = empty[Math.floor(Math.random() * empty.length)]
    g[r][c] = Math.random() < 0.9 ? 2 : 4
  }

  const move = useCallback((direction: string) => {
    if (gameOver) return
    setGrid(prev => {
      let g = prev.map(r => [...r])
      let moved = false
      let newScore = 0

      const slide = (row: number[]) => {
        let arr = row.filter(x => x !== 0)
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] === arr[i + 1]) {
            arr[i] *= 2
            newScore += arr[i]
            arr.splice(i + 1, 1)
          }
        }
        while (arr.length < 4) arr.push(0)
        return arr
      }

      if (direction === 'left') {
        g = g.map(row => { const newRow = slide(row); if (newRow.join() !== row.join()) moved = true; return newRow })
      } else if (direction === 'right') {
        g = g.map(row => { const rev = [...row].reverse(); const newRow = slide(rev).reverse(); if (newRow.join() !== row.join()) moved = true; return newRow })
      } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
          const col = [g[0][c], g[1][c], g[2][c], g[3][c]]
          const newCol = slide(col)
          if (newCol.join() !== col.join()) moved = true
          for (let r = 0; r < 4; r++) g[r][c] = newCol[r]
        }
      } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
          const col = [g[3][c], g[2][c], g[1][c], g[0][c]]
          const newCol = slide(col)
          if (newCol.join() !== col.join()) moved = true
          for (let r = 0; r < 4; r++) g[3 - r][c] = newCol[r]
        }
      }

      if (moved) {
        addRandom(g)
        setScore(prev => prev + newScore)
        // Check game over
        let hasEmpty = false
        let canMerge = false
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (g[i][j] === 0) hasEmpty = true
            if (j < 3 && g[i][j] === g[i][j + 1]) canMerge = true
            if (i < 3 && g[i][j] === g[i + 1][j]) canMerge = true
          }
        }
        if (!hasEmpty && !canMerge) setGameOver(true)
      }
      return g
    })
  }, [gameOver])

  useEffect(() => { initGrid() }, [initGrid])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft': e.preventDefault(); move('left'); break
        case 'ArrowRight': e.preventDefault(); move('right'); break
        case 'ArrowUp': e.preventDefault(); move('up'); break
        case 'ArrowDown': e.preventDefault(); move('down'); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [move])

  const getColor = (val: number) => {
    const colors: Record<number, string> = {
      0: 'bg-gray-700', 2: 'bg-yellow-100 text-gray-800', 4: 'bg-yellow-200 text-gray-800',
      8: 'bg-orange-300 text-white', 16: 'bg-orange-400 text-white', 32: 'bg-orange-500 text-white',
      64: 'bg-red-500 text-white', 128: 'bg-yellow-400 text-white', 256: 'bg-yellow-500 text-white',
      512: 'bg-yellow-600 text-white', 1024: 'bg-purple-500 text-white', 2048: 'bg-purple-600 text-white'
    }
    return colors[val] || 'bg-pink-600 text-white'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-white">Score: {score}</div>
        <button onClick={initGrid} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold">
          New Game
        </button>
      </div>
      <div className="bg-gray-800 p-3 rounded-xl border border-gray-600">
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg font-bold text-lg sm:text-xl transition-all ${getColor(cell)}`}
              >
                {cell > 0 ? cell : ''}
              </div>
            ))
          )}
        </div>
      </div>
      {gameOver && <p className="text-red-400 font-bold text-lg">Game Over! Final Score: {score}</p>}
      <p className="text-gray-400 text-sm">Use arrow keys to move tiles</p>
      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 sm:hidden">
        <div></div>
        <button onClick={() => move('up')} className="bg-gray-700 text-white p-3 rounded-lg text-xl">↑</button>
        <div></div>
        <button onClick={() => move('left')} className="bg-gray-700 text-white p-3 rounded-lg text-xl">←</button>
        <button onClick={() => move('down')} className="bg-gray-700 text-white p-3 rounded-lg text-xl">↓</button>
        <button onClick={() => move('right')} className="bg-gray-700 text-white p-3 rounded-lg text-xl">→</button>
      </div>
    </div>
  )
}

// ============== MEMORY GAME ==============
export function MemoryGame() {
  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎵', '🎸']
  const [cards, setCards] = useState<{ emoji: string; flipped: boolean; matched: boolean }[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)

  const initGame = useCallback(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map(emoji => ({ emoji, flipped: false, matched: false }))
    setCards(shuffled)
    setFlipped([])
    setMoves(0)
    setMatches(0)
  }, [])

  useEffect(() => { initGame() }, [initGame])

  const handleClick = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return

    const newCards = [...cards]
    newCards[index].flipped = true
    setCards(newCards)

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1)
      if (newCards[newFlipped[0]].emoji === newCards[newFlipped[1]].emoji) {
        newCards[newFlipped[0]].matched = true
        newCards[newFlipped[1]].matched = true
        setCards(newCards)
        setMatches(prev => prev + 1)
        setFlipped([])
      } else {
        setTimeout(() => {
          newCards[newFlipped[0]].flipped = false
          newCards[newFlipped[1]].flipped = false
          setCards([...newCards])
          setFlipped([])
        }, 800)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold text-white">Moves: {moves}</div>
        <div className="text-lg font-bold text-green-400">Matches: {matches}/{emojis.length}</div>
        <button onClick={initGame} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold">
          New Game
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl text-2xl sm:text-3xl font-bold transition-all duration-300 transform ${
              card.flipped || card.matched
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-100 rotate-0'
                : 'bg-gray-700 hover:bg-gray-600 scale-95'
            } ${card.matched ? 'opacity-70 ring-2 ring-green-400' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
      {matches === emojis.length && (
        <p className="text-green-400 font-bold text-lg">🎉 You won in {moves} moves!</p>
      )}
    </div>
  )
}

// ============== TIC TAC TOE ==============
export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const checkWinner = (b: (string | null)[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    for (const [a, bb, c] of lines) {
      if (b[a] && b[a] === b[bb] && b[a] === b[c]) return b[a]
    }
    if (b.every(cell => cell)) return 'Draw'
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = isX ? 'X' : 'O'
    setBoard(newBoard)
    setIsX(!isX)
    const w = checkWinner(newBoard)
    if (w) setWinner(w)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-bold text-white">
        {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} Wins! 🎉`) : `Player ${isX ? 'X' : 'O'}'s turn`}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-3xl sm:text-4xl font-bold transition-all ${
              cell === 'X' ? 'bg-purple-600 text-white' : cell === 'O' ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold">
        New Game
      </button>
    </div>
  )
}

// ============== FLAPPY BIRD ==============
export function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const gameRef = useRef<{
    bird: { y: number; velocity: number }
    pipes: { x: number; gap: number }[]
    frame: number
    score: number
  }>({ bird: { y: 200, velocity: 0 }, pipes: [], frame: 0, score: 0 })

  const resetGame = () => {
    gameRef.current = { bird: { y: 200, velocity: 0 }, pipes: [], frame: 0, score: 0 }
    setScore(0)
    setGameOver(false)
    setStarted(true)
  }

  const flap = () => {
    if (!started) { resetGame(); return }
    if (gameOver) { resetGame(); return }
    gameRef.current.bird.velocity = -6
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); flap() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [started, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !started || gameOver) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const gravity = 0.3
    const pipeWidth = 50
    const gapSize = 140
    const birdSize = 24

    const loop = () => {
      const game = gameRef.current

      // Update bird
      game.bird.velocity += gravity
      game.bird.y += game.bird.velocity

      // Update pipes
      game.frame++
      if (game.frame % 90 === 0) {
        const gap = 80 + Math.random() * 120
        game.pipes.push({ x: 400, gap })
      }
      game.pipes = game.pipes.filter(p => p.x > -pipeWidth)
      game.pipes.forEach(p => p.x -= 3)

      // Score
      game.pipes.forEach(p => {
        if (Math.abs(p.x - 60) < 3 && p.x < 60) {
          game.score++
          setScore(game.score)
        }
      })

      // Collision
      if (game.bird.y < 0 || game.bird.y > 380) {
        setGameOver(true)
        return
      }
      for (const p of game.pipes) {
        if (60 + birdSize > p.x && 60 < p.x + pipeWidth) {
          if (game.bird.y < p.gap || game.bird.y + birdSize > p.gap + gapSize) {
            setGameOver(true)
            return
          }
        }
      }

      // Draw
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, 400, 400)

      // Pipes
      game.pipes.forEach(p => {
        ctx.fillStyle = '#2ecc71'
        ctx.fillRect(p.x, 0, pipeWidth, p.gap)
        ctx.fillRect(p.x, p.gap + gapSize, pipeWidth, 400 - p.gap - gapSize)
        ctx.fillStyle = '#27ae60'
        ctx.fillRect(p.x - 3, p.gap - 20, pipeWidth + 6, 20)
        ctx.fillRect(p.x - 3, p.gap + gapSize, pipeWidth + 6, 20)
      })

      // Bird
      ctx.fillStyle = '#f1c40f'
      ctx.beginPath()
      ctx.arc(60, game.bird.y + birdSize / 2, birdSize / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#e67e22'
      ctx.beginPath()
      ctx.arc(70, game.bird.y + birdSize / 2, 5, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(animId)
  }, [started, gameOver])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-bold text-white">Score: {score}</div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-purple-500 rounded-lg cursor-pointer"
        onClick={flap}
      />
      {!started && (
        <button onClick={resetGame} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold">
          🐦 Start Flappy Bird
        </button>
      )}
      {gameOver && (
        <div className="text-center">
          <p className="text-red-400 font-bold text-lg mb-2">Game Over! Score: {score}</p>
          <button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold">
            Play Again
          </button>
        </div>
      )}
      <p className="text-gray-400 text-sm">Click or press Space to flap</p>
    </div>
  )
}

// ============== BREAKOUT GAME ==============
export function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const [won, setWon] = useState(false)
  const gameRef = useRef({
    ball: { x: 200, y: 350, dx: 3, dy: -3 },
    paddle: { x: 160, width: 80 },
    bricks: [] as { x: number; y: number; alive: boolean; color: string }[],
    score: 0
  })

  const initBricks = () => {
    const bricks: { x: number; y: number; alive: boolean; color: string }[] = []
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6']
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        bricks.push({ x: col * 50 + 2, y: row * 25 + 30, alive: true, color: colors[row] })
      }
    }
    return bricks
  }

  const resetGame = () => {
    gameRef.current = {
      ball: { x: 200, y: 350, dx: 3, dy: -3 },
      paddle: { x: 160, width: 80 },
      bricks: initBricks(),
      score: 0
    }
    setScore(0)
    setGameOver(false)
    setWon(false)
    setStarted(true)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      gameRef.current.paddle.x = Math.max(0, Math.min(400 - gameRef.current.paddle.width, x - gameRef.current.paddle.width / 2))
    }
    canvas.addEventListener('mousemove', handleMouse)
    return () => canvas.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !started || gameOver || won) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const ballRadius = 8
    const paddleHeight = 12

    const loop = () => {
      const game = gameRef.current
      const { ball, paddle, bricks } = game

      // Move ball
      ball.x += ball.dx
      ball.y += ball.dy

      // Wall collisions
      if (ball.x - ballRadius < 0 || ball.x + ballRadius > 400) ball.dx = -ball.dx
      if (ball.y - ballRadius < 0) ball.dy = -ball.dy

      // Paddle collision
      if (ball.y + ballRadius > 380 - paddleHeight && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -Math.abs(ball.dy)
        const hitPos = (ball.x - paddle.x) / paddle.width
        ball.dx = 6 * (hitPos - 0.5)
      }

      // Bottom
      if (ball.y > 400) {
        setGameOver(true)
        return
      }

      // Brick collision
      for (const brick of bricks) {
        if (!brick.alive) continue
        if (ball.x > brick.x && ball.x < brick.x + 48 && ball.y - ballRadius < brick.y + 22 && ball.y + ballRadius > brick.y) {
          brick.alive = false
          ball.dy = -ball.dy
          game.score += 10
          setScore(game.score)
        }
      }

      // Win check
      if (bricks.every(b => !b.alive)) {
        setWon(true)
        return
      }

      // Draw
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, 400, 400)

      // Bricks
      bricks.forEach(brick => {
        if (!brick.alive) return
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, 48, 22)
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'
        ctx.strokeRect(brick.x, brick.y, 48, 22)
      })

      // Ball
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fff'
      ctx.fill()
      ctx.shadowBlur = 0

      // Paddle
      const gradient = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.width, 0)
      gradient.addColorStop(0, '#9b59b6')
      gradient.addColorStop(1, '#e74c3c')
      ctx.fillStyle = gradient
      ctx.fillRect(paddle.x, 380 - paddleHeight, paddle.width, paddleHeight)

      animId = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(animId)
  }, [started, gameOver, won])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-bold text-white">Score: {score}</div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-purple-500 rounded-lg cursor-none"
      />
      {!started && (
        <button onClick={resetGame} className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold">
          🧱 Start Breakout
        </button>
      )}
      {gameOver && (
        <div className="text-center">
          <p className="text-red-400 font-bold text-lg mb-2">Game Over! Score: {score}</p>
          <button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold">Play Again</button>
        </div>
      )}
      {won && (
        <div className="text-center">
          <p className="text-green-400 font-bold text-lg mb-2">🎉 You Won! Score: {score}</p>
          <button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold">Play Again</button>
        </div>
      )}
      <p className="text-gray-400 text-sm">Move mouse to control paddle</p>
    </div>
  )
}

// ============== WHACK A MOLE ==============
export function WhackAMole() {
  const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setPlaying(false); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [playing])

  useEffect(() => {
    if (!playing) return
    const moleTimer = setInterval(() => {
      setMoles(prev => {
        const next = Array(9).fill(false)
        const count = Math.floor(Math.random() * 2) + 1
        for (let i = 0; i < count; i++) {
          next[Math.floor(Math.random() * 9)] = true
        }
        return next
      })
    }, 800)
    return () => clearInterval(moleTimer)
  }, [playing])

  const whack = (index: number) => {
    if (!playing || !moles[index]) return
    setMoles(prev => { const n = [...prev]; n[index] = false; return n })
    setScore(prev => prev + 1)
  }

  const start = () => {
    setScore(0)
    setTimeLeft(30)
    setPlaying(true)
    setMoles(Array(9).fill(false))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-white">Score: {score}</div>
        <div className="text-xl font-bold text-yellow-400">Time: {timeLeft}s</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {moles.map((isUp, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl text-4xl transition-all duration-150 ${
              isUp ? 'bg-amber-700 scale-110 shadow-lg shadow-amber-500/50' : 'bg-green-900 scale-100'
            }`}
          >
            {isUp ? '🐹' : '🕳️'}
          </button>
        ))}
      </div>
      {!playing && (
        <button onClick={start} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold">
          {timeLeft === 30 && score === 0 ? '🔨 Start Game' : 'Play Again'}
        </button>
      )}
      {timeLeft === 0 && <p className="text-green-400 font-bold text-lg">Final Score: {score}!</p>}
    </div>
  )
}

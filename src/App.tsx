import { useState } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import CategoryFilter from './components/CategoryFilter'
import GameGrid from './components/GameGrid'
import Footer from './components/Footer'
import { games, categories } from './data/games'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGames = games.filter((game) => {
    const matchesCategory = activeCategory === 'All' || game.categories.includes(activeCategory)
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <GameGrid games={filteredGames} />
      </main>
      <Footer />
    </div>
  )
}

export default App

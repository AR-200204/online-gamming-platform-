interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) {
  const categoryIcons: Record<string, string> = {
    'All': '🎮',
    'Action': '⚡',
    'Adventure': '🗺️',
    'Obby': '🏃',
    'Tycoon': '💰',
    'Racing': '🏎️',
    'Puzzle': '🧩',
    'Shooter': '🎯',
    'Simulation': '🏗️',
    'Sports': '⚽',
    'Horror': '👻',
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-white">🎯 Browse by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            <span>{categoryIcons[category] || '🎮'}</span>
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

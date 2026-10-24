import { useState, useEffect } from 'react'

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: 'Play Free Games Online',
      subtitle: 'Dive into hundreds of free online games. Play instantly in your browser!',
      gradient: 'from-purple-900/80 via-indigo-900/80 to-pink-900/80',
    },
    {
      title: 'New Games Every Week',
      subtitle: 'Discover fresh adventures and challenges added regularly!',
      gradient: 'from-blue-900/80 via-purple-900/80 to-indigo-900/80',
    },
    {
      title: 'Play With Friends',
      subtitle: 'Multiplayer games to enjoy together — no downloads needed!',
      gradient: 'from-pink-900/80 via-purple-900/80 to-blue-900/80',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/a58a15db-f5ff-4d5e-9548-930e3d48cfcb/_result.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} transition-all duration-1000`}></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-purple-200">Free to Play • No Downloads</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-500">
            {slides[currentSlide].title.split(' ').map((word, i) => (
              <span key={i}>
                {i >= 1 ? (
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{word} </span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-lg transition-all duration-500">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
              🎮 Play Now
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
              Browse All Games
            </button>
          </div>
          
          <div className="flex items-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Games</div>
            </div>
            <div className="w-px h-10 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10M+</div>
              <div className="text-sm text-gray-400">Players</div>
            </div>
            <div className="w-px h-10 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Free</div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-purple-400' : 'w-4 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

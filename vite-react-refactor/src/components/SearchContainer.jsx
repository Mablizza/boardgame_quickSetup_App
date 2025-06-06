import { useState } from 'react'
import GameCard from './GameCard'

function SearchContainer({ searchResults, onGameSelect, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch() {
    onSearch(searchTerm)
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="max-w-6xl mx-auto my-8 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
      <label htmlFor="input-element" className="block font-semibold text-gray-800 mb-2 text-lg">
        Search your game:
      </label>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          id="input-element"
          type="text"
          placeholder="example: Clank!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 max-w-md px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-900 hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          Search
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 border-t-2 border-primary">
        {searchResults.map((game, index) => (
          <GameCard
            key={`${game.title}-${index}`}
            game={game}
            onSelect={onGameSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchContainer
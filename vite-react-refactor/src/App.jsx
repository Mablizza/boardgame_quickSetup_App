import { useState } from 'react'
import Navigation from './components/Navigation'
import SearchContainer from './components/SearchContainer'
import DetailsContainer from './components/DetailsContainer'
import { bgCollection } from './data/boardgames'

function App() {
  const [selectedGame, setSelectedGame] = useState(null)
  const [searchResults, setSearchResults] = useState(bgCollection)
  const [showSearch, setShowSearch] = useState(true)

  function handleGameSelect(game) {
    setSelectedGame(game)
    setShowSearch(false)
  }

  function handleBackToSearch() {
    setSelectedGame(null)
    setShowSearch(true)
  }

  function handleSearch(searchTerm) {
    if (!searchTerm.trim()) {
      setSearchResults(bgCollection)
      return
    }
    
    const filtered = bgCollection.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navigation 
        selectedGame={selectedGame}
        onBackToSearch={handleBackToSearch}
      />
      
      {showSearch && (
        <SearchContainer
          searchResults={searchResults}
          onGameSelect={handleGameSelect}
          onSearch={handleSearch}
        />
      )}
      
      {selectedGame && (
        <DetailsContainer game={selectedGame} />
      )}
    </div>
  )
}

export default App
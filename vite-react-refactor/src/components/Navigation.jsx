function Navigation({ selectedGame, onBackToSearch }) {
  return (
    <nav className="bg-white/95 backdrop-blur-sm py-4 px-8 flex items-center gap-6 shadow-sm sticky top-0 z-50">
      <i className="fa-solid fa-dice fa-2xl text-primary hover:scale-110 transition-transform duration-200"></i>
      <h1 className="text-2xl font-bold text-gray-800 m-0">
        {selectedGame ? selectedGame.title : 'Quick Game Setup Guide'}
      </h1>
      {selectedGame && (
        <button 
          onClick={onBackToSearch}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ml-auto"
        >
          Go Back
        </button>
      )}
    </nav>
  )
}

export default Navigation
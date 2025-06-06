function GameCard({ game, onSelect }) {
  function handleClick() {
    onSelect(game)
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2"
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-4 min-h-[3rem] flex items-center justify-center leading-tight">
        {game.title}
      </h3>
      
      <img 
        src={game.img} 
        alt={`${game.title} sample image`}
        className="w-full max-w-[200px] h-[200px] object-cover rounded-lg mb-4 border border-gray-200 group-hover:scale-105 transition-transform duration-300"
      />
      
      <dl className="w-full">
        <dt className="font-semibold text-gray-600 text-sm mb-1">
          Number of Players:
        </dt>
        <dd className="bg-gray-50 text-primary px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
          <span>👥</span>
          {game.number_of_players}
        </dd>
      </dl>
    </div>
  )
}

export default GameCard
import HeroSection from './HeroSection'
import GameSection from './GameSection'

function DetailsContainer({ game }) {
  return (
    <div className="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <HeroSection game={game} />
      
      {game.details.board_setup && (
        <GameSection
          title="board_setup"
          content={game.details.board_setup}
          type="list"
        />
      )}
      
      {game.details.player_setup && (
        <GameSection
          title="player_setup"
          content={game.details.player_setup}
          type="list"
        />
      )}
      
      {game.details.player_turns && (
        <GameSection
          title="player_turns"
          content={game.details.player_turns}
          type="list"
        />
      )}
      
      {game.details.win_condition && (
        <GameSection
          title="win_condition"
          content={game.details.win_condition}
          type="text"
        />
      )}
      
      {game.pdf_rulebook && game.pdf_rulebook !== "" && (
        <div className="bg-gray-50 p-8 text-center border-t border-gray-200">
          <a 
            href={game.pdf_rulebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-success hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md inline-flex items-center gap-3"
          >
            <span>📄</span>
            SEE PDF RULEBOOK
          </a>
        </div>
      )}
    </div>
  )
}

export default DetailsContainer
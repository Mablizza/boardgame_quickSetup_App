import { useState } from 'react'

function GameSection({ title, content, type }) {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    setIsVisible(!isVisible)
  }

  function processContent(text) {
    // Remove the problematic link that points to non-existent brassActions.html
    const processedText = text.replace(
      /<span class='bold blue''><a href="\.\/extras\/brassActions\.html" target="_blank">\s*\[BUILD\], \[NETWORK\], \[DEVELOP\], \[SELL\], \[LOAN\], \[SCOUT\]\s*<\/a>\s*<\/span>/g,
      '<span class="font-bold text-blue-600">[BUILD], [NETWORK], [DEVELOP], [SELL], [LOAN], [SCOUT]</span>'
    )
    
    // Convert other HTML spans to Tailwind classes
    return processedText
      .replace(/class='bold'/g, 'class="font-bold"')
      .replace(/class="bold"/g, 'class="font-bold"')
      .replace(/<\/br>/g, '<br/>')
  }

  function getColorScheme() {
    const schemes = {
      board_setup: { from: 'from-blue-600', to: 'to-blue-700', hover: 'hover:from-blue-700 hover:to-blue-800', bg: 'bg-blue-600' },
      player_setup: { from: 'from-green-600', to: 'to-green-700', hover: 'hover:from-green-700 hover:to-green-800', bg: 'bg-green-600' },
      player_turns: { from: 'from-purple-600', to: 'to-purple-700', hover: 'hover:from-purple-700 hover:to-purple-800', bg: 'bg-purple-600' },
      win_condition: { from: 'from-amber-600', to: 'to-amber-700', hover: 'hover:from-amber-700 hover:to-amber-800', bg: 'bg-amber-600' }
    }
    return schemes[title] || schemes.board_setup
  }

  function renderContent() {
    const colors = getColorScheme()
    
    if (type === 'list') {
      return (
        <div className={`transition-all duration-300 ${isVisible ? 'block' : 'hidden'}`}>
          <ol className="space-y-4 text-gray-700">
            {Object.values(content).map((item, index) => (
              <li key={index} className="flex gap-4">
                <span className={`flex-shrink-0 w-8 h-8 ${colors.bg} text-white rounded-full flex items-center justify-center font-semibold text-sm`}>
                  {index + 1}
                </span>
                <div 
                  dangerouslySetInnerHTML={{ __html: processContent(item) }} 
                  className="text-gray-700 leading-relaxed"
                />
              </li>
            ))}
          </ol>
        </div>
      )
    } else {
      return (
        <div className={`transition-all duration-300 ${isVisible ? 'block' : 'hidden'}`}>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-trophy text-amber-600 text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-amber-800 mb-2">Victory Condition</h4>
                <p 
                  className="text-amber-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: processContent(content) }}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const displayTitle = title.replace('_', ' ').toUpperCase()
  const colors = getColorScheme()

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div 
        onClick={toggleVisibility} 
        className={`bg-gradient-to-r ${colors.from} ${colors.to} text-white p-4 cursor-pointer ${colors.hover} transition-all duration-200`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className={`text-xl ${
              title === 'board_setup' ? 'fa-solid fa-chess-board' :
              title === 'player_setup' ? 'fa-solid fa-users' :
              title === 'player_turns' ? 'fa-solid fa-rotate' :
              'fa-solid fa-trophy'
            }`}></i>
            <span className="text-xl font-semibold">{displayTitle}</span>
          </div>
          <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}></i>
        </div>
      </div>
      <div className="p-6 bg-white">
        {renderContent()}
      </div>
    </div>
  )
}

export default GameSection
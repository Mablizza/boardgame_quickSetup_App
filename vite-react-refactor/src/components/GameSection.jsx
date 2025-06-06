import { useState } from 'react'

function GameSection({ title, content, type }) {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    setIsVisible(!isVisible)
  }

  function processContent(text) {
    // Remove the problematic link that points to non-existent brassActions.html
    // Replace it with just the action list text
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

  function renderContent() {
    if (type === 'list') {
      return (
        <ol className={`list-none pl-0 space-y-4 transition-all duration-300 ${isVisible ? 'block' : 'hidden'}`}>
          {Object.values(content).map((item, index) => (
            <li 
              key={index} 
              className="relative pl-12 leading-relaxed counter-increment"
              style={{ counterIncrement: 'step-counter' }}
            >
              <div className="absolute left-0 top-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div 
                dangerouslySetInnerHTML={{ __html: processContent(item) }} 
                className="text-gray-700"
              />
            </li>
          ))}
        </ol>
      )
    } else {
      return (
        <div className={`transition-all duration-300 ${isVisible ? 'block' : 'hidden'}`}>
          <p 
            className="px-4 leading-relaxed text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: processContent(content) }}
          />
        </div>
      )
    }
  }

  const displayTitle = title.replace('_', ' ').toUpperCase()

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h2 
        onClick={toggleVisibility} 
        className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 m-0 cursor-pointer transition-all duration-200 hover:from-primary-dark hover:to-primary font-semibold uppercase tracking-wide relative"
      >
        {displayTitle}
        <span className={`absolute right-6 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </h2>
      <div className="px-8 py-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default GameSection
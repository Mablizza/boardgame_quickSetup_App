function HeroSection({ game }) {
  return (
    <div className="bg-gray-50 p-8 text-center border-b border-gray-200">
      <img 
        src={game.img} 
        alt={`${game.title} hero image`}
        className="max-w-md max-h-80 w-full object-contain rounded-lg shadow-lg mx-auto"
      />
    </div>
  )
}

export default HeroSection
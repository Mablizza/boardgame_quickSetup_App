# Board Game Quick Setup - React Refactor

A modern React application for quickly accessing board game setup instructions and rules. This is a refactored version of the original vanilla JavaScript application using Vite and React.

## 🎯 Features

- **Game Search**: Quickly find your board game from the collection
- **Setup Instructions**: Detailed step-by-step setup guides
- **Player Setup**: Clear instructions for preparing players
- **Turn Structure**: Understanding how player turns work
- **Win Conditions**: Know exactly how to win each game
- **PDF Rulebooks**: Direct links to official rulebooks when available
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd vite-react-refactor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Navigation.jsx          # App navigation bar
│   ├── SearchContainer.jsx     # Search interface and game grid
│   ├── GameCard.jsx           # Individual game card component
│   ├── DetailsContainer.jsx   # Game details wrapper
│   ├── HeroSection.jsx        # Game image display
│   └── GameSection.jsx        # Collapsible game instruction sections
├── data/
│   └── boardgames.js          # Game collection data
├── App.jsx                    # Main application component
├── App.css                    # Application styles
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

### Key Features Implementation

1. **State Management**: Uses React hooks (useState) for managing:
   - Selected game state
   - Search results filtering
   - UI view switching (search vs details)

2. **Component Architecture**: 
   - Follows single responsibility principle
   - Uses function declarations as per coding standards
   - Implements proper separation of concerns

3. **Responsive Design**: 
   - Mobile-first approach
   - CSS Grid for game card layout
   - Responsive navigation and typography

## 🎮 Current Game Collection

The application includes setup guides for:
- Wasteland Express
- Clank! A Deck-Building Adventure
- Clank! in! Space!
- Ark Nova
- Mag Blast (3rd Ed.)
- Brass Birmingham
- Machi Koro
- Scythe

## 🔄 Refactoring Highlights

### Improvements from Vanilla JS Version:
1. **Modern React Architecture**: Component-based structure with proper state management
2. **Better Code Organization**: Clear separation between components, data, and styles
3. **Enhanced Maintainability**: Each component has a single responsibility
4. **Type Safety Ready**: Structure supports future TypeScript migration
5. **Performance**: React's virtual DOM and component optimization
6. **Development Experience**: Hot module replacement and better debugging

### Hero Section Visibility
The hero section (game background image) is now properly managed through React state:
- **Hidden during search**: Hero section only appears when a game is selected
- **Visible during game details**: Shows the game's featured image
- **Smooth transitions**: State-driven UI changes provide better UX

## 🛣️ Roadmap Integration

This refactor aligns with the product roadmap for:

### Phase 1 - Foundation (✅ Completed)
- Modern React architecture
- Component-based structure
- Responsive design maintenance
- State management foundation

### Phase 2 - Upcoming Features
- User authentication system
- Backend API integration
- User-generated content capabilities
- Cross-device synchronization

### Phase 3 - Future Enhancements
- AI-powered content generation
- Advanced search and filtering
- Community features
- Mobile app conversion (React Native)

## 📱 Mobile Optimization

The application is fully optimized for mobile devices:
- Touch-friendly interface
- Responsive grid layouts
- Optimized typography and spacing
- Fast loading and smooth interactions

## 🎨 Design System

The application uses a consistent design system with:
- **Color Palette**: Professional blue and gray theme
- **Typography**: Modern system fonts with proper hierarchy
- **Spacing**: Consistent spacing using CSS custom properties
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and hover effects

## 🔧 Technical Decisions

### Why Vite?
- **Fast Development**: Lightning-fast HMR (Hot Module Replacement)
- **Modern Tooling**: Built on modern JavaScript tools
- **Optimized Builds**: Efficient production builds
- **Simple Configuration**: Minimal setup required

### Why Function Declarations?
Following the coding standards specified in the requirements:
- All functions use `function myFunction()` syntax
- Clear separation between functions and variables
- Consistent code style throughout the application

## 📂 Project Structure

```
vite-react-refactor/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   ├── data/                # Static data files
│   ├── App.jsx              # Main app component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🤝 Contributing

This project follows specific coding guidelines:
1. Use function declarations for all JavaScript/JSX functions
2. Maintain component single responsibility
3. Follow the established file naming conventions
4. Ensure mobile responsiveness for all new features

## 🚀 Deployment

To deploy this application:

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Cloudflare Pages

## 📞 Support

For questions about this refactor or the roadmap implementation, please refer to the product roadmap document or create an issue in the project repository.

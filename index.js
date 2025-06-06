import { bgCollection } from "./boardgames.js"

// Global state management
let selectedTitle = ""
let searchedBG = ""
let filteredBGArray = []
let currentFilter = "all"
let favorites = JSON.parse(localStorage.getItem('bg-favorites') || '[]')
let recentlyViewed = JSON.parse(localStorage.getItem('bg-recent') || '[]')

// Initialize the application
function initializeApp() {
    addSearchFunctionality()
    addFilterFunctionality()
    addKeyboardNavigation()
    generateSummaryCardsArray(bgCollection)
    updateSearchResults(bgCollection.length, bgCollection.length)
}

// Enhanced search functionality with real-time filtering
function addSearchFunctionality() {
    const inputEle = document.getElementById("input-element")
    const searchBtn = document.getElementById("search-btn")
    const clearBtn = document.getElementById("clear-search-btn")
    
    inputEle.value = ""

    function performSearch() {
        const searchTerm = inputEle.value.toLowerCase().trim()
        searchedBG = searchTerm
        
        // Start with base collection based on current filter
        let baseCollection = getFilteredCollection()
        
        // Apply search filter if there's a search term
        if (searchTerm) {
            filteredBGArray = baseCollection.filter((boardgame) => 
                boardgame.title.toLowerCase().includes(searchTerm) ||
                boardgame.number_of_players.includes(searchTerm)
            )
        } else {
            filteredBGArray = baseCollection
        }
        
        generateSummaryCardsArray(filteredBGArray)
        updateSearchResults(filteredBGArray.length, baseCollection.length)
        showNoResultsIfNeeded()
    }

    // Real-time search as user types
    inputEle.addEventListener("input", debounce(performSearch, 300))
    
    // Search button click
    searchBtn.addEventListener("click", performSearch)

    // Enter key search
    inputEle.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            performSearch()
        }
    })

    // Clear search functionality
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            inputEle.value = ""
            searchedBG = ""
            performSearch()
        })
    }
}

// Filter functionality
function addFilterFunctionality() {
    const filterChips = document.querySelectorAll('.filter-chip')
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'))
            this.classList.add('active')
            
            // Update current filter
            currentFilter = this.dataset.filter
            
            // Apply filters
            applyCurrentFilter()
        })
    })
}

// Get filtered collection based on current filter
function getFilteredCollection() {
    switch (currentFilter) {
        case 'favorites':
            return bgCollection.filter(game => favorites.includes(game.title))
        case 'recent':
            return bgCollection.filter(game => recentlyViewed.includes(game.title))
        case '2':
            return bgCollection.filter(game => game.number_of_players.includes('2'))
        case '3':
            return bgCollection.filter(game => 
                game.number_of_players.includes('3') || game.number_of_players.includes('4')
            )
        case '5':
            return bgCollection.filter(game => {
                const maxPlayers = parseInt(game.number_of_players.split('-')[1] || game.number_of_players)
                return maxPlayers >= 5
            })
        case 'all':
        default:
            return bgCollection
    }
}

// Apply current filter and search
function applyCurrentFilter() {
    const baseCollection = getFilteredCollection()
    
    // Apply search term if exists
    if (searchedBG) {
        filteredBGArray = baseCollection.filter((boardgame) => 
            boardgame.title.toLowerCase().includes(searchedBG) ||
            boardgame.number_of_players.includes(searchedBG)
        )
    } else {
        filteredBGArray = baseCollection
    }
    
    generateSummaryCardsArray(filteredBGArray)
    updateSearchResults(filteredBGArray.length, baseCollection.length)
    showNoResultsIfNeeded()
}

// Enhanced card generation with favorites and improved UI
function generateSummaryCardsArray(bgArray) {
    const cardContainerDiv = document.getElementById("card-container")
    let idGenerator = 1

    cardContainerDiv.innerHTML = ""
    
    if (bgArray.length === 0) {
        return
    }

    bgArray.forEach(boardgame => {
        const isFavorited = favorites.includes(boardgame.title)
        const isRecentlyViewed = recentlyViewed.includes(boardgame.title)
        
        const cardHTML = `
            <div class="summary-card fade-in" id="id-0${idGenerator}" data-game-title="${boardgame.title}">
                <div style="position: relative;">
                    <img src="${boardgame.img}" alt="${boardgame.title} game cover" loading="lazy">
                    ${isRecentlyViewed ? '<div style="position: absolute; top: 0.5rem; left: 0.5rem; background: rgba(37, 99, 235, 0.9); color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">Recently Viewed</div>' : ''}
                </div>
                <h3>${highlightSearchTerm(boardgame.title, searchedBG)}</h3>
                <div class="card-meta">
                    <span class="player-count">
                        <i class="fa-solid fa-users"></i>
                        ${boardgame.number_of_players} players
                    </span>
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                            onclick="toggleFavorite('${boardgame.title}', event)"
                            aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
                            title="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fa-${isFavorited ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `
        cardContainerDiv.innerHTML += cardHTML
        idGenerator++
    })

    // Re-add click listeners to new cards
    addClickListenerToCards()
}

// Highlight search terms in results
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark style="background: #fef3c7; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">$1</mark>')
}

// Favorites functionality
function toggleFavorite(gameTitle, event) {
    event.stopPropagation() // Prevent card click
    
    const index = favorites.indexOf(gameTitle)
    if (index > -1) {
        favorites.splice(index, 1)
        showToast(`Removed "${gameTitle}" from favorites`, 'info')
    } else {
        favorites.push(gameTitle)
        showToast(`Added "${gameTitle}" to favorites`, 'success')
    }
    
    // Save to localStorage
    localStorage.setItem('bg-favorites', JSON.stringify(favorites))
    
    // Update UI if we're on favorites filter
    if (currentFilter === 'favorites') {
        applyCurrentFilter()
    } else {
        // Just update the button state
        const favoriteBtn = event.target.closest('.favorite-btn')
        const icon = favoriteBtn.querySelector('i')
        const isFavorited = favorites.includes(gameTitle)
        
        favoriteBtn.classList.toggle('favorited', isFavorited)
        icon.className = `fa-${isFavorited ? 'solid' : 'regular'} fa-heart`
        favoriteBtn.setAttribute('aria-label', isFavorited ? 'Remove from favorites' : 'Add to favorites')
        favoriteBtn.setAttribute('title', isFavorited ? 'Remove from favorites' : 'Add to favorites')
    }
}

// Enhanced card click functionality
function addClickListenerToCards() {
    const summaryCards = document.getElementsByClassName("summary-card")

    for (let i = summaryCards.length - 1; i >= 0; i--) {
        summaryCards[i].addEventListener("click", handleCardClick)
    }
}

function handleCardClick(e) {
    // Don't trigger if clicking on favorite button
    if (e.target.closest('.favorite-btn')) {
        return
    }

    const searchContainer = document.getElementById("search-container")
    let clickedID = ""
    let cardElement = e.target

    // Find the card element
    while (cardElement && !cardElement.classList.contains('summary-card')) {
        cardElement = cardElement.parentElement
    }

    if (!cardElement) return

    clickedID = cardElement.id
    const titleElement = cardElement.querySelector('h3')
    
    if (!titleElement) return

    selectedTitle = cardElement.dataset.gameTitle || titleElement.textContent.replace(/<[^>]*>/g, '') // Remove HTML tags
    
    if (selectedTitle && 
        selectedTitle !== "board_setup" && 
        selectedTitle !== "player_setup" && 
        selectedTitle !== "player_turns" &&
        selectedTitle !== "win_condition") {
        
        // Add to recently viewed
        addToRecentlyViewed(selectedTitle)
        
        // Show loading
        showLoadingIndicator()
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            renderTitle(selectedTitle)
            searchContainer.classList.add('hidden')
            displayCardDetails()
            hideLoadingIndicator()
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 500)
    }
}

// Recently viewed functionality
function addToRecentlyViewed(gameTitle) {
    // Remove if already exists
    const index = recentlyViewed.indexOf(gameTitle)
    if (index > -1) {
        recentlyViewed.splice(index, 1)
    }
    
    // Add to beginning
    recentlyViewed.unshift(gameTitle)
    
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10)
    
    // Save to localStorage
    localStorage.setItem('bg-recent', JSON.stringify(recentlyViewed))
}

// Enhanced title rendering
function renderTitle(title = "Quick Game Setup Guide") {
    const logoEl = document.getElementById("page-logo")
    const pageTitle = document.getElementById("page-title")
    const goBackEl = document.getElementById("go-back")
    const detailsContainer = document.getElementById("details-container")

    if (title === "Quick Game Setup Guide") {
        goBackEl.classList.add('hidden')
        logoEl.style.display = "inline"
        pageTitle.style.display = "inline"
        pageTitle.innerText = title
        detailsContainer.classList.add('hidden')
    } else {
        goBackEl.classList.remove('hidden')
        logoEl.style.display = "none"
        pageTitle.style.display = "none"
        detailsContainer.classList.remove('hidden')
        
        // Add go back functionality
        goBackEl.onclick = function(e) {
            e.preventDefault()
            returnToSearch()
        }
    }
}

// Return to search view
function returnToSearch() {
    const searchContainer = document.getElementById("search-container")
    const detailsContainer = document.getElementById("details-container")
    
    renderTitle()
    searchContainer.classList.remove('hidden')
    detailsContainer.classList.add('hidden')
    detailsContainer.innerHTML = '<div id="hero"></div>'
    
    selectedTitle = ""
}

// Enhanced details display
function displayCardDetails() {
    const detailsContainer = document.getElementById("details-container")
    const heroContainer = document.getElementById("hero")

    const selectedBoardGame = bgCollection.find((boardgame) => boardgame.title === selectedTitle)
    if (!selectedBoardGame) return

    const selectedBGDetails = Object.keys(selectedBoardGame.details)
    const selectedBGDetailsValues = Object.entries(selectedBoardGame.details)
    
    // Clear existing content except hero
    detailsContainer.innerHTML = ""
    detailsContainer.appendChild(heroContainer)
    
    heroContainer.innerHTML = `<img src="${selectedBoardGame.img}" alt="${selectedBoardGame.title} detailed view">`
 
    // Create sections for each detail category
    selectedBGDetails.forEach(key => {
        const sectionDiv = document.createElement("div")
        sectionDiv.id = key
        detailsContainer.appendChild(sectionDiv)
    })
    
    // Render each section
    if (document.getElementById("board_setup")) {
        renderBoardSetup()
    }
    if (document.getElementById("player_setup")) {
        renderPlayerSetup()
    }
    if (document.getElementById("player_turns")) {
        renderPlayerTurns()
    }
    if (document.getElementById("win_condition")) {
        renderWinCondition()
    }
    renderPDFLinkIfAvailable()

    // Add fade-in animation
    detailsContainer.classList.add('fade-in')

    // Render detail sections
    function renderBoardSetup() {
        renderDetailSection("board_setup", "Board Setup", "🎯")
    }
    
    function renderPlayerSetup() {
        renderDetailSection("player_setup", "Player Setup", "👥")
    }
    
    function renderPlayerTurns() {
        renderDetailSection("player_turns", "Player Turns", "🎮")
    }

    function renderWinCondition() {
        const winConditionContainer = document.getElementById("win_condition")
        const playerWinConditionArray = selectedBGDetailsValues.filter(setup => setup[0] === "win_condition")[0]
        
        if (!playerWinConditionArray) return

        const header = document.createElement("h2")
        header.className = "section-header collapsed"
        header.innerHTML = `🏆 Win Condition`
        header.addEventListener('click', function() {
            toggleSection(header, content)
        })

        const content = document.createElement("div")
        content.className = "section-content"
        content.style.display = "none" // Start collapsed
        content.innerHTML = `<p>${playerWinConditionArray[1]}</p>`

        winConditionContainer.appendChild(header)
        winConditionContainer.appendChild(content)
    }

    function renderDetailSection(sectionId, title, icon) {
        const container = document.getElementById(sectionId)
        if (!container) return

        const sectionArray = selectedBGDetailsValues.filter(setup => setup[0] === sectionId)[0]
        if (!sectionArray) return

        const header = document.createElement("h2")
        header.className = "section-header collapsed"
        header.innerHTML = `${icon} ${title.replace('_', ' ')}`
        header.addEventListener('click', function() {
            toggleSection(header, content)
        })

        const content = document.createElement("div")
        content.className = "section-content"
        content.style.display = "none" // Start collapsed
        
        const list = document.createElement("ol")
        for (const value in sectionArray[1]) {
            const listItem = document.createElement("li")
            listItem.innerHTML = sectionArray[1][value]
            list.appendChild(listItem)
        }
        content.appendChild(list)

        container.appendChild(header)
        container.appendChild(content)
    }

    function renderPDFLinkIfAvailable() {    
        if (selectedBoardGame.pdf_rulebook && selectedBoardGame.pdf_rulebook !== "") {
            const pdfContainer = document.createElement("div")
            pdfContainer.id = "pdf-container"
            pdfContainer.innerHTML = `
                <a id="pdf-link" href="${selectedBoardGame.pdf_rulebook}" target="_blank" rel="noopener noreferrer">
                    View Complete PDF Rulebook
                </a>
            `
            detailsContainer.appendChild(pdfContainer)
        }
    }
}

// Section toggle functionality
function toggleSection(header, content) {
    const isCollapsed = content.style.display === 'none'
    
    if (isCollapsed) {
        content.style.display = 'block'
        content.classList.add('slide-down')
        header.classList.remove('collapsed')
    } else {
        content.style.display = 'none'
        header.classList.add('collapsed')
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function updateSearchResults(showing, total) {
    const resultsInfo = document.getElementById("search-results-info")
    if (resultsInfo) {
        if (showing === total) {
            resultsInfo.textContent = `Showing all ${total} games`
        } else {
            resultsInfo.textContent = `Showing ${showing} of ${total} games`
        }
    }
}

function showNoResultsIfNeeded() {
    const noResults = document.getElementById("no-results")
    const cardContainer = document.getElementById("card-container")
    
    if (filteredBGArray.length === 0) {
        noResults.classList.remove('hidden')
        cardContainer.classList.add('hidden')
    } else {
        noResults.classList.add('hidden')
        cardContainer.classList.remove('hidden')
    }
}

function showLoadingIndicator() {
    const loading = document.getElementById("loading-indicator")
    if (loading) {
        loading.classList.remove('hidden')
    }
}

function hideLoadingIndicator() {
    const loading = document.getElementById("loading-indicator")
    if (loading) {
        loading.classList.add('hidden')
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById("toast-container")
    if (!toastContainer) return

    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    toast.style.cssText = `
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `
    
    toastContainer.appendChild(toast)
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)'
    }, 100)
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast)
            }
        }, 300)
    }, 3000)
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to go back
        if (e.key === 'Escape' && selectedTitle) {
            returnToSearch()
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault()
            document.getElementById('input-element').focus()
        }
    })
}

// Export functions for global access
window.toggleFavorite = toggleFavorite

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp)

// Initialize immediately as fallback
initializeApp()
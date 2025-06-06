import { bgCollection } from "./boardgames.js"

let selectedTitle = ""
let searchedBG = ""
let filteredBGArray = []

function addSearchFunctionality(){
    const inputEle = document.getElementById("input-element")
    const searchBtn = document.getElementById("search-btn")
    
    inputEle.value = ""

    function search(){
        searchedBG = inputEle.value.toLowerCase()
        filteredBGArray = bgCollection.filter((boardgame) => boardgame.title.toLowerCase().includes(searchedBG))
        generateSummaryCardsArray(filteredBGArray)
        addClickListenerToCards() // Add this back!
    }

    searchBtn.addEventListener("click", search)

    //if 'ENTER' was hit on <input>, run click(search) Event
    inputEle.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            search()
        }
    })
}
addSearchFunctionality()


function generateSummaryCardsArray(bgArray){
    const cardContainerDiv = document.getElementById("card-container")
    let idGenerator = 1

    cardContainerDiv.innerHTML = ``
    bgArray.forEach(boardgame => {
        cardContainerDiv.innerHTML += `                                  
                                        <div class="summary-card" id="id-0${idGenerator}">
                                            <h3> ${boardgame.title} </h3>
                                            <img src="${boardgame.img}" alt="${boardgame.title} sample image">
                                            <dl>
                                                <dt>Number of Players: <dt>
                                                <dd>${boardgame.number_of_players}
                                            </dl>
                                        </div>
                                    `
        idGenerator++
    });
}
generateSummaryCardsArray(bgCollection)

function addClickListenerToCards() {
    //adds an event listener for click to newly created cards
        const classSummaryCardObject = document.getElementsByClassName("summary-card")

        for (let i=classSummaryCardObject.length-1; i>-1; i--){
            //loop through all the cards with class("summary-cards")
            classSummaryCardObject[i].addEventListener("click", cardClick)
        }

        function cardClick(e){
            const searchContainer = document.getElementById("search-container")
            let clickedID = ""

            //console.log(e.target.parentElement.id)
            if(e.target.parentElement.id.includes("id")){
                clickedID = e.target.parentElement.id
                // console.log("Clicked Card ID:", clickedID)
            }
            else if ( e.target.parentElement.id == "card-container" ) {
                // console.log("outer Elem, going on node down for ID", e.target.parentElement.id)
                clickedID = e.target.id
                // console.log("Clicked Card ID:", clickedID)
            } 
            else {
                console.log("no id, going up a level for ID", e.target.parentElement.id)
                clickedID = e.target.parentElement.parentElement.id
                console.log("Clicked Card ID:", clickedID)
            }
            
            const clickedCardElement = document.getElementById(clickedID)
            // console.log("clicked card element:", clickedCardElement)
            if (clickedCardElement.children[0] == null) {return}
            else if (clickedCardElement.children[0] == "") {return}
            else {
                //console.log("clicked card element:", clickedCardElement)
                //console.log("clicked card element children:", clickedCardElement.children[0].innerText)
                selectedTitle = clickedCardElement.children[0].innerText
            }
        // console.log("selectedTitle: ", selectedTitle)
        if (selectedTitle !== "" && 
            selectedTitle !== "board_setup" && 
            selectedTitle !== "player_setup" && 
            selectedTitle !== "player_turns" &&
            selectedTitle !== "win_condition"
            ) {
            renderTitle(selectedTitle)
            searchContainer.style.display = "none"  // display = "block" to revert
            displayCardDetails()
        } else {return}

        }
}
addClickListenerToCards()


function renderTitle(title = "Quick Game Setup Guide"){
    const logoEl = document.getElementById("page-logo")
    const pageTitle = document.getElementById("page-title")
    const goBackEl = document.getElementById("go-back")

    if (title === "Quick Game Setup Guide") {
        goBackEl.style.display="none"
        pageTitle.innerText = title}
    else {
        goBackEl.style.display="inline"
        logoEl.style.display="none"
        pageTitle.style.display="none"
    }
}
renderTitle()


function displayCardDetails(){
    const detailsContainer = document.getElementById("details-container")
    const heroContainer = document.getElementById("hero")

    const selectedBoardGame = bgCollection.find((boardgame) => boardgame.title === selectedTitle)
    const selectedBGDetails = Object.keys(selectedBoardGame.details)
    const selectedBGDetailsValues = Object.entries(selectedBoardGame.details)
    
    heroContainer.innerHTML = `<img src="${selectedBoardGame.img}">`
 
    /* CREATE A DIV FOR EACH CATEGORY OF DETAILS EXISTING IN THE BOARDGAME OBJECT */
    for (const key in selectedBGDetails) {
        detailsContainer  //.appendChild(document.createElement("div")).id = selectedBGDetails[key]
            .appendChild(document.createElement("div"))
            .setAttribute("id", selectedBGDetails[key])
    }
    
    /*CALLS FUNCTIONS FOR RENDERING GAME DETAIL COMPONENTS*/
    if (document.getElementById("board_setup")){
        // console.log("a Board Setup does exist, call func 'renderBoard_Setup' Here)")
        renderBoardSetup()
    }
    if(document.getElementById("player_setup")){
        // console.log("a Player Setup does exist, call func 'renderPlayer_Setup' Here)")
        renderPlayerSetup()
    }
    if(document.getElementById("player_turns")){
        // console.log("a Player Turns does exist, call func 'renderPlayer_Turns' Here)")
        renderPlayerTurns()
    }
    if(document.getElementById("win_condition")){
        // console.log("a Player Win Condition does exist, call func 'renderWin_Condition' Here)")
        renderWinCondition()
    }
    renderPDFLinkIfAvailable()

    /*DETAIL RENDERING FUNCTIONS*/
    function renderBoardSetup(){
        const boardSetUpContainer = document.getElementById("board_setup")

        /* CREATES ARRAY SPECIFIC TO THE CATEGORY WITH FILTER */
        const boardSetupArray = selectedBGDetailsValues.filter( (setup) => setup[0] == "board_setup")[0]
        // console.log("boardSetupArray:", boardSetupArray)
        // console.log("boardSetupArray[1]:", boardSetupArray[1])

        /* ADDS RESPECTIVE TITLE AND EVENT LISTENER FOR CLICK TO SHOW/TOGGLE THE DETAILS */
        const boardSetupTitle = boardSetUpContainer.appendChild(document.createElement("h2"))
        boardSetupTitle.textContent = `${boardSetupArray[0]}`
        boardSetupTitle.addEventListener('click', function(){
            boardSetupList.classList.toggle("board-setup-details")
        })

        /* CREATES LIST OF DETAILS FOR THE CATEGORY ALONG WITH CLASS FOR CSS*/
        const boardSetupList = boardSetUpContainer.appendChild(document.createElement("ol"))
        boardSetupList.classList.add("board-setup-details")
        for (const value in boardSetupArray[1]) {
            boardSetupList.appendChild(document.createElement("li")).innerHTML = `${boardSetupArray[1][value]}`
        }
    }
    
    function renderPlayerSetup(){
        const playerSetUpContainer = document.getElementById("player_setup")

        /* CREATES ARRAY SPECIFIC TO THE CATEGORY WITH FILTER */
        const playerSetupArray = selectedBGDetailsValues.filter( (setup) => setup[0] == "player_setup")[0]
        // console.log("playerSetupArray:", playerSetupArray)
        // console.log("playerSetupArray[1]:", playerSetupArray[1])

        /* ADDS RESPECTIVE TITLE AND EVENT LISTENER FOR CLICK TO SHOW/TOGGLE THE DETAILS */
        const playerSetupTitle = playerSetUpContainer.appendChild(document.createElement("h2"))
        playerSetupTitle.textContent = `${playerSetupArray[0]}`
        playerSetupTitle.addEventListener('click', function(){
            playerSetupList.classList.toggle("player-setup-details")
        })

        /* CREATES LIST OF DETAILS FOR THE CATEGORY ALONG WITH CLASS FOR CSS*/
        const playerSetupList = playerSetUpContainer.appendChild(document.createElement("ol"))
        playerSetupList.classList.add("player-setup-details")
        for (const value in playerSetupArray[1]) {
            playerSetupList.appendChild(document.createElement("li")).innerHTML = `${playerSetupArray[1][value]}`
        }
    }
    
    function renderPlayerTurns(){
        const playerTurnsContainer = document.getElementById("player_turns")

        /* CREATES ARRAY SPECIFIC TO THE CATEGORY WITH FILTER */
        const playerTurnsArray = selectedBGDetailsValues.filter( (setup) => setup[0] == "player_turns")[0]
        // console.log("playerTurnsArray:", playerTurnsArray)
        // console.log("playerTurnsArray[1]:", playerTurnsArray[1])

        /* ADDS RESPECTIVE TITLE AND EVENT LISTENER FOR CLICK TO SHOW/TOGGLE THE DETAILS */
        const playerTurnsTitle = playerTurnsContainer.appendChild(document.createElement("h2"))
        playerTurnsTitle.textContent = `${playerTurnsArray[0]}`
        playerTurnsTitle.addEventListener('click', function(){
            playerTurnsList.classList.toggle("player-turns-details")
        })

        /* CREATES LIST OF DETAILS FOR THE CATEGORY ALONG WITH CLASS FOR CSS*/
        const playerTurnsList = playerTurnsContainer.appendChild(document.createElement("ol"))
        playerTurnsList.classList.add("player-turns-details")
        for (const value in playerTurnsArray[1]) {
            playerTurnsList.appendChild(document.createElement("li")).innerHTML = `${playerTurnsArray[1][value]}`
        }

    }

    function renderWinCondition(){
        const winConditionContainer = document.getElementById("win_condition")

        /* CREATES ARRAY SPECIFIC TO THE CATEGORY WITH FILTER */
        const playerWinConditionArray = selectedBGDetailsValues.filter( (setup) => setup[0] == "win_condition")[0]
        console.log("playerWinConditionArray[0]:", playerWinConditionArray[0])
        console.log("playerWinConditionArray[1]:", playerWinConditionArray[1])
        
        /* ADDS RESPECTIVE TITLE AND EVENT LISTENER FOR CLICK TO SHOW/TOGGLE THE DETAILS */
        const winCondition = winConditionContainer.appendChild(document.createElement("h2"))
        winCondition.textContent = `${playerWinConditionArray[0]}`
        winCondition.addEventListener('click', function(){
            windConditionDetails.classList.toggle("win-condition-details")
        })

        /* CREATES A <PARA> OF DETAILS FOR THE CATEGORY ALONG WITH CLASS FOR CSS*/
        const windConditionDetails = winConditionContainer.appendChild(document.createElement("p"))
        windConditionDetails.textContent = `${playerWinConditionArray[1]}`
        windConditionDetails.classList.add("win-condition-details")
    }

    function renderPDFLinkIfAvailable(){    
    //if PDF link is available, render the PDF as an Anchor Link
        if (selectedBoardGame.pdf_rulebook == null) {
            console.log("there is no available pdf to show")
        } else if (selectedBoardGame.pdf_rulebook !== "") {
            console.log("there is an available pdf to show!")
            //render the PDF as an Anchor Link
            detailsContainer.appendChild(document.createElement("div")).id = "pdf-container"
            document.getElementById("pdf-container").innerHTML = `
                                                                <a id="pdf-link" href="${selectedBoardGame.pdf_rulebook}" target="_blank">SEE PDF RULEBOOK </a>
                                                                `
        } else {console.log("there is no available pdf to show")}
    }  
}

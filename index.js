import { bgCollection } from "./boardgames.js"


const searchContainer = document.getElementById("search-container")
const detailsContainer = document.getElementById("details-container")
const heroContainer = document.getElementById("hero")

let selectedTitle = ""
let searchedBG = ""
let filteredBGArray = []

function addSearchFunctionality(){
    const inputEle = document.getElementById("input-element")
    const searchBtn = document.getElementById("search-btn")
    
    inputEle.value = ""

    function search(){
        searchedBG = inputEle.value.toLocaleLowerCase()
        filteredBGArray = bgCollection.filter((boardgame) => boardgame.title.toLocaleLowerCase().includes(searchedBG))
        generateSummaryCardsArray(filteredBGArray)
    }

    searchBtn.addEventListener("click", search)

    //if 'ENTER' was hit on <input>, run click(search) EVent
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
                                            <image src="${boardgame.img}" alt="${boardgame.title} sample image">
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
            addEventListener("click", cardClick)
        }

        function cardClick(e){
            let clickedID = ""

            //console.log(e.target.parentElement.id)
            if(e.target.parentElement.id.includes("id")){
                clickedID = e.target.parentElement.id
                console.log("Clicked Card ID:", clickedID)
            }
            else if ( e.target.parentElement.id == "card-container" ) {
                console.log("outer Elem, going on node down for ID", e.target.parentElement.id)
                clickedID = e.target.id
                console.log("Clicked Card ID:", clickedID)
            } 
            else {
                console.log("no id, going up a level for ID", e.target.parentElement.id)
                clickedID = e.target.parentElement.parentElement.id
                console.log("Clicked Card ID:", clickedID)
            }
            
            const clickedCardElement = document.getElementById(clickedID)
            console.log("clicked card element:", clickedCardElement)
            if (clickedCardElement.children[0] == null) {return}
            else if (clickedCardElement.children[0] == "") {return}
            else {
                //console.log("clicked card element:", clickedCardElement)
                //console.log("clicked card element children:", clickedCardElement.children[0].innerText)
                selectedTitle = clickedCardElement.children[0].innerText
            }
        console.log("selectedTitle: ", selectedTitle)
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
    const selectedBoardGame = bgCollection.find((boardgame) => boardgame.title === selectedTitle)
    const selectedBGDetails = Object.keys(selectedBoardGame.details)
    const selectedBGDetailsValues = Object.entries(selectedBoardGame.details)
    
    function createDivContainersForBGDetails(){    
        for (const key in selectedBGDetails) {
            //create a div for each category of details existing in the boardgame Object
            detailsContainer  //.appendChild(document.createElement("div")).id = selectedBGDetails[key]
                .appendChild(document.createElement("div"))
                .setAttribute("id", selectedBGDetails[key])
        }
    }
    createDivContainersForBGDetails()
    
    heroContainer.innerHTML = `<img src="${selectedBoardGame.img}">`
    

    function renderBoardSetup(){
        const boardSetUpContainer = document.getElementById("board_setup")
        boardSetUpContainer.appendChild(document.createElement("h2")).textContent = `${selectedBGDetailsValues[0][0]}`
        const boardSetupOL = boardSetUpContainer.appendChild(document.createElement("ol"))
        for (const value in selectedBGDetailsValues[0][1]) {
            boardSetupOL.appendChild(document.createElement("li")).textContent = `${selectedBGDetailsValues[0][1][value]}`
        }
    }
    renderBoardSetup()

    function renderPlayerSetup(){
        const playerSetUpContainer = document.getElementById("player_setup")
        playerSetUpContainer.appendChild(document.createElement("h2")).textContent = `${selectedBGDetailsValues[1][0]}`
        const playerSetupOL = playerSetUpContainer.appendChild(document.createElement("ol"))
        for (const value in selectedBGDetailsValues[1][1]) {
            playerSetupOL.appendChild(document.createElement("li")).textContent = `${selectedBGDetailsValues[1][1][value]}`
        }
    }
    renderPlayerSetup()

    function renderPlayerTurns(){
        const playerTurnsContainer = document.getElementById("player_turns")
        playerTurnsContainer.appendChild(document.createElement("h2")).textContent = `${selectedBGDetailsValues[2][0]}`
        const playerTurnsOL = playerTurnsContainer.appendChild(document.createElement("ol"))
        for (const value in selectedBGDetailsValues[2][1]) {
            playerTurnsOL.appendChild(document.createElement("li")).textContent = `${selectedBGDetailsValues[2][1][value]}`
        }
    }
    renderPlayerTurns()
    
    function renderWinCondition(){
        const winConditionContainer = document.getElementById("win_condition")
    
        winConditionContainer.appendChild(document.createElement("h2")).textContent = `${selectedBGDetailsValues[3][0]}`
        winConditionContainer.appendChild(document.createElement("p")).textContent = `${selectedBGDetailsValues[3][1]}`
    }
    renderWinCondition()

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
    renderPDFLinkIfAvailable()

}
// Seleção de Elementos
const playerForm = document.querySelector("#player-form");
const playerInput = document.querySelector("#player-input");
const playerList = document.querySelector("#to-playlist");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit-btn");

const firstTeam = document.querySelector("#team-A");
const secondTeam = document.querySelector("#team-B");
const teamVolta = document.querySelector("#team-C")

let oldInputValue = "";

let teamA = 0;
let teamB = 0;
let teamC = 0;
let voltaFull = false;
let teamsFull = false;

// Funções

const createPlayer = function(classListName, playerName) {
    //creates a div and adds a class of the list
    const newPlayer = document.createElement("div");
    newPlayer.classList.add(classListName);

    //creates and h4 element and change the text with the name entered on the parameter
    const playerTitle = document.createElement("h4");
    playerTitle.innerText = playerName;
    //set the title child of the div
    newPlayer.appendChild(playerTitle);

    return newPlayer;
}

const createButton = function (classOfButton, typeOfButton) {

    //creates the button and add the class
    const newBtn = document.createElement("button");
    newBtn.classList.add(classOfButton);

    switch(typeOfButton) {
        case "check":
                //change the inner html to put the icon 
                newBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            break;
        case "pen":
                newBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            break;
        case "xmark":
                newBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            break;
    }

    return newBtn;
}

const mainPlayerList = function(playerName) {
    
    const player = createPlayer("toplay", playerName);

    player.appendChild(createButton("addToTeam", "check"));
    player.appendChild(createButton("edit-player", "pen"));
    player.appendChild(createButton("remove-player", "xmark"));

    playerList.appendChild(player);

    playerInput.value = "";
}

const addTeam = function(playerName) {

    const teamPlayer = createPlayer("team-player", playerName);

    teamPlayer.appendChild(createButton("addToVolta", "check"));
    teamPlayer.appendChild(createButton("remove-playerToList", "xmark"));
   

    if(teamA < 4)
    {
        firstTeam.appendChild(teamPlayer);
        teamA++;
    }
    else if(teamA >= 4 && teamB < 4)
    {
        secondTeam.appendChild(teamPlayer);
        teamB++;
    }
    else {
        teamsFull = true;
        console.log("Times completos!");
    }
  
}

const addVolta = function(playerName) {

    const teamPlayer = createPlayer("team-player", playerName);

    teamPlayer.appendChild(createButton("addToTeam", "check"));
    teamPlayer.appendChild(createButton("remove-playerToList", "xmark"));

    if(teamC < 4)
    {
        teamVolta.appendChild(teamPlayer);
        teamC++;
    }
    else {
        voltaFull = true;
        console.log("Volta já tá completo")
    }

}

const toggleForms = function() {
    playerForm.classList.toggle("hide");
    editForm.classList.toggle("hide");
    playerList.classList.toggle("hide");
}

const updatePlayerName = function(editedPlayer) {

    const players = document.querySelectorAll(".toplay");

    players.forEach(player => {
        let playerTitle = player.querySelector("h4");

        if(playerTitle.innerText === oldInputValue)
        {
            playerTitle.innerText = editedPlayer;
        }
    }); 
} 

// Eventos
playerForm.addEventListener("submit", function(event){
    event.preventDefault();

    const inputValue = playerInput.value;

    if(inputValue === "") {
        console.log("Make sure to type a valid player");
    }
    else {
        mainPlayerList(inputValue.trimStart());
        playerInput.focus();
    } 
})


document.addEventListener("click", function(event) {
    const targetEl = event.target;
    const parentEl = targetEl.closest("div");
    let playerTitle;


    // ADD TO MAIN LIST OF PLAYERS 

    if(targetEl.classList.contains("addToTeam")) {
        addTeam(parentEl.firstElementChild.innerText);
        if(parentEl && parentEl.parentElement.id === "team-C")
        {
            teamC--;
            voltaFull = false;
        }
        if(!teamsFull) {
            parentEl.remove();
        }
    }

    // ADD TO THE LIST OF WINNERS(VOLTA)

    if(targetEl.classList.contains("addToVolta")) {
        addVolta(parentEl.firstElementChild.innerText);
        
        if(!voltaFull) {
            switch(parentEl.parentElement.id) {
                case "team-A":
                    teamA--;
                    break;
                case "team-B":
                    teamB--;
                    break;
            }
            parentEl.remove();
            teamsFull = false;
        }
    }

    // REMOVE THE PLAYER FROM THE LIST

    if(targetEl.classList.contains("remove-player")) {
        parentEl.remove();
    }

    // GET THE PLAYER TITLE FOR EDITING PURPOSE

    if(parentEl && parentEl.querySelector("h4"))
    {
        playerTitle = parentEl.querySelector("h4").innerText;
    }

    if(targetEl.classList.contains("edit-player")) {
        toggleForms();

        editInput.focus();
        editInput.value = playerTitle;
        oldInputValue = playerTitle;
    }

    // REMOVE THE PLAYER BACK TO MAIN LIST 

    if(targetEl.classList.contains("remove-playerToList")) {
        switch(parentEl.parentElement.id) {
            case "team-A":
                teamA--;
                break;
            case "team-B":
                teamB--;
                break;
            case "team-C":
                teamC--;
                break;
        }
        mainPlayerList(parentEl.firstElementChild.innerText);
        voltaFull = false;
        teamsFull = false;
        parentEl.remove();
    }
})

// OPEN UP THE EDIT FORM

cancelEdit.addEventListener("click", function(event) {
    event.preventDefault();

    toggleForms();
})

// CONFIRM THE PLAYER EDITION

editForm.addEventListener("submit", function(event){
    event.preventDefault();

    const editedPlayer = editInput.value;

    if(editedPlayer) {
        updatePlayerName(editedPlayer);
    }

    toggleForms();
})
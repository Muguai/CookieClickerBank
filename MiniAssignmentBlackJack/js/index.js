import { card } from './card.js';

const startButton = document.getElementById("startButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const playingField = document.getElementById("playingField");


let deckId = "";
let playerCards = [];
let dealerCards = [];
let standCount = 0;

const deckShuffleURL = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";


async function resetGame(){
    console.log("RESET --- GAME");
    startButton.classList.remove("visually-hidden");
    hitButton.classList.add("visually-hidden");
    standButton.classList.add("visually-hidden");
    playingField.classList.add("visually-hidden");
    
    const dealerHand = document.getElementById("dealer");
    const playerHand = document.getElementById("player");
    
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";


    try{
        const jsonFile = await fetch(deckShuffleURL)
        .then(data => {
            return data.json();
        });

        deckId = jsonFile["deck_id"];
        console.log(deckId);
        console.log(jsonFile);
        
    }catch (error){
        console.log(error)
    }
}

resetGame();

async function startGame(){
    console.log("START --- GAME");
    
    startButton.classList.add("visually-hidden");
    hitButton.classList.remove("visually-hidden");
    standButton.classList.remove("visually-hidden");
    playingField.classList.remove("visually-hidden");

    
    dealerCards = await drawCards(2);
    playerCards = await drawCards(2);

    console.log(playerCards);
    const dealerValue = calculateValue(dealerCards);
    const playerValue = calculateValue(playerCards);

    /*
    let dealerValue = 0;
    dealerCards.forEach(c => dealerValue += c.getValue()); 
    console.log(playerValue);
    */

    updateCardUi(dealerCards, playerCards, true);
    const done = checkForBlackjack(playerValue, dealerValue);

    
    playerTurn();

    if(done){
        updateCardUi(dealerCards, playerCards, false);
        return;

    }

}

function calculateValue(hand){
    let totalValue = 0;
    let aceCount = 0;
    hand.forEach(c => {
        if(c.value =="ACE")
            aceCount++;
        totalValue += c.getValue();
    });

    return checkAce(totalValue, aceCount);
}

function checkAce(totalValue, aceCount){
    while (totalValue > 21 && aceCount > 0) {
        totalValue -= 10;
        aceCount--;
    }
    console.log("value = " + totalValue);
    return totalValue;
}

const modal = document.getElementById('myModal');

function showModal(title, text){
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.style.background = 'rgba(0, 0, 0, 0.5)';
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    
    const titleText = document.getElementById("modalTitle");
    titleText.textContent = title;
    const mainText = document.getElementById("modaltext");
    mainText.textContent = text;
}

const closeButton = modal.querySelector('.close');
closeButton.addEventListener('click', function() {
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.style.background = '';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.removeAttribute('role');
    resetGame();
    console.log('X button clicked!');
});

function checkForBlackjack(playerValue, dealerValue){
    if(playerValue == 21){
        showModal("YAY", "You got a blackjack");
        return true;
    }
    if(dealerValue == 21){
        if(dealerCards.length == 2)
            updateCardUi(dealerCards, playerCards, false);
        showModal("Buuuh", "The dealer got a blackjack");
        return true;
    }
    return false;
}

function updateCardUi(dc, pc, startOfGame){
    const dealerHand = document.getElementById("dealer");
    const playerHand = document.getElementById("player");
    
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";

    let index = 0;
    dc.forEach(c => {
        const [cardDiv, cardImg] = c.createCardElement((index == 1 && startOfGame));
        dealerHand.appendChild(cardDiv);
        cardDiv.appendChild(cardImg);
        index++;
    });


    pc.forEach(c => {
        const [cardDiv, cardImg] = c.createCardElement(false);
        playerHand.appendChild(cardDiv);
        cardDiv.appendChild(cardImg);
    });


}

function checkForBust(playerValue, dealerValue){
    if(playerValue > 21){
        showModal("Buuuh", "You busted out");
        return true;
    }
    if(dealerValue > 21){
        showModal("YAyyyy", "Dealer busted out");
        return true;
    }
    return false;
}


async function drawCards(drawCount){
    console.log("---- DRAW CARDS ----");
    const drawCardURL = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCount}`;

    try{
        const jsonFile = await fetch(drawCardURL)
        .then(data => {
            return data.json();
        });

        deckId = jsonFile["deck_id"];

        const cardList = [];

        for(let i = 0; i < jsonFile["cards"].length; i++){
            cardList.push(new card(jsonFile["cards"][i]["image"], jsonFile["cards"][i]["value"]));

        }
    

        return cardList;
        
    }catch (error){
        console.log(error)
    }

}


async function hit(isPlayer){
    const playerString = isPlayer ? "PLAYER" : "DEALER";
    console.log("--- HIT --- " + playerString);
    standCount = 0;
    const drawnCard = await drawCards(1);

    let dealerValue = 0;
    let playerValue = 0;
    if(isPlayer){
        playerCards = playerCards.concat(drawnCard);
        playerValue = calculateValue(playerCards);
    }else if(!isPlayer){
        dealerCards = dealerCards.concat(drawnCard);
        dealerValue = calculateValue(dealerCards);
    }

    updateCardUi(dealerCards, playerCards, false);

    const done = checkForBlackjack(playerValue, dealerValue);
    const done2 = checkForBust(playerValue, dealerValue);

    if(done|| done2){
        return;
    }


    if(isPlayer)
        dealerTurn();
    else
        playerTurn();
    
}

function dealerTurn(){
    const dealerValue = calculateValue(dealerCards);
    const playerValue= calculateValue(playerCards);

    hitButton.setAttribute("disabled", true);
    standButton.setAttribute("disabled", true);

    if(standCount > 1 && playerValue < dealerValue)
        stand(false);
    else if(dealerValue < 17 && playerValue == dealerValue && standCount >= 1)
        showModal("TIE", "its a tieeee. you both got " + playerValue);
    else if(dealerValue < 17)
        hit(false);
    else
        stand(false);
}

function playerTurn(){
    hitButton.removeAttribute("disabled");
    standButton.removeAttribute("disabled");
}

function stand(isPlayer){
    standCount++;
    if(standCount >= 2)
        checkVictory(calculateValue(playerCards), calculateValue(dealerCards));

    if(isPlayer)
        dealerTurn();
    else
        playerTurn();
    
}

function checkVictory(playerValue, dealerValue){
    if(dealerCards.length == 2)
        updateCardUi(dealerCards, playerCards, false);
    if(playerValue > dealerValue)
        showModal("YAYY","You won with a hand of " + playerValue + " vs the dealers " + dealerValue);
    else
        showModal("Buhhh","You lost with a hand of " + playerValue + " vs the dealers " + dealerValue);
    
}


hitButton.addEventListener('click', function(){
    hit(true);
}, false);
standButton.addEventListener('click', function(){
    stand(true);
}, false);
startButton.addEventListener('click', startGame);


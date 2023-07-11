import { card } from "./cards.js";

const startButton = document.getElementById("startButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const playingField = document.getElementById("playingField");


let deckId = "";


const deckShuffleURL = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";


async function resetGame(){
    startButton.classList.remove("visually-hidden");
    hitButton.classList.add("visually-hidden");
    standButton.classList.add("visually-hidden");
    playingField.classList.add("visually-hidden");

    try{
        const jsonFile = await fetch(deckShuffleURL)
        .then(data => {
            return data.json();
        });

        deckId = jsonFile["deck_id"];
        console.log(jsonFile);
        
    }catch (error){
        console.log(error)
    }

    
}

function test(){
    console.log("test");
}

resetGame();

async function startGame(){
    startButton.classList.add("visually-hidden");
    hitButton.classList.remove("visually-hidden");
    standButton.classList.remove("visually-hidden");
    playingField.classList.remove("visually-hidden");
    
    const dealerCards = await drawCards(2);
    const playerCards = await drawCards(2);

    console.log(playerCards);

    let playerValue;
    playerCards.forEach(card => console.log(card)); 
    let dealerValue
    dealerCards.forEach(card => dealerValue += card.getValue(false)); 
    console.log(playerValue);


    checkForBlackjack(playerValue, dealerValue);
    checkForBust(playerValue, dealerValue);
    
   

}

function checkForBlackjack(playerValue, dealerValue){
    if(playerValue == 21){
        alert("You won 😎");
    }
    if(dealerValue == 21){
        alert("Dealer won 🤣")
    }
}

function checkForBust(playerValue, dealerValue){
    if(playerValue > 21){
        alert("You busted out, dealer won 😂");
    }
    if(dealerValue > 21){
        alert("Dealer busted out, you won 🙌");
    }
}


async function drawCards(drawCount){

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
    

        console.log(jsonFile);

        return cardList;
        
    }catch (error){
        console.log(error)
    }

}


startButton.addEventListener('click', startGame);



const cardPool = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot'];
const shuffledDeck = [];
let firstCard;
let secondCard;
let cardsFlipped = 0;
let pairsFound = 0;
let cardQuantity;
let cardsTable = document.querySelector('.table');

let gameBusy = false;
let intervalID;
timerElement = document.querySelector('.seconds-passed');
let time = 0;
let scoreBoard = document.querySelector('.score-board');

let playerName = '';
let playerScore;


const scoresArray = [];

newGame();

function newGame(){
        updateTimer();
        askName();
        cardQuantityValidation();
        shuffleCards();
        distributeCards();
        startTimer();
}

function askName(){
    playerName = prompt('Qual seu nome?');
}

function startTimer(){
    intervalID = setInterval(function(){
        time++;
        updateTimer();
    },1000)
}

function updateTimer(){
    timerElement.innerHTML = time;
}

function cardQuantityValidation() {
    while (!cardQuantity || cardQuantity % 2 !== 0 || cardQuantity > 14 || cardQuantity < 4)
    {  
        cardQuantity = Number(prompt('Escolha um número par de cartas entre 4 e 14'));
    }
}

function shuffleCards(){

    cardPool.sort(compareFunction);

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < cardQuantity/2; j++) {
            shuffledDeck.push(cardPool[j]);             //Push cards from cardPool into shuffledDeck twice
        }    
    }

    shuffledDeck.sort(compareFunction);
}

function compareFunction() { 
	return Math.random() - 0.5; 
}

function distributeCards(){
    for (let i = 0; i < cardQuantity; i++) {
        cardsTable.innerHTML += `<li class="card" onclick="pickCard(this);">
        <div class="front-face face">
            <img src="assets/front.png" alt="" />
        </div>
        <div class="back-face face">
            <img src="assets/${shuffledDeck[i]}.gif" alt="" />
        </div>
    </li>`;
    }
}

function pickCard(pickedCard){
    if (gameBusy === false){      //Stops the player from picking new cards if the game is busy flipping cards down
        cardsFlipped++;
        if (firstCard){
            secondCard = pickedCard;
            gameBusy = true;
        }
        else {
            firstCard = pickedCard;
        }

        pickedCard.querySelector('.front-face').setAttribute('style','transform: rotateY(-180deg);'); //Flips the picked card front face up
        pickedCard.querySelector('.back-face').setAttribute('style','transform: rotateY(0deg);');

        if (firstCard && secondCard){
                verifyPair();
        }
    }

}

function verifyPair(){
    if (firstCard.querySelector('.back-face img').getAttribute('src')===secondCard.querySelector('.back-face img').getAttribute('src')){
        firstCard.removeAttribute('onclick');
        secondCard.removeAttribute('onclick');
        pairsFound++;
        firstCard = undefined;
        secondCard = undefined;
        gameBusy = false;
        if (pairsFound===cardQuantity/2){
            endGame();
        }
        
    }
    else{
        setTimeout(flipCardDown, 1000);
    }
    
}

function flipCardDown(){
    
    firstCard.querySelector('.front-face').setAttribute('style','transform: rotateY(0deg);');  //Flips the two picked cards front side down
    firstCard.querySelector('.back-face').setAttribute('style','transform: rotateY(180deg);');
    secondCard.querySelector('.front-face').setAttribute('style','transform: rotateY(0deg);');
    secondCard.querySelector('.back-face').setAttribute('style','transform: rotateY(180deg);');
    firstCard = undefined;
    secondCard = undefined;
    gameBusy = false;
}


function endGame(){
    clearInterval(intervalID);
    calcScore();
    pushScore();
    sortScoreArray();
    updateScoreboard();
    let playAgain = prompt(`Você ganhou em ${cardsFlipped} jogadas e ${time} segundos! Deseja jogar novamente?`);
    if (playAgain==='sim'){
        
        time = 0;
        cardQuantity = 0;
        shuffledDeck.length = 0;
        cardsFlipped = 0;
        pairsFound = 0;
        cardsTable.innerHTML = '';
        newGame();
    }
}

function calcScore(){
    playerScore = 500*cardQuantity/((time/cardQuantity) + (cardsFlipped/cardQuantity));
}

function pushScore(){
    scoresArray.push({name: playerName, score: playerScore});
}

function sortScoreArray(){
    scoresArray.sort((a, b) => b.score - a.score);
}

function updateScoreboard(){
    scoreBoard.innerHTML = '';
    for (let i = 0; i < scoresArray.length; i++) {
        scoreBoard.innerHTML += `<li>${scoresArray[i].name} :${scoresArray[i].score.toFixed(0)}</li>`
        
    }
}
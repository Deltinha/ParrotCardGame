const cardList = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot'];

let cardNumber = Number(prompt('Escolha um número par de cartas entre 4 e 14'));
const shuffledDeck = [];

function cardNumberValidation() {
    while (!cardNumber || cardNumber % 2 !== 0 || cardNumber > 14 || cardNumber < 4)
    {  
        cardNumber = Number(prompt('Escolha um número par de cartas entre 4 e 14'));
    }
}

function shuffleCards(){

    cardList.sort(compareFunction);

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < cardNumber/2; j++) {
            shuffledDeck.push(cardList[j]);
        }    
    }
    shuffledDeck.sort(compareFunction);
}

function compareFunction() { 
	return Math.random() - 0.5; 
}

function distributeCards(){
    for (let i = 0; i < cardNumber; i++) {
        document.querySelector('.card-pool').innerHTML += `<li class="card" onclick="pickCard(this);">
        <div class="front-face face">
            <img src="assets/front.png" alt="" />
        </div>
        <div class="back-face face">
            <img src="assets/${shuffledDeck[i]}.gif" alt="" />
        </div>
    </li>`;    
    }
}

    let firstCard;
    let secondCard;
    let flipsNumber = 0;
    let pairsFound = 0;
function pickCard(pickedCard){
    if (gameBusy === false){    
        flipsNumber++;
        if (firstCard){
            secondCard = pickedCard;
            gameBusy = true;
        }
        else {
            firstCard = pickedCard;
        }

        pickedCard.querySelector('.front-face').setAttribute('style','transform: rotateY(-180deg);');
        pickedCard.querySelector('.back-face').setAttribute('style','transform: rotateY(0deg);');


        if (firstCard && secondCard){
                verifyPair();
        }
    }

}
let gameBusy = false;
function verifyPair(){
    if (firstCard.querySelector('.back-face img').getAttribute('src')===secondCard.querySelector('.back-face img').getAttribute('src')){
        pairsFound++;
        firstCard = undefined;
        secondCard = undefined;
        gameBusy = false;
        if (pairsFound===cardNumber/2){
            alert(`Você ganhou em ${flipsNumber} jogadas!`);
        }
        
    }
    else{
        setTimeout(flipCardDown, 1000);
    }
    
}

function flipCardDown(){
    
    firstCard.querySelector('.front-face').setAttribute('style','transform: rotateY(0deg);');
    firstCard.querySelector('.back-face').setAttribute('style','transform: rotateY(180deg);');
    secondCard.querySelector('.front-face').setAttribute('style','transform: rotateY(0deg);');
    secondCard.querySelector('.back-face').setAttribute('style','transform: rotateY(180deg);');
    firstCard = undefined;
    secondCard = undefined;
    gameBusy = false;
}




cardNumberValidation();
shuffleCards();
distributeCards();


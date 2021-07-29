const cardList = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot'];

let cardNumber = Number(prompt('Quantas cartas?'));
const shuffledDeck = [];

function cardNumberValidation() {
    while (isNaN(cardNumber) || cardNumber % 2 !== 0 || cardNumber > 14 || cardNumber < 4)
    {  
        cardNumber = Number(prompt('Quantas cartas?'));
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

function pickCard(pickedCard){
    console.log(pickedCard);
    pickedCard.querySelector('.front-face').setAttribute('style','transform: rotateY(-180deg);');
    pickedCard.querySelector('.back-face').setAttribute('style','transform: rotateY(0deg);');
    
}




cardNumberValidation();
shuffleCards();
distributeCards();


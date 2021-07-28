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








cardNumberValidation();
shuffleCards();


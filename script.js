let cardNumber = Number(prompt('Quantas cartas?'));

function cardNumberValidation() {
    while (isNaN(cardNumber) || cardNumber % 2 !== 0 || cardNumber > 14 || cardNumber < 4){
        cardNumber = Number(prompt('Quantas cartas?'));
    }
}

cardNumberValidation();
(function (stampit, spoker) {

    function cardValueToHTML(cardValue) {
        if (+cardValue === 0.5) {
            cardValue = '1/2';
        } else if (cardValue === 'coffe') {
            cardValue = '<img src="images/CoffeeCup.svg" alt="coffee" />';
        } else if (+cardValue === Infinity) {
            cardValue = '&#8734;';
        }
        return String(cardValue);
    }

    spoker.cardHelper = stampit().enclose(function () {
        this.cardValueToHTML = cardValueToHTML;
    });
}(window.stampit, window.spoker || {}));

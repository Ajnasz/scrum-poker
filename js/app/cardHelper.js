(function (stampit, spoker) {

    function cardValueToHTML(cardValue) {
        if (cardValue === 'coffe') {
            return '<img src="images/CoffeeCup.svg" alt="coffee" />';
        }

        var cardNumValue = +cardValue;

        if (cardNumValue === 0.5) {
            return '1/2';
        } else if (cardNumValue === Infinity) {
            return '&#8734;';
        }

        return String(cardValue);
    }

    spoker.cardHelper = stampit().enclose(function () {
        this.cardValueToHTML = cardValueToHTML;
    });
}(window.stampit, window.spoker || {}));

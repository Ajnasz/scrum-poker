(function (stampit, spoker) {
    spoker.CardsPlace = window.spoker.View.enclose(function () {
        var SHOW_CARD_IN_BIG_CLASS_NAME = 'show-in-big',
            CARD_CLASS_NAME = 'card',
            BIG_CARD_CLASS_NAME = 'big-card',
            FRONT_CARD_CLASS_NAME = 'front',
            body = document.getElementsByTagName('body')[0],
            displayedCard = this.byId('DisplayedCard'),
            placeClickEnabled = true;

        function disablePlaceClick() {
            placeClickEnabled = false;
        }

        function enablePlaceClick() {
            placeClickEnabled = true;
        }

        function isSmallCardElem(elem) {
            var classList = elem.classList;
            return classList &&
                    classList.contains(CARD_CLASS_NAME) &&
                    !classList.contains(BIG_CARD_CLASS_NAME);
        }

        function getCardElem(elem) {
            var output;

            if (isSmallCardElem(elem)) {
                output = elem;
            } else if (elem.parentNode) {
                output = getCardElem(elem.parentNode);
            } else {
                output = null;
            }

            return output;
        }

        function hideBigCard() {
            body.classList.remove(SHOW_CARD_IN_BIG_CLASS_NAME);
        }

        function isBigCardVisible() {
            return body.classList.contains(SHOW_CARD_IN_BIG_CLASS_NAME);
        }

        function getData(element, name) {
            var output;
            if (element.dataset) {
                output = element.dataset[name];
            } else {
                output = element.getAttribute('data-' + name);
            }

            return output;
        }

        function hideDisplayedCard() {
            body.classList.remove(SHOW_CARD_IN_BIG_CLASS_NAME);
        }

        function processDisplayedValue(value) {
            if (+value === 0.5) {
                value = '1/2';
            } else if (value === 'coffe') {
                value = '<img src="images/CoffeeCup.svg" alt="coffee" />';
            } else if (+value === Infinity) {
                value = '&#8734;';
            }
            return String(value);
        }

        function showDisplayedCard(value) {
            var card = displayedCard;

            hideDisplayedCard();

            setTimeout(function () {
                body.classList.add(SHOW_CARD_IN_BIG_CLASS_NAME);
                card.querySelector('.' + FRONT_CARD_CLASS_NAME).innerHTML = processDisplayedValue(value);
            }, 200);
        }

        function showClickedCard(cardElem) {
            var value;

            if (cardElem) {
                value = getData(cardElem, 'value');
                showDisplayedCard(value);
            }
        }

        function onPlaceClick(event) {
            event.preventDefault();
            event.stopPropagation();

            this.emit('placeClick', event);
        }

        this.setupPlaceClickEnabler = function () {
            this.listen(body, this.DOM_EVENTS.TOUCHSTART, enablePlaceClick);
            this.listen(body, this.DOM_EVENTS.TOUCHMOVE, disablePlaceClick);
            this.listen(body, this.DOM_EVENTS.TOUCHEND, onPlaceClick.bind(this));
            this.onClick(body, onPlaceClick.bind(this));

            this.onClick('DisplayedCard', hideDisplayedCard);
        };

        this.showBigCard = function (target) {
            var cardElem = getCardElem(target);
            if (cardElem) {
                showClickedCard(cardElem);
            }
        };

        this.isBigCardVisible = isBigCardVisible;
        this.hideBigCard = hideBigCard;
    });
}(window.stampit, window.spoker = window.spoker || {}));

/*jslint browser: true*/
(function () {
    "use strict";

    var SHOW_CARD_IN_BIG_CLASS_NAME = 'show-in-big',
        CARD_CLASS_NAME = 'card',
        BIG_CARD_CLASS_NAME = 'big-card',
        SMALL_CARD_CLASS_NAME = 'small-card',
        FRONT_CARD_CLASS_NAME = 'front',
        BACK_CARD_CLASS_NAME = 'back',
        CARD_SIDE_CLASS_NAME = 'card-side',
        place;

    function byId(id) {
        return document.getElementById(id);
    }

    function listen(elem, event, cb) {
        elem.addEventListener(event, cb, false);
    }

    function onClick(elem, cb) {
        listen(byId(elem), 'click', cb);
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

    /*jslint eqeq: true*/
    function truthy(elem) {
        return elem != null;
    }
    /*jslint eqeq: false*/

    function hideDisplayedCard() {
        place.classList.remove(SHOW_CARD_IN_BIG_CLASS_NAME);
    }

    function setData(element) {
        function setElementData(name, value) {
            element.dataset[name] = value;
        }

        return function (data) {
            setElementData.apply(element, data);
        };
    }

    function setAttributes(element) {
        return function (attrib) {
            element.setAttribute.apply(element, attrib);
        };
    }

    function processDisplayedValue(value) {
        if (value === 0.5) {
            value = '1/2';
        } else if (value === 'coffe') {
            value = '<img src="images/CoffeeCup.svg" alt="coffee" />';
        }
        return String(value);
    }

    function createElement(name, classes, data, attributes, text) {
        var element = document.createElement(name);

        element.classList.add.apply(element.classList, classes);
        data.forEach(setData(element));
        attributes.forEach(setAttributes(element));

        if (truthy(text)) {
            element.innerHTML = text;
        }

        return element;
    }

    function createDiv(classes, data, attributes, text) {
        return createElement('div', classes, data, attributes, text);
    }

    function createCardSide(element, which, text) {
        var cardSide = createDiv([CARD_SIDE_CLASS_NAME, which], [], [], text);
        element.appendChild(cardSide);
    }

    function createCard(value) {
        var card = createDiv([CARD_CLASS_NAME, SMALL_CARD_CLASS_NAME], [['value', value]], []);

        createCardSide(card, FRONT_CARD_CLASS_NAME, processDisplayedValue(value));
        createCardSide(card, BACK_CARD_CLASS_NAME);

        return card;
    }

    function showDisplayedCard(value) {
        var card = byId('DisplayedCard');

        hideDisplayedCard();

        setTimeout(function () {
            place.classList.add(SHOW_CARD_IN_BIG_CLASS_NAME);
            card.querySelector('.' + FRONT_CARD_CLASS_NAME).innerHTML = processDisplayedValue(value);
        }, 200);
    }

    function toArray(args) {
        return Array.prototype.slice.call(args);
    }

    function removeCard(card) {
        place.removeChild(card);
    }

    function removeCards() {
        var cards = toArray(place.querySelectorAll('.card:not(.' + BIG_CARD_CLASS_NAME + ')'));

        cards.forEach(removeCard);
    }

    function addCards(cards) {
        var fragment = document.createDocumentFragment();

        cards.forEach(function (val) {
            fragment.appendChild(createCard(val));
        });

        place.appendChild(fragment);
    }

    function showClickedCard(cardElem) {
        var value;

        if (cardElem) {
            value = cardElem.dataset.value;
            showDisplayedCard(value);
        }
    }

    function onPlaceClick(event) {
        var cardElem;

        if (place.classList.contains(SHOW_CARD_IN_BIG_CLASS_NAME)) {
            place.classList.remove(SHOW_CARD_IN_BIG_CLASS_NAME);
        } else {
            cardElem = getCardElem(event.target);

            if (cardElem) {
                showClickedCard(cardElem);
            }
        }
    }

    listen(window, 'load', function () {
        place = byId('PokerPlace');

        removeCards();
        addCards(['coffe', '?', 0.5, 0, 1, 2, 3, 5, 8, 13, 20, 40, 100]);

        listen(place, 'click', onPlaceClick);

        listen(byId('DisplayedCard'), 'click', hideDisplayedCard);
    }, false);
}());

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
        showing = false,
        placeClickEnabled = true,
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

    function fibonacci(test, acc) {
        var val;

        if (acc.length < 2) {
            val = 1;
        } else {
            val = acc[acc.length - 2] + acc[acc.length - 1];
        }

        if (test(val)) {
            acc.push(val);

            return fibonacci(test, acc);
        }

        return acc;
    }

    function processDisplayedValue(value) {
        if (+value === 0.5) {
            value = '1/2';
        } else if (value === 'coffe') {
            value = '<img src="images/CoffeeCup.svg" alt="coffee" />';
        }
        return String(value);
    }

    function createElement(name, classes, data, attributes, text) {
        var element = document.createElement(name);

        classes.forEach(function (cn) {
            element.classList.add(cn);
        });
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
        var cards = toArray(place.querySelectorAll('.' + CARD_CLASS_NAME + ':not(.' + BIG_CARD_CLASS_NAME + ')'));

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

        event.preventDefault();
        event.stopPropagation();

        if (showing) {
            return;
        }

        if (place.classList.contains(SHOW_CARD_IN_BIG_CLASS_NAME)) {
            place.classList.remove(SHOW_CARD_IN_BIG_CLASS_NAME);
        } else {
            cardElem = getCardElem(event.target);

            if (cardElem) {
                showClickedCard(cardElem);
            }
        }

        showing = true;

        setTimeout(function () {
            showing = false;
        }, 200);
    }


    function disablePlaceClick() {
        placeClickEnabled = false;
    }

    function enablePlaceClick() {
        placeClickEnabled = true;
    }

    function getFibonacciCards() {
        return fibonacci(function (last) {
            return last < 100; // generate fibonacci until last item is less then 100
        }, [0]).reduce(function (prev, current, index, array) {
            var arr = prev || [prev];

            if (arr.indexOf(current) === -1) {
                return arr.concat(current);
            }

            return arr;
        });
    }

    function getCommercialCards() {
        return ['coffe', '?', 0.5, 0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
    }

    listen(window, 'load', function () {
        place = byId('PokerPlace');

        removeCards();
        addCards(getCommercialCards());

        listen(place, 'click', onPlaceClick);
        listen(place, 'click', enablePlaceClick);
        listen(place, 'touchstart', enablePlaceClick);
        listen(place, 'touchmove', disablePlaceClick);
        listen(place, 'touchend', onPlaceClick);

        listen(byId('DisplayedCard'), 'click', hideDisplayedCard);
    }, false);
}());

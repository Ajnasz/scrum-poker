/*jslint browser: true*/
(function () {
    "use strict";

    var place, createCard;

    function byId(id) {
        return document.getElementById(id);
    }

    function listen(elem, event, cb) {
        elem.addEventListener(event, cb, false);
    }

    function onClick(elem, cb) {
        listen(byId(elem), 'click', cb);
    }

    function getCardElem(elem) {
        var output = false;

        while (!output && elem.parentNode) {
            output = elem.classList.contains('card') && !elem.classList.contains('displayed-card');

            if (!output) {
                elem = elem.parentNode;
            }
        }

        if (!output) {
            elem = null;
        }

        return elem;
    }

    function hideDisplayedCard() {
        place.classList.remove('show-in-big');
    }

    createCard = (function () {
        var div = document.createElement('div'),
            cardSide = div.cloneNode(false),
            card = div.cloneNode(false),
            front,
            back;

        cardSide.classList.add('card-side');
        card.classList.add('card', 'small-card');

        front = cardSide.cloneNode(true);
        back = cardSide.cloneNode(true);

        front.classList.add('front');
        back.classList.add('back');

        return function createCard(value) {
            var output = card.cloneNode(true),
                frontCard;
            frontCard = front.cloneNode(true);
            frontCard.textContent = value;
            output.appendChild(frontCard);
            output.appendChild(back.cloneNode(true));
            output.dataset.value = value;

            return output;
        };
    }());

    function showDisplayedCard(value) {
        var card = byId('DisplayedCard');

        hideDisplayedCard();

        setTimeout(function () {
            place.classList.add('show-in-big');
            card.querySelector('.front').textContent = value;
        }, 200);
    }

    function removeCard(card) {
        place.removeChild(card);
    }

    function removeCards() {
        var cards = Array.prototype.slice.call(place.querySelectorAll('.card:not(.displayed-card)'));

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

        if (place.classList.contains('show-in-big')) {
            place.classList.remove('show-in-big');
        } else {
            cardElem = getCardElem(event.target);
            showClickedCard(cardElem);
        }



    }



    listen(window, 'load', function () {
        place = byId('PokerPlace');

        removeCards();
        addCards([0, 1, 2, 3, 5, 8, 13, 20, 40, 100]);

        listen(place, 'click', onPlaceClick);

        listen(byId('DisplayedCard'), 'click', hideDisplayedCard);
    }, false);
}());


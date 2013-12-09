/*jslint browser: true*/
(function () {
    "use strict";

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
        byId('PokerPlace').classList.remove('show-in-big');
    }

    function showDisplayedCard(value) {
        var card = byId('DisplayedCard'),
            place = byId('PokerPlace');

        hideDisplayedCard();

        setTimeout(function () {
            place.classList.add('show-in-big');
            card.querySelector('.front').textContent = value;
        }, 200);
    }


    listen(window, 'load', function () {
        listen(byId('PokerPlace'), 'click', function (event) {
            var cardElem = getCardElem(event.target), value;

            if (cardElem) {
                value = cardElem.dataset.value;
                showDisplayedCard(value);
            }
        });

        listen(byId('DisplayedCard'), 'click', function () {
            byId('PokerPlace').classList.remove('show-in-big');
        });
    }, false);
}());


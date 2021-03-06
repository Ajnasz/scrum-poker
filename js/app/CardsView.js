(function (stampit, spoker) {
    'use strict';

    spoker.CardsView = stampit.compose(spoker.cardHelper, stampit.compose(spoker.View, stampit().enclose(function () {
        var CARD_CLASS_NAME = 'card',
            SMALL_CARD_CLASS_NAME = 'small-card',
            FRONT_CARD_CLASS_NAME = 'front',
            // BACK_CARD_CLASS_NAME = 'back',
            CARD_SIDE_CLASS_NAME = 'card-side',
            placeClickEnabled = true,
            cardCache = new Map();

        function truthy(elem) {
            return elem ? true : false;
        }

        function setAttributes(element) {
            return function (attrib) {
                element.setAttribute.apply(element, attrib);
            };
        }

        function setElementData(element, name, value) {
            if (element.dataset) {
                element.dataset[name] = value;
            } else {
                element.setAttribute('data-' + name, value);
            }
        }

        function setData(element) {
            return function (data) {
                data.unshift(element);
                setElementData.apply(element, data);
            };
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

        function createCard(cardSetName, value) {
            var card, html;

            html = this.cardValueToHTML(value);

            if (!cardCache.has(cardSetName)) {
                card = createDiv([cardSetName, CARD_CLASS_NAME, SMALL_CARD_CLASS_NAME], [['value', value]], []);

                createCardSide(card, FRONT_CARD_CLASS_NAME);
                // createCardSide(card, BACK_CARD_CLASS_NAME);

                cardCache.set(cardSetName, card);
            }

            card = cardCache.get(cardSetName).cloneNode(true);
            setElementData(card, 'value', value);
            card.firstChild.innerHTML = html;

            return card;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getTranslateVal(value) {
            return value;
            // return (Math.floor(Math.random() * 10) % 2 ? '-' : '') + getRandomInt(value, value);
        }

        function getTransformCss(width, height) {
            return 'translate(' + 0 + 'px,' +
                getTranslateVal(height + getRandomInt(100, 300)) + 'px) translateZ(0)';
        }

        function disablePlaceClick() {
            placeClickEnabled = false;
        }

        function enablePlaceClick() {
            placeClickEnabled = true;
        }

        function isSmallCardElem(elem) {
            var classList = elem.classList;
            return classList && classList.contains(CARD_CLASS_NAME);
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

        function transformCard(card, transform) {
            if (transform) {
                card.classList.add('transforming');
            } else {
                card.classList.remove('transforming');
            }
        }

        this.removeCards = function removeCards(callback) {
            var place = this.byId(this.place),
                children = this.toArray(place.childNodes),
                width = place.offsetWidth,
                height = place.offsetHeight;

            function realCardRemove(card) {
                place.removeChild(card);

                if (!place.firstChild) {
                    window.scrollTo(0, 0);
                    callback();
                }
            }

            function onTransitionEnd(e) {
                var card = e.target;

                if (card.classList.contains('remove')) {
                    card.removeEventListener('transitionend', onTransitionEnd, false);
                    realCardRemove(card);
                }
            }

            function markCardForRemove(card) {
                card.addEventListener('transitionend', onTransitionEnd, false);
                card.classList.add('remove');
                transformCard(card, getTransformCss(width, height));
            }

            if (children.length) {
                children.forEach(function (card, index) {
                setTimeout(function () {
                    if (card.nodeType === 1) {
                        markCardForRemove(card);
                    } else {
                        realCardRemove(card);
                    }
                }, (index + 1) * 45 );
                });
            } else {
                callback();
            }
        };

        this.addCards = function addCards(opts) {
            var place = this.byId(this.place),
                width = place.offsetWidth,
                height = place.offsetHeight,
                cards = opts.cards,
                cardSetName = opts.cardSetName;

            var fragment = document.createDocumentFragment();

            cards.map(createCard.bind(this, cardSetName)).forEach(function (card, index) {
                var transform = getTransformCss(width, height);

                transformCard(card, transform);

                fragment.appendChild(card);

                setTimeout(function () {
                    transformCard(card, '');
                }, (index + 1) * 45);
            });

            this.byId(this.place).appendChild(fragment);
        };

        this.getCardValue = function (card) {
            card = getCardElem(card);

            if (card) {
                return getData(card, 'value');
            }
        };

        this.setup = function () {
            // on touch start we enable the place click event
            this.onTouchStart(this.place, function () {
                enablePlaceClick();
            });

            // but if user moves, disable it
            this.onTouchMove(this.place, function () {
                disablePlaceClick();
            });

            this.onTouchEnd(this.place, function (event) {
                if (placeClickEnabled) {
                    event.stopPropagation();
                    disablePlaceClick();
                    this.emit('placeClick', event.target);
                    setTimeout(enablePlaceClick, 300);
                }
                enablePlaceClick();
            }.bind(this));

            this.onClick(this.place, function (event) {
                if (placeClickEnabled) {
                    this.emit('placeClick', event.target);
                }
            }.bind(this));
        };
    })));
}(this.stampit, this.spoker || {}));

// vi:expandtab

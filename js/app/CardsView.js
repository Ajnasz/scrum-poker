(function (stampit, spoker) {
    'use strict';

    spoker.CardsView = stampit.compose(spoker.cardHelper, stampit.compose(spoker.View, stampit().enclose(function () {
        var CARD_CLASS_NAME = 'card',
            SMALL_CARD_CLASS_NAME = 'small-card',
            FRONT_CARD_CLASS_NAME = 'front',
            // BACK_CARD_CLASS_NAME = 'back',
            CARD_SIDE_CLASS_NAME = 'card-side',
            placeClickEnabled = true,
            cardCache;

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

        function createCard(value) {
            var card, html;

            html = this.cardValueToHTML(value);

            if (!cardCache) {
                card = createDiv([CARD_CLASS_NAME, SMALL_CARD_CLASS_NAME], [['value', value]], []);

                createCardSide(card, FRONT_CARD_CLASS_NAME);
                // createCardSide(card, BACK_CARD_CLASS_NAME);

                cardCache = card;
            }

            card = cardCache.cloneNode(true);
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
            // card.style.WebkitTransform = transform;
            // card.style.MozTransform = transform;
            // card.style.MsTransform = transform;
            // card.style.transform = transform;
        }

        this.removeCards = function removeCards(callback) {
            var place = this.byId(this.place),
                children = this.toArray(place.childNodes),
                width = place.offsetWidth,
                height = place.offsetHeight;

            function realCardRemove(card) {
                place.removeChild(card);

                if (!place.firstChild) {
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
                children.forEach(function (card) {
                    if (card.nodeType === 1) {
                        markCardForRemove(card);
                    } else {
                        realCardRemove(card);
                    }
                });
            } else {
                callback();
            }
        };

        this.addCards = function addCards(cards) {
            var place = this.byId(this.place),
                width = place.offsetWidth,
                height = place.offsetHeight;

            var fragment = document.createDocumentFragment();

            cards.map(createCard.bind(this)).forEach(function (card, index) {
                var transform = getTransformCss(width, height);

                transformCard(card, transform);

                fragment.appendChild(card);

                setTimeout(function () {
                    transformCard(card, '');
                }, index * 50);
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
            this.listen(this.place, this.DOM_EVENTS.TOUCHSTART, function () {
                enablePlaceClick();
            });
            // but if user moves, disable it
            this.listen(this.place, this.DOM_EVENTS.TOUCHMOVE, function () {
                disablePlaceClick();
            });
            this.listen(this.place, this.DOM_EVENTS.TOUCHEND, function (event) {
                if (placeClickEnabled) {
                    disablePlaceClick();
                    this.emit('placeClick', event.target);
                    setTimeout(enablePlaceClick, 300);
                }
            }.bind(this));
            this.listen(this.place, this.DOM_EVENTS.CLICK, function (event) {
                if (placeClickEnabled) {
                    this.emit('placeClick', event.target);
                }
            }.bind(this));
        };
    })));
}(this.stampit, this.spoker || {}));

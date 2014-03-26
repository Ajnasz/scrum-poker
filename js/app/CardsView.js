(function (stampit, spoker) {
    spoker.CardsView = stampit.compose(spoker.cardHelper, stampit.compose(spoker.View, stampit().enclose(function () {
        var CARD_CLASS_NAME = 'card',
            SMALL_CARD_CLASS_NAME = 'small-card',
            FRONT_CARD_CLASS_NAME = 'front',
            BACK_CARD_CLASS_NAME = 'back',
            CARD_SIDE_CLASS_NAME = 'card-side',
            placeClickEnabled = true;

        /*jslint eqeq: true*/
        function truthy(elem) {
            return elem != null;
        }
        /*jslint eqeq: false*/

        function setAttributes(element) {
            return function (attrib) {
                element.setAttribute.apply(element, attrib);
            };
        }

        function setData(element) {
            function setElementData(name, value) {
                if (element.dataset) {
                    element.dataset[name] = value;
                } else {
                    element.setAttribute('data-' + name, value);
                }
            }

            return function (data) {
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
            var card = createDiv([CARD_CLASS_NAME, SMALL_CARD_CLASS_NAME], [['value', value]], []);

            createCardSide(card, FRONT_CARD_CLASS_NAME, this.cardValueToHTML(value));
            createCardSide(card, BACK_CARD_CLASS_NAME);

            return card;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getTranslateVal(value) {
            return (Math.floor(Math.random() * 10) % 2 ? '-' : '') + getRandomInt(value, value);
        }

        function removeCards(callback) {
            var place = this.byId(this.place),
                children = this.toArray(place.childNodes),
                width = window.innerWidth,
                height = window.innerHeight;

            if (children.length) {
                children.forEach(function (card) {
                    card.addEventListener('transitionend', function () {
                        if (card.classList.contains('remove')) {
                            place.removeChild(card);

                            if (!place.firstChild) {
                                callback();
                            }
                        }
                    }, false);
                    if (card.nodeType === 1) {
                        card.classList.add('remove');
                        var transform = 'translate(' + getTranslateVal(width) + 'px,' + getTranslateVal(height) + 'px)';
                        card.style.WebkitTransform = transform;
                        card.style.MozTransform = transform;
                        card.style.MsTransform = transform;
                        card.style.transform = transform;
                    } else {
                        place.removeChild(card);
                        if (!place.firstChild) {
                            callback();
                        }
                    }
                }.bind(this));
            } else {
                callback();
            }

            /*
            while (place.firstChild) {
                place.removeChild(place.firstChild);
            }
            */
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

        this.renderCards = function (cards) {
            var width = window.innerWidth,
                height = window.innerHeight;
            removeCards.call(this, function () {
                var fragment = document.createDocumentFragment();
                cards.map(createCard.bind(this)).forEach(function (card) {
                    var transform = 'translate(' + getTranslateVal(width) + 'px,' + getTranslateVal(height) + 'px)';
                    card.style.WebkitTransform = transform;
                    card.style.MozTransform = transform;
                    card.style.MsTransform = transform;
                    card.style.transform = transform;
                    fragment.appendChild(card);
                    setTimeout(function () {
                        card.style.WebkitTransform = '';
                        card.style.MozTransform = '';
                        card.style.MsTransform = '';
                        card.style.transform = '';
                    }, 10);
                }.bind(this));

                this.byId(this.place).appendChild(fragment);
            }.bind(this));
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
}(window.stampit, window.spoker || {}));

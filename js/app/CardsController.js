(function (stampit, spoker) {
    'use strict';
    spoker.CardsController = stampit.compose(spoker.Controller, stampit().enclose(function () {

        function getCardSet(model) {
            var value = model.get('cardSet');
            var cardSet;

            if (value === spoker.ToolbarView.CARD_TYPES.TSHIRT) {
                cardSet = model.getTshirt();
            } else if (value === spoker.ToolbarView.CARD_TYPES.FIBONACCI) {
                cardSet = model.getFibonacci();
            } else {
                cardSet = model.getStandard();
            }

            return cardSet;
        }
        this.setup = function () {
            this.model.on('change.cardSet', function () {
                this.view.removeCards(function () {
                    this.view.addCards(getCardSet(this.model));
                }.bind(this));
                // this.view.renderCards(cardSet);
            }.bind(this));

            this.view.on('placeClick', function (target) {
                var cardValue;

                if (!this.model.get('isBigCardVisible')) {
                    cardValue = this.view.getCardValue(target);

                    if (cardValue) {
                        this.model.set('selectedCard', cardValue);
                    }
                }
            }.bind(this));
        };
    }));
}(window.stampit, window.spoker || {}));

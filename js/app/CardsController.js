(function (stampit, spoker) {
	'use strict';
    spoker.CardsController = stampit.compose(spoker.Controller, stampit().enclose(function () {
        this.setup = function () {
            this.model.on('change.cardSet', function (value) {
                var cardSet;

                if (value === spoker.ToolbarView.CARD_TYPES.TSHIRT) {
                    cardSet = this.model.getTshirt();
                } else if (value === spoker.ToolbarView.CARD_TYPES.FIBONACCI) {
                    cardSet = this.model.getFibonacci();
                } else {
                    cardSet = this.model.getStandard();
                }

                this.view.renderCards(cardSet);
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
